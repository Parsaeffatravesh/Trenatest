import { PositionsTabsCard } from './cards/PositionsTabsCard';
import { QuickTradeCard } from './cards/QuickTradeCard';
import { RiskCalculatorCard } from './cards/RiskCalculatorCard';

export function RightSidebar() {
  return (
    <>
      <QuickTradeCard />
      <PositionsTabsCard />
      <RiskCalculatorCard className="hidden xl:block" />
    </>
  );
}
