// 文字列を冒頭40文字まで表示する
export const trimText = (text: string) => {
  return text.slice(0, 40) + (text.length > 40 ? "..." : "");
};
