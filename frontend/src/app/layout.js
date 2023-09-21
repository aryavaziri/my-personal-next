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
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${oswald.className}`}>
        <Provider>
          <Nav />
          <Blur>
            <main className="flex flex-col h-full bg-gradient-to-b from-30% dark:from-5% dark:from-[#023e8add] from-arya2 to-80%   to-transparent">
              {children}
            </main>
          </Blur>
        </Provider>
      </body>
    </html>
  );
}
