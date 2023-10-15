"use client";
import "../_styles/globals.css";
import Header from "../_components/header/_";
import { store } from "../_store/store";
import { Provider } from "react-redux";
import CommonDialog from "../_components/util/common_dialog";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>title</title>
      </head>
      <body>
        <Provider store={store}>
          <Header />
          <CommonDialog />
          {children}
        </Provider>
      </body>
    </html>
  );
}
