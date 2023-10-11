import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TitleLogo from "@/app/_components/header/title_logo";

describe("TitleLogoのテスト", () => {
  let component: ReturnType<typeof render>;

  // 毎回最初にTitleLogoをレンダリングする
  beforeEach(() => {
    component = render(<TitleLogo />);
  });

  it("しまぽという文字列が表示されている", () => {
    const text = screen.getByText("しまぽ");
    expect(text).toBeInTheDocument();
  });

  it("ルートへのリンクがある", () => {
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
