import {
  Component,
  type ComponentType,
  type GetDerivedStateFromError,
  type PropsWithChildren,
} from "react";

type FallbackComponent = ComponentType<{ error: unknown }>;

type ErrorBoundaryProps = PropsWithChildren<{
  fallback: FallbackComponent;
}>;

type ErrorBoundaryState = {
  error?: unknown;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError: GetDerivedStateFromError<
    ErrorBoundaryProps,
    ErrorBoundaryState
  > = (error) => ({ error });

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { fallback: Fallback, children } = this.props;

    return error ? <Fallback error={error} /> : children;
  }
}
