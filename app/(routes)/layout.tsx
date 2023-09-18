"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import Header from "../_components/header";
import { store } from "../_store/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ['latin'] })

// Reduxのstoreを使うためmetadataを一旦削除

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
//FIXME: 地図の下に黒いスペースができてしまう