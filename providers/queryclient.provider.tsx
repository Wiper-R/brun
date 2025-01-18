"use client";
import { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as _QueryProvider,
} from "react-query";

const client = new QueryClient();

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return <_QueryProvider client={client}>{children}</_QueryProvider>;
}
