/** @format */

import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-6 w-full bg-slate-200">
      {children}
    </div>
  );
}
