import "globals.css";
import Provider from "@app/Provider";
import Nav from "@components/Nav";
import BG from "@components/BG";

import { Oswald, MuseoModerno, Agdasima, Inconsolata } from "next/font/google";

export const metadata = {
  title: "Arya's Website",
  description: "Created by Arya",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

const oswald = Oswald({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${oswald.className}`}>
        <Provider>
          <Nav />
          <main className="text-dark dark:text-light">
            <BG>{children}</BG>
          </main>
        </Provider>
      </body>
    </html>
  );
}
