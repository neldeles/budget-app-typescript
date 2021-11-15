import "../src/index.css";
import { BrowserRouter as Router } from "react-router-dom";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ["Introduction", ["Intro", "Installation"], "components"],
    },
  },
  layout: "fullscreen",
};

export const decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];
