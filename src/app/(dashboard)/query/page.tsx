import { Suspense } from "react";
import QueryClient from "./QueryClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClient />
    </Suspense>
  );
}