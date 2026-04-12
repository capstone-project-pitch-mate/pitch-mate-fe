import "@tanstack/react-query";

import type { ApiError } from "./index";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError;
  }
}
