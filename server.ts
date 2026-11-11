import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  syncedToBrevo?: boolean;
  emailSent?: boolean;
}

// In-memory store for contact inquiries received on CommissionPilot
const contactMessages: ContactMessage[] = [];

function getTargetPort(): number {
  // 1. Explicit CLI argument --port takes highest precedence
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const val = parseInt(process.argv[portArgIndex + 1], 10);
    if (!isNaN(val) && val > 0) return val;
  }

  // 2. Explicit DEFAULT_APP_PORT (set to 3000 in AI Studio)
  if (process.env.DEFAULT_APP_PORT) {
    const val = parseInt(process.env.DEFAULT_APP_PORT, 10);
    if (!isNaN(val) && val > 0) return val;
  }

  // 3. If process.env.PORT is provided and NOT equal to the Nginx reverse-proxy port (8080)
  if (process.env.PORT && process.env.PORT !== '8080') {
    const val = parseInt(process.env.PORT, 10);
    if (!isNaN(val) && val > 0) return val;
  }

  // Default to 3000 as required by AI Studio runtime environment
  return 3000;
}

function getTargetHost(): string {
  const hostArgIndex = process.argv.indexOf('--host');
  if (hostArgIndex !== -1 && process.argv[hostArgIndex + 1]) {
    return process.argv[hostArgIndex + 1];
  }
  return process.env.HOST || '0.0.0.0';
}

