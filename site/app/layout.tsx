import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Telescopic Text",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_2rem] antialiased ">
        <main className="">{children}</main>
      </body>
    </html>
  );
}
