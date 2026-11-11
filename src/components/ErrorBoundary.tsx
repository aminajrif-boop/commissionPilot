import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public handleHardReset = () => {
    try {
      sessionStorage.removeItem('commissionpilot_auth');
    } catch (e) {
      // ignore
    }
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[350px] p-8 flex items-center justify-center bg-slate-900 text-white rounded-2xl m-4 border border-rose-900/50 shadow-2xl">
          <div className="max-w-md text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center border border-rose-500/30">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                {this.props.fallbackTitle || 'Se produjo un error inesperado al cargar la vista'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hemos evitado que la pantalla se quede en blanco. Puedes restablecer la vista o recargar la sesión.
              </p>
              {this.state.error?.message && (
                <div className="mt-2 p-2.5 bg-black/40 rounded-lg text-[11px] font-mono text-rose-300 text-left overflow-x-auto border border-rose-950">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reintentar</span>
              </button>
              <button
                type="button"
                onClick={this.handleHardReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Reiniciar sesión y volver</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
