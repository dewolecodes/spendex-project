"use client";
import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterWrapper() {
  const pathname = typeof usePathname === 'function' ? usePathname() : null;
  const hideOnChat = pathname && pathname.startsWith("/dashboard/wireframe");

  // On the chat page we want to hide the footer for mobile UX.
  // We'll still render the footer for desktop (md+) but hide on small screens via classes.
  if (hideOnChat) {
    return (
      <div className="hidden md:block">
        <Footer />
      </div>
    );
  }

  return <Footer />;
}
