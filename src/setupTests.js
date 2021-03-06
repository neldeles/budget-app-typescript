// src/setupTests.js
import { drop } from "@mswjs/data";
import { db } from "mocks/db";
import { server } from "./mocks/server.js";
import { setGlobalConfig } from "@storybook/testing-react";
import * as globalStorybookConfig from "../.storybook/preview";

setGlobalConfig(globalStorybookConfig);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  drop(db);
  window.localStorage.clear();
});

// Clean up after the tests are finished.
afterAll(() => server.close());

// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});
