import "../styles/index.css"

const isDev = process.env.NODE_ENV === 'development'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta name="description" content="Zaira – News & Magazine React Next js Template. It is especially following category like Blogs, Sports, Fashion, Science, Soccer, Politics, Videos, Travel, Style, Beauty, Gaming, Health Magazine sites, etc." />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
