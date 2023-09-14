"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import Header from "./components/header";
import Sidebar from './components/sidebar';
import Grid from "@mui/material/Grid";
import { store } from "./store/store";
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
          <Grid container direction="row" spacing={2}>
            <Grid item xs={3}>
              <Sidebar />
            </Grid>
            <Grid item xs={9} id="content">
              {children}
            </Grid>
          </Grid>
        </Provider>
      </body>
    </html>
  );
}
//FIXME: 地図の下に黒いスペースができてしまう