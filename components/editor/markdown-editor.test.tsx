import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { markdown-editor } from "./markdown-editor";

describe("markdown-editor Component", () => {
  it("renders correctly with both panes", () => {
    render(<markdown-editor />);

    // Verify raw text area exists
    expect(screen.getByTestId("markdown-textarea")).toBeInTheDocument();

    // Verify rendered output pane exists
    expect(screen.getByTestId("markdown-preview")).toBeInTheDocument();
  });

  it("updates markdown preview when text is typed", () => {
    render(<markdown-editor />);

    const textarea = screen.getByTestId("markdown-textarea");
    const preview = screen.getByTestId("mock-react-markdown");

    // Type some markdown
    fireEvent.change(textarea, { target: { value: "# Hello World" } });

    // Verify textarea has the correct value
    expect(textarea).toHaveValue("# Hello World");

    // Verify preview renders the text
    expect(preview).toHaveTextContent("# Hello World");
  });

  it("handles empty input correctly", () => {
    render(<markdown-editor />);

    const preview = screen.getByTestId("mock-react-markdown");

    // Preview should initially be empty
    expect(preview).toBeEmptyDOMElement();
  });
});
