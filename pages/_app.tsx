import "../styles/globals.css";
import Navbar from "../components/navbar";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
