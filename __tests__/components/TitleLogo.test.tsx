import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TitleLogo from "@/app/_components/header/title_logo";

describe("TitleLogoのテスト", () => {
  it("しまぽという文字列が表示されている", () => {
    render(<TitleLogo />);
    const text = screen.getByText("しまぽ");
    expect(text).toBeInTheDocument();
  });
});
