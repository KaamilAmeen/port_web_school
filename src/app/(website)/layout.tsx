import { ScrollProgress } from "@/components/animations/scroll-progress";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function WebsiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-navy focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
