import { setupWorker } from "msw";
import { globalHandler } from "./globalHandler";

// This configures a Service Worker with the given request handlers
export const worker = setupWorker(...globalHandler);
