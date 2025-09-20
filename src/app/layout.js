import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import FooterWrapper from "@/components/common/footerWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Spendex- Your Financial friend",
  description: "your financial assistant buddy",
};

export default function RootLayout({ children }) {
  const setThemeScript = `(function(){
    try{
      var stored = localStorage.getItem('theme');
      if(stored === 'light' || stored === 'dark'){
        document.documentElement.setAttribute('data-theme', stored);
      } else {
        var prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', prefers);
      }
    }catch(e){/* ignore */}
  })();`;

  // Detect chunk load errors in the browser (e.g. HMR / dev timeout) and reload once
  // This is a lightweight recovery to avoid a broken SPA state when a client chunk
  // fails to load (common during dev when HMR produces transient missing chunks).
  const chunkReloadScript = `(function(){
    try{
      if(typeof window === 'undefined') return;
      var reloading = false;
      function handleError(ev){
        try{
          var msg = '';
          if(ev && ev.message) msg = ev.message;
          if(!msg && ev && ev.reason && ev.reason.message) msg = ev.reason.message;
          if(!msg && typeof ev === 'string') msg = ev;
          if(msg && (msg.indexOf('Loading chunk') !== -1 || msg.indexOf('ChunkLoadError') !== -1)){
            if(!reloading){
              reloading = true;
              // small delay so any devtools logs show up before reload
              setTimeout(function(){ try{ window.location.reload(true); }catch(e) { window.location.reload(); } }, 80);
            }
          }
        }catch(e){/* ignore errors in the recovery handler */}
      }
      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleError);
    }catch(e){/* silent */}
  })();`;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/SPENDEX.png" />
        <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />
        <script dangerouslySetInnerHTML={{ __html: chunkReloadScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative overflow-x-hidden`}
      >
        <Header />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
