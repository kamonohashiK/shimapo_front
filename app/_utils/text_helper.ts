import ReactHtmlParser from "react-html-parser";

export const textHelper = () => {
  // 文字列を冒頭40文字まで表示する
  const trimText = (text: string) => {
    const t = text.slice(0, 40) + (text.length > 40 ? "..." : "");
    return ReactHtmlParser(t);
  };

  // 文字列内の改行を<br>に変換する
  const sanitize = (text: string) => {
    const sanitizedText = text.replace(/\r?\n/g, "<br>");
    return ReactHtmlParser(sanitizedText);
  };

  return { trimText, sanitize };
};
