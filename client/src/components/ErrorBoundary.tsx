import { Component, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary - Catches React errors and displays a fallback UI
 * 
 * Prevents the entire application from crashing when a component
 * encounters an error. Shows a user-friendly error message instead.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card border border-card-border rounded-xl p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="font-heading font-bold text-2xl text-card-foreground">
                Something Went Wrong
              </h1>
              <p className="text-muted-foreground">
                We encountered an unexpected error. Don't worry, we're on it.
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center min-h-10 px-8 text-base font-medium rounded-md bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground transition-colors w-full"
              data-testid="button-reload"
            >
              Return to Home
            </button>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left text-sm bg-muted p-4 rounded-md">
                <summary className="cursor-pointer font-semibold text-foreground mb-2">
                  Error Details
                </summary>
                <pre className="text-xs text-muted-foreground overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
