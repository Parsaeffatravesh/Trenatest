import { Header } from '../components/layout/Header';
import { MobileNav } from '../components/layout/MobileNav';
import { CenterArea } from '../components/trading/CenterArea';
import { LeftSidebar } from '../components/trading/LeftSidebar';
import { RightSidebar } from '../components/trading/RightSidebar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-slate-50 overflow-x-hidden">
      <div className="h-1 gradient-bar" />

      <Header />

      <main className="mx-auto max-w-[1920px] w-full px-3 sm:px-4 lg:px-6 py-3 flex flex-col xl:flex-row gap-3 pb-20 lg:pb-3">
        <aside className="w-full xl:w-72 flex-shrink-0 flex flex-col gap-3">
          <LeftSidebar />
        </aside>

        <section className="flex-1 flex flex-col gap-3 min-w-0">
          <CenterArea />
        </section>

        <aside className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-3">
          <RightSidebar />
        </aside>
      </main>

      <MobileNav />
    </div>
  );
}
