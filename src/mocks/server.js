import { setupServer } from "msw/node";
import { globalHandler } from "./globalHandler";

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...globalHandler);
