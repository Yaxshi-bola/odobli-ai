import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null
    };
  }

  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.href = window.location.origin + window.location.pathname + '?v=' + Date.now();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#1E1B24] flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#DB2777] text-white text-3xl flex items-center justify-center shadow-lg">
            ✨
          </div>
          <h2 className="text-xl font-black text-[#831843]">
            Odobli.ai Qayta Yuklanmoqda...
          </h2>
          <p className="text-xs text-[#9D4C6C] max-w-xs leading-relaxed">
            Ilovani eng so'nggi va toza holatda ochish uchun quyidagi tugmani bosing.
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-3 bg-[#DB2777] text-white text-xs font-black rounded-2xl shadow-md hover:bg-[#BE185D] active:scale-95 transition-all"
          >
            Qayta Yuklash 🔄
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
