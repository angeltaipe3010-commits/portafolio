import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Qué renderizar si el subárbol falla. Por defecto, nada. */
  fallback?: ReactNode;
};

type State = { failed: boolean };

/**
 * Aísla fallos de subárboles opcionales (por ejemplo un import dinámico que
 * no llega). Sin esto, un chunk que no carga desmonta toda la app.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
