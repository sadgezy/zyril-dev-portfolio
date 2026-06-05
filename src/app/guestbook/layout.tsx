import React from "react";


// This layout intentionally does NOT import global styles or shared UI.
// It only renders the Guestbook page content as standalone.

export default function GuestbookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
