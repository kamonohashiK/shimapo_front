"use client";
import "../_styles/globals.css";
import Header from "../_components/header/_";
import { store } from "../_store/store";
import { Provider } from "react-redux";
import CommonDialog from "../_components/util/common_dialog";
import { appText } from "../_constants/text";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProduction = process.env.NEXT_PUBLIC_ENV_NAME === "production";
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content={appText.META_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{appText.META_TITLE}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@platypus_k86" />
        <meta name="twitter:title" content={appText.META_TITLE} />
        <meta name="twitter:description" content={appText.META_DESCRIPTION} />
        <meta name="twitter:image" content="/ogp.png" />
        {!isProduction && <meta name="robots" content="noindex" />}
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
