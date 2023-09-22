import "./globals.css";
import Provider from "@app/Provider";
import Nav from "@components/Nav";
import Blur from "@components/Blur";

import { Oswald, MuseoModerno, Agdasima, Inconsolata } from "next/font/google";

export const metadata = {
  title: "Arya's Website",
  description: "Created by Arya",
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
          <main className="text-arya3 dark:text-light">
            <Blur>{children}</Blur>
          </main>
        </Provider>
      </body>
    </html>
  );
}
