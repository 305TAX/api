//import React from "react";

// import "../styles/globals.css";
// import { ThemeProvider } from "@material-tailwind/react";
//import { ThemeProvider } from "@material-tailwind/react";
//import Navbar from "@/components/Navbar";
//import {  } from "react";
//import Layout from "@/components/Layout";
//import { Inter } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
//const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
