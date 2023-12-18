"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { SessionProvider } from "next-auth/react";
import { ReactFlowProvider } from "reactflow";

export default function Providers({ children, ...props }) {
  return (
    <Provider store={store}>
      <SessionProvider {...props}>
        <ReactFlowProvider>{children}</ReactFlowProvider>
      </SessionProvider>
    </Provider>
  );
}
