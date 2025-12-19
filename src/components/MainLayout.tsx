"use client";

import { usePathname } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
}

export default function MainLayout({ children, navbar }: MainLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return <main>{children}</main>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {navbar}
      <main className="flex-1">{children}</main>
    </div>
  );
}
