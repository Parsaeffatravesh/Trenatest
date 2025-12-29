import { AccountSummaryCard } from './cards/AccountSummaryCard';
import { EconomicCalendarCard } from './cards/EconomicCalendarCard';
import { ServerInfoCard } from './cards/ServerInfoCard';
import { WatchlistCard } from './cards/WatchlistCard';

export function LeftSidebar() {
  return (
    <>
      <WatchlistCard />
      <AccountSummaryCard />
      <ServerInfoCard />
      <EconomicCalendarCard className="hidden xl:block" />
    </>
  );
}
