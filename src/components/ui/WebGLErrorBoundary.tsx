"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorType: "generic" | "webgl";
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorType: "generic",
  };

  public static getDerivedStateFromError(error: Error): State {
    const isWebGL = error.message.toLowerCase().includes("webgl") ||
                    error.message.toLowerCase().includes("three");
    return { hasError: true, errorType: isWebGL ? "webgl" : "generic" };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Engine Crash:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-8 text-center border border-white/5 rounded-3xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2">
            {this.state.errorType === "webgl" ? "GPU Context Lost" : "Interface Error"}
          </h3>
          <p className="text-white/40 text-sm max-w-xs mb-8 leading-relaxed">
            The neural 3D engine encountered a hardware bottleneck. Resetting the uplink may resolve the issue.
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-white/80 transition-all uppercase tracking-widest text-[10px]"
          >
            <RefreshCw className="w-3 h-3" />
            Re-Initialize Link
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
