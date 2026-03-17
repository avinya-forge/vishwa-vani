const React = require("react");

module.exports = function MockReactMarkdown({ children }) {
  return React.createElement("div", { "data-testid": "mock-react-markdown" }, children);
};
