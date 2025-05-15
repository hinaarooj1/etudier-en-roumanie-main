// app/layout.js (or layout.tsx)
import "../styles/globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <main>{children}</main>
      </body>
    </html>
  );
}
