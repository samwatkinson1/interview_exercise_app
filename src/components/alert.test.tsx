import { render, screen } from "@testing-library/react";
import { Alert } from "./alert.tsx";

describe("<Alert />", () => {
  const variants = ["info", "error"] as const;

  it.each(variants)("should render as type %s", (type) => {
    render(<Alert type={type}>alert</Alert>);

    expect(screen.getByRole("alert")).toBeVisible();
    expect(screen.getByRole("alert")).toHaveTextContent("alert");
  });
});
