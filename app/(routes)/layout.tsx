"use client";
import '../_styles/globals.css'
import { Inter } from 'next/font/google'
import Header from "../_components/header/header";
import { store } from "../_store/store";
import { Provider } from "react-redux";
import CommonDialog from '../_components/util/common_dialog';

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
          <CommonDialog />
          {children}
        </Provider>
      </body>
    </html>
  );
}