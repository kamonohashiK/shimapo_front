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
  if (!isProduction) {
    console.log("This is development mode.");
  }

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content={appText.META_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{appText.META_TITLE}</title>
        <meta property="og:title" content={appText.META_TITLE} />
        <meta property="og:description" content={appText.META_DESCRIPTION} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SELF_URL} />
        <meta property="og:site_name" content={appText.META_TITLE} />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_SELF_URL + "/ogp.png"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@platypus_k86" />
        <meta name="twitter:title" content={appText.META_TITLE} />
        <meta name="twitter:description" content={appText.META_DESCRIPTION} />
        <meta name="twitter:image" content={process.env.NEXT_PUBLIC_SELF_URL + "/ogp.png"}/>
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
