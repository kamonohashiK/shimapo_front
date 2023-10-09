import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageUploadForm from "@/app/_components/dialog_contents/img_upload_form";

describe("TitleLogoのテスト", () => {
  it("ユーザーにアクションを促す文字列が表示されている", () => {
    render(<ImageUploadForm />);
    const text = screen.getByText(
      "画像をドラッグ&ドロップするか、クリックして選択してください。"
    );
    expect(text).toBeInTheDocument();
  });
});
