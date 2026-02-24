import "./globals.css"; // استایل‌ها اینجا ایمپورت میشن تا همه‌جا کار کنن

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}