async function startServer() {
  const app = express();
  const PORT = getTargetPort();
  const HOST = getTargetHost();

  app.use(express.json());

  // Brevo API configuration
  const BREVO_API_KEY = process.env.BREVO_API_KEY || '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';
  const DEFAULT_LIST_ID = 7; // "CommissionPilot Subscribers" list created in your account
  const ADMIN_EMAIL = 'AMIN.AJRIF@gmail.com';

  // API Route: Newsletter subscription via Brevo v3 contacts API
  app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
      const { email, source, listId } = req.body;
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Invalid email address' });
      }

      const targetListId = listId ? parseInt(listId, 10) : DEFAULT_LIST_ID;

      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
          'accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          listIds: [targetListId],
          updateEnabled: true
        })
      });

      if (response.ok || response.status === 201 || response.status === 204) {
        return res.json({
          success: true,
          message: 'Contact synchronized with Brevo list',
          listId: targetListId,
          syncedToBrevo: true
        });
      }

      const errorData = (await response.json().catch(() => ({}))) as any;
      if (
        response.status === 400 && 
        (errorData.message?.toLowerCase().includes('already exist') || errorData.code === 'duplicate_parameter')
      ) {
        return res.json({
          success: true,
          message: 'Contact already exists in Brevo and is updated',
          listId: targetListId,
          syncedToBrevo: true
        });
      }

      console.warn('Brevo API response warning:', response.status, errorData);
      return res.status(response.status).json({
        success: false,
        message: errorData.message || 'Error registering contact in Brevo',
        syncedToBrevo: false
      });
    } catch (err: any) {
      console.error('Error connecting to Brevo API:', err);
      return res.status(500).json({ success: false, message: err.message || 'Server connection error' });
    }
  });

  // API Route: Contact Form Submission
  // 1. Adds contact to Brevo contacts list (List #7)
  // 2. Attempts to send transactional email to AMIN.AJRIF@gmail.com
  // 3. Stores in server messages inbox so it's visible in Admin CMS
  app.post('/api/contact/send', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const newMessage: ContactMessage = {
        id: 'msg-' + Date.now().toString(36),
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        subject: String(subject || 'General Inquiry').trim(),
        message: String(message).trim(),
        timestamp: new Date().toISOString(),
        syncedToBrevo: false,
        emailSent: false
      };

      // 1. Sync contact into Brevo Contacts so the user is in your Brevo audience
      try {
        const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
            'accept': 'application/json'
          },
          body: JSON.stringify({
            email: newMessage.email,
            attributes: {
              FIRSTNAME: newMessage.name
            },
            listIds: [DEFAULT_LIST_ID],
            updateEnabled: true
          })
        });

        if (contactRes.ok || contactRes.status === 201 || contactRes.status === 204) {
          newMessage.syncedToBrevo = true;
        } else {
          const cErr = await contactRes.json().catch(() => ({}));
          if (contactRes.status === 400 && cErr.message?.toLowerCase().includes('already exist')) {
            newMessage.syncedToBrevo = true;
          }
        }
      } catch (cErr) {
        console.warn('Brevo contact add warning:', cErr);
      }

      // 2. Try sending transactional email to Amin Ajrif
      let emailError: string | null = null;
      try {
        const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
            'accept': 'application/json'
          },
          body: JSON.stringify({
            sender: {
              name: 'CommissionPilot Contacto',
              email: ADMIN_EMAIL
            },
            to: [
              {
                email: ADMIN_EMAIL,
                name: 'Amin Ajrif'
              }
            ],
            replyTo: {
              email: newMessage.email,
              name: newMessage.name
            },
            subject: `[CommissionPilot] Nuevo Mensaje: ${newMessage.subject} - De: ${newMessage.name}`,
            htmlContent: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
                <div style="background-color: #1e40af; padding: 22px 24px; color: #ffffff;">
                  <h2 style="margin: 0; font-size: 19px; font-weight: 700;">Nuevo Mensaje en CommissionPilot.org</h2>
                  <p style="margin: 4px 0 0; opacity: 0.9; font-size: 13px;">Formulario de Contacto y Soporte Oficial</p>
                </div>
                <div style="padding: 24px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 6px 0; color: #64748b; width: 120px;"><strong>Remitente:</strong></td>
                      <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${newMessage.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td>
                      <td style="padding: 6px 0;"><a href="mailto:${newMessage.email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${newMessage.email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #64748b;"><strong>Motivo:</strong></td>
                      <td style="padding: 6px 0; color: #0f172a;">${newMessage.subject}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #64748b;"><strong>Fecha y Hora:</strong></td>
                      <td style="padding: 6px 0; color: #64748b;">${new Date(newMessage.timestamp).toLocaleString()}</td>
                    </tr>
                  </table>
                  
                  <div style="margin-top: 16px; border-top: 1px solid #e2e8f0; pt: 16px;">
                    <h4 style="margin: 16px 0 8px; color: #0f172a; font-size: 14px;">Mensaje del visitante:</h4>
                    <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.6;">${newMessage.message}</div>
                  </div>

                  <div style="margin-top: 24px; text-align: center;">
                    <a href="mailto:${newMessage.email}?subject=Re:%20${encodeURIComponent(newMessage.subject)}" style="background-color: #2563eb; color: #ffffff; padding: 10px 22px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px; display: inline-block;">
                      Responder a ${newMessage.name} (${newMessage.email})
                    </a>
                  </div>
                </div>
                <div style="background-color: #f1f5f9; padding: 12px 24px; text-align: center; font-size: 11px; color: #64748b;">
                  CommissionPilot · Provenza 148, Local, 08036 Barcelona · Titular: Amin Ajrif
                </div>
              </div>
            `
          })
        });

        if (emailRes.ok || emailRes.status === 201) {
          newMessage.emailSent = true;
        } else {
          const errData = (await emailRes.json().catch(() => ({}))) as any;
          emailError = errData.message || 'SMTP request denied';
          console.warn('Brevo SMTP response:', emailRes.status, errData);
        }
      } catch (e: any) {
        emailError = e.message;
        console.warn('Brevo SMTP send error:', e);
      }

      // Add to server memory
      contactMessages.unshift(newMessage);

      return res.json({
        success: true,
        message: 'Mensaje recibido correctamente',
        contactMessage: newMessage,
        emailSent: newMessage.emailSent,
        syncedToBrevo: newMessage.syncedToBrevo,
        emailError
      });
    } catch (err: any) {
      console.error('Error processing contact submission:', err);
      return res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
  });

  // API Route: Get all contact messages
  app.get('/api/contact/messages', (_req, res) => {
    res.json({
      success: true,
      messages: contactMessages
    });
  });

  // API Route: Delete a contact message
  app.delete('/api/contact/messages/:id', (req, res) => {
    const { id } = req.params;
    const index = contactMessages.findIndex((m) => m.id === id);
    if (index !== -1) {
      contactMessages.splice(index, 1);
      return res.json({ success: true });
    }
    return res.status(404).json({ success: false, message: 'Message not found' });
  });

  // Status check for Brevo connection
  app.get('/api/brevo/status', async (_req, res) => {
    try {
      const response = await fetch(`https://api.brevo.com/v3/contacts/lists/${DEFAULT_LIST_ID}`, {
        headers: {
          'api-key': BREVO_API_KEY,
          'accept': 'application/json'
        }
      });
      if (response.ok) {
        const listData = (await response.json()) as any;
        return res.json({
          connected: true,
          listName: listData.name,
          listId: listData.id,
          totalSubscribers: listData.uniqueSubscribers
        });
      }
      return res.json({ connected: false, status: response.status });
    } catch (err: any) {
      return res.json({ connected: false, error: err.message });
    }
  });

  // In development, hook up Vite dev server middlewares
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static build in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`CommissionPilot server running on http://${HOST}:${PORT}`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://${HOST}:${PORT}/`);
  });
}

startServer();
