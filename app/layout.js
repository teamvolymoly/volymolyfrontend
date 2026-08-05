import "./globals.css";

export const metadata = {
  title: "Volymoly Leads",
  description: "Volymoly CRM lead management workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
