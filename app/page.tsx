"use client";

import { Providers } from "./providers";
import { Home } from "./pages/Home";

export default function Page() {
  return (
    <Providers>
      <Home />
    </Providers>
  );
}
