import fs from 'fs';
import path from 'path';
import TradingDashboard from './components/TradingDashboard';

const dashboardHtmlPath = path.join(process.cwd(), 'public', 'dashboard.html');
const dashboardHtml = fs.readFileSync(dashboardHtmlPath, 'utf-8');

export default function Home() {
  return <TradingDashboard initialHtml={dashboardHtml} />;
}
