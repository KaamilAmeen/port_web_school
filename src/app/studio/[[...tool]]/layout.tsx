import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Studio",
  description: "Authorised content administration for School Website Port.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
