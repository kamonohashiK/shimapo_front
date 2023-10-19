import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TitleLogo from "@/app/_components/header/title_logo";

describe("TitleLogoのテスト", () => {
  it("ritoGraphという文字列が表示されている", () => {
    render(<TitleLogo />);
    const text = screen.getByText("ritoGraph");
    expect(text).toBeInTheDocument();
  });
});
