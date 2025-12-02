// ==================== TRANSLATIONS ====================
        const translations = {
            en: {
                appName: "NeoTrader",
                appTagline: "Professional Trading Terminal",
                nav: { watchlist: "Watchlist", charts: "Charts", orders: "Orders", portfolio: "Portfolio", analytics: "Analytics", trade: "Trade", more: "More" },
                status: { marketOpen: "Market Open", live: "Live" },
                user: { name: "John Doe", plan: "Pro Account" },
                watchlist: { title: "Watchlist", add: "Add", stocks: "Stocks" },
                server: { connected: "Connected", server: "Server", leverage: "Leverage", session: "Session" },
                account: { title: "Account", deposit: "Deposit", totalBalance: "Total Balance", equity: "Equity", margin: "Margin", freeMargin: "Free Margin", marginLevel: "Margin Level", today: "today" },
                chart: { indicators: "Indicators", draw: "Draw", volume: "Volume" },
                orderBook: { title: "Order Book", price: "Price (USDT)", amount: "Amount (BTC)", total: "Total", buyers: "Buyers", sellers: "Sellers" },
                recentTrades: { title: "Recent Trades", price: "Price (USDT)", amount: "Amount (BTC)", time: "Time" },
                trades: { count: "Trades", buyVolume: "Buy Vol", sellVolume: "Sell Vol" },
                order: { quickTrade: "Quick Trade", market: "Market", limit: "Limit", stopLimit: "Stop Limit", trailing: "Trailing Stop", buy: "Buy", sell: "Sell", long: "Long", short: "Short", price: "Price", lastPrice: "Last Price", amount: "Amount", available: "Avbl:", takeProfit: "Take Profit", stopLoss: "Stop Loss", tpsl: "TP/SL", orderValue: "Order Value", fee: "Fee (0.1%)", total: "Total", buyMarket: "Buy / Long BTC", sellMarket: "Sell / Short BTC" },
                positions: { title: "Positions", close: "Close", pnl: "PnL", roe: "ROE" },
                orders: { pending: "Orders", history: "History", cancel: "Cancel", modify: "Modify" },
                calendar: { title: "Economic Calendar" },
                risk: { title: "Risk Calculator", riskReward: "Risk/Reward", maxLoss: "Max Loss", potentialProfit: "Potential Profit", breakeven: "Break-even" },
                toast: { orderPlaced: "Order placed successfully!", orderCancelled: "Order cancelled", connected: "Connected to market", priceAlert: "Price alert triggered!" }
            },
            fa: {
                appName: "نئوتریدر",
                appTagline: "ترمینال معاملاتی حرفه‌ای",
                nav: { watchlist: "لیست نظارت", charts: "نمودارها", orders: "سفارشات", portfolio: "سبد", analytics: "تحلیل‌ها", trade: "معامله", more: "بیشتر" },
                status: { marketOpen: "بازار باز", live: "زنده" },
                user: { name: "کاربر عزیز", plan: "حساب حرفه‌ای" },
                watchlist: { title: "لیست نظارت", add: "افزودن", stocks: "سهام" },
                server: { connected: "متصل", server: "سرور", leverage: "اهرم", session: "نشست" },
                account: { title: "حساب", deposit: "واریز", totalBalance: "موجودی کل", equity: "ارزش خالص", margin: "مارجین", freeMargin: "مارجین آزاد", marginLevel: "سطح مارجین", today: "امروز" },
                chart: { indicators: "اندیکاتورها", draw: "رسم", volume: "حجم" },
                orderBook: { title: "دفتر سفارشات", price: "قیمت (USDT)", amount: "مقدار (BTC)", total: "مجموع", buyers: "خریداران", sellers: "فروشندگان" },
                recentTrades: { title: "معاملات اخیر", price: "قیمت (USDT)", amount: "مقدار (BTC)", time: "زمان" },
                trades: { count: "معاملات", buyVolume: "حجم خرید", sellVolume: "حجم فروش" },
                order: { quickTrade: "معامله سریع", market: "مارکت", limit: "لیمیت", stopLimit: "استاپ لیمیت", trailing: "تریلینگ استاپ", buy: "خرید", sell: "فروش", long: "لانگ", short: "شورت", price: "قیمت", lastPrice: "آخرین قیمت", amount: "مقدار", available: "موجود:", takeProfit: "حد سود", stopLoss: "حد ضرر", tpsl: "TP/SL", orderValue: "ارزش سفارش", fee: "کارمزد (0.1%)", total: "مجموع", buyMarket: "خرید / لانگ BTC", sellMarket: "فروش / شورت BTC" },
                positions: { title: "پوزیشن‌ها", close: "بستن", pnl: "سود/زیان", roe: "بازده" },
                orders: { pending: "سفارشات", history: "تاریخچه", cancel: "لغو", modify: "ویرایش" },
                calendar: { title: "تقویم اقتصادی" },
                risk: { title: "محاسبه‌گر ریسک", riskReward: "ریسک/ریوارد", maxLoss: "حداکثر ضرر", potentialProfit: "سود بالقوه", breakeven: "سربه‌سر" },
                toast: { orderPlaced: "سفارش با موفقیت ثبت شد!", orderCancelled: "سفارش لغو شد", connected: "به بازار متصل شدید", priceAlert: "هشدار قیمت!" }
            }
        };

        let currentLang = 'en';
        let isBuyMode = true;
        let basePrice = 67542.30;
        let candleData = [];
        let volumeData = [];

        // Initialize
        function init() {
            generateCandleData();
            setLanguage('en');
            setupEventListeners();
            startLiveUpdates();
            
            setTimeout(() => showToast(t('toast.connected'), 'info'), 1000);
        }

        // Language Functions
        function setLanguage(lang) {
            currentLang = lang;
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
            document.getElementById('currentLang').textContent = lang.toUpperCase();
            
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const value = getNestedTranslation(translations[lang], key);
                if (value) el.textContent = value;
            });
            
            generateWatchlist();
            generateOrderBook();
            generateRecentTrades();
            generatePositions();
            generateOrders();
            generateHistory();
            generateCalendar();
            drawChart();
        }

        function getNestedTranslation(obj, path) {
            return path.split('.').reduce((acc, part) => acc && acc[part], obj);
        }

        function t(key) {
            return getNestedTranslation(translations[currentLang], key) || key;
        }

        // Number Formatting
        function formatNumber(num, decimals = 2) {
            const locale = currentLang === 'fa' ? 'fa-IR' : 'en-US';
            return new Intl.NumberFormat(locale, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(num);
        }

        function formatCompact(num) {
            if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
            if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
            if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
            return num.toFixed(2);
        }

        // Watchlist Data
        const watchlistData = {
            crypto: [
                { symbol: "BTC", name: "Bitcoin", price: 67542.30, change: 2.41, icon: "₿" },
                { symbol: "ETH", name: "Ethereum", price: 3456.78, change: 1.86, icon: "Ξ" },
                { symbol: "SOL", name: "Solana", price: 145.67, change: 5.67, icon: "◎" },
                { symbol: "BNB", name: "BNB", price: 598.45, change: -0.92, icon: "🔶" },
                { symbol: "XRP", name: "Ripple", price: 0.6234, change: -1.23, icon: "✕" },
                { symbol: "ADA", name: "Cardano", price: 0.4521, change: 3.45, icon: "₳" }
            ],
            fx: [
                { symbol: "EUR/USD", name: "Euro/Dollar", price: 1.08241, change: 0.34, icon: "€" },
                { symbol: "GBP/USD", name: "Pound/Dollar", price: 1.25412, change: -0.18, icon: "£" },
                { symbol: "USD/JPY", name: "Dollar/Yen", price: 147.234, change: 0.09, icon: "¥" },
                { symbol: "AUD/USD", name: "Aussie/Dollar", price: 0.65123, change: -0.52, icon: "A$" },
                { symbol: "USD/CHF", name: "Dollar/Franc", price: 0.88432, change: 0.21, icon: "₣" }
            ],
            stocks: [
                { symbol: "AAPL", name: "Apple Inc.", price: 178.45, change: 1.23, icon: "🍎" },
                { symbol: "GOOGL", name: "Alphabet", price: 141.23, change: 0.87, icon: "G" },
                { symbol: "MSFT", name: "Microsoft", price: 378.91, change: -0.34, icon: "M" },
                { symbol: "NVDA", name: "NVIDIA", price: 721.33, change: 4.56, icon: "N" },
                { symbol: "TSLA", name: "Tesla", price: 245.67, change: -2.34, icon: "T" }
            ]
        };

        let currentWatchlistTab = 'crypto';

        function generateWatchlist() {
            const container = document.getElementById('watchlistItems');
            const items = watchlistData[currentWatchlistTab] || [];
            
            container.innerHTML = items.map(item => {
                const isPositive = item.change >= 0;
                return `
                    <button class="w-full text-start p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-gradient-to-br ${isPositive ? 'from-emerald-500/20 to-cyan-500/20' : 'from-rose-500/20 to-orange-500/20'} flex items-center justify-center text-sm">
                            ${item.icon}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <span class="font-medium text-white text-[11px]">${item.symbol}</span>
                                <span class="font-mono text-white text-[11px]">${formatNumber(item.price, item.price < 10 ? 4 : 2)}</span>
                            </div>
                            <div class="flex items-center justify-between mt-0.5">
                                <span class="text-[10px] text-slate-500 truncate">${item.name}</span>
                                <span class="text-[10px] font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}">
                                    ${isPositive ? '+' : ''}${item.change}%
                                </span>
                            </div>
                        </div>
                    </button>
                `;
            }).join('');
        }

        // Order Book
        function generateOrderBook() {
            const askContainer = document.getElementById('askOrders');
            const bidContainer = document.getElementById('bidOrders');
            
            let askHtml = '', bidHtml = '';
            
            for (let i = 5; i >= 1; i--) {
                const price = basePrice + (i * 15);
                const amount = (Math.random() * 3 + 0.1).toFixed(4);
                const total = (price * parseFloat(amount)).toFixed(2);
                const width = Math.random() * 70 + 30;
                
                askHtml += `
                    <div class="relative flex justify-between text-[10px] py-1.5 px-2 hover:bg-white/5 cursor-pointer rounded-lg transition group">
                        <div class="absolute inset-y-0 end-0 order-depth-ask rounded-lg transition-all" style="width: ${width}%"></div>
                        <span class="relative text-rose-400 font-mono font-medium">${formatNumber(price, 2)}</span>
                        <span class="relative text-slate-300 font-mono">${amount}</span>
                        <span class="relative text-slate-500 font-mono">${formatCompact(parseFloat(total))}</span>
                    </div>
                `;
            }
            
            for (let i = 1; i <= 5; i++) {
                const price = basePrice - (i * 14);
                const amount = (Math.random() * 3 + 0.1).toFixed(4);
                const total = (price * parseFloat(amount)).toFixed(2);
                const width = Math.random() * 70 + 30;
                
                bidHtml += `
                    <div class="relative flex justify-between text-[10px] py-1.5 px-2 hover:bg-white/5 cursor-pointer rounded-lg transition group">
                        <div class="absolute inset-y-0 end-0 order-depth-bid rounded-lg transition-all" style="width: ${width}%"></div>
                        <span class="relative text-emerald-400 font-mono font-medium">${formatNumber(price, 2)}</span>
                        <span class="relative text-slate-300 font-mono">${amount}</span>
                        <span class="relative text-slate-500 font-mono">${formatCompact(parseFloat(total))}</span>
                    </div>
                `;
            }
            
            askContainer.innerHTML = askHtml;
            bidContainer.innerHTML = bidHtml;
        }

        // Recent Trades
        function generateRecentTrades() {
            const container = document.getElementById('recentTrades');
            const now = new Date();
            
            container.innerHTML = Array.from({ length: 20 }, (_, i) => {
                const isBuy = Math.random() > 0.45;
                const price = basePrice + (Math.random() - 0.5) * 80;
                const amount = (Math.random() * 0.8 + 0.01).toFixed(4);
                const time = new Date(now - i * 3000);
                const timeStr = time.toLocaleTimeString(currentLang === 'fa' ? 'fa-IR' : 'en-US', { 
                    hour: '2-digit', minute: '2-digit', second: '2-digit' 
                });
                
                return `
                    <div class="flex justify-between text-[10px] py-1.5 px-2 hover:bg-white/5 rounded-lg transition ${i === 0 ? 'fade-in' : ''}">
                        <span class="${isBuy ? 'text-emerald-400' : 'text-rose-400'} font-mono font-medium">${formatNumber(price, 2)}</span>
                        <span class="text-slate-300 font-mono">${amount}</span>
                        <span class="text-slate-500 font-mono">${timeStr}</span>
                    </div>
                `;
            }).join('');
        }

        // Positions
        function generatePositions() {
            const container = document.getElementById('positionsPanel');
            const positions = [
                { symbol: "BTC/USDT", side: "Long", size: "0.50", entry: 66800, current: basePrice, leverage: "10x" },
                { symbol: "ETH/USDT", side: "Long", size: "5.00", entry: 3400, current: 3456.78, leverage: "5x" },
                { symbol: "SOL/USDT", side: "Short", size: "20.0", entry: 150, current: 145.67, leverage: "10x" },
                { symbol: "EUR/USD", side: "Long", size: "0.30", entry: 1.0812, current: 1.08241, leverage: "100x" },
                { symbol: "XAU/USD", side: "Short", size: "0.10", entry: 2050, current: 2043.10, leverage: "20x" }
            ];
            
            container.innerHTML = positions.map(pos => {
                const pnl = pos.side === 'Long' 
                    ? (pos.current - pos.entry) * parseFloat(pos.size) * parseInt(pos.leverage)
                    : (pos.entry - pos.current) * parseFloat(pos.size) * parseInt(pos.leverage);
                const pnlPercent = (pnl / (pos.entry * parseFloat(pos.size))) * 100;
                const isProfit = pnl >= 0;
                const isLong = pos.side === 'Long';
                
                return `
                    <div class="p-3 rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition group">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                                <span class="font-medium text-white text-[11px]">${pos.symbol}</span>
                                <span class="px-1.5 py-0.5 rounded text-[9px] font-medium ${isLong ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}">
                                    ${pos.side} ${pos.leverage}
                                </span>
                            </div>
                            <div class="text-end">
                                <p class="font-mono text-[11px] font-medium ${isProfit ? 'text-emerald-400 neon-green' : 'text-rose-400 neon-red'}">
                                    ${isProfit ? '+' : ''}$${pnl.toFixed(2)}
                                </p>
                                <p class="text-[9px] ${isProfit ? 'text-emerald-400/70' : 'text-rose-400/70'}">
                                    ${isProfit ? '+' : ''}${pnlPercent.toFixed(2)}%
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center justify-between text-[10px]">
                            <div class="flex items-center gap-3">
                                <span class="text-slate-500">Size: <span class="text-white font-mono">${pos.size}</span></span>
                                <span class="text-slate-500">Entry: <span class="text-white font-mono">${formatNumber(pos.entry, pos.entry < 10 ? 4 : 2)}</span></span>
                            </div>
                            <button class="opacity-0 group-hover:opacity-100 px-2 py-1 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition text-[9px] font-medium">
                                ${t('positions.close')}
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Orders
        function generateOrders() {
            const container = document.getElementById('ordersPanel');
            const orders = [
                { symbol: "BTC/USDT", type: "Limit", side: "Buy", price: 65000, amount: "0.10" },
                { symbol: "ETH/USDT", type: "Stop", side: "Sell", price: 3200, amount: "2.00" },
                { symbol: "SOL/USDT", type: "Limit", side: "Buy", price: 140, amount: "10.0" }
            ];
            
            container.innerHTML = orders.map(order => {
                const isBuy = order.side === 'Buy';
                return `
                    <div class="p-3 rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition group">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                                <span class="font-medium text-white text-[11px]">${order.symbol}</span>
                                <span class="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-800 text-slate-400">${order.type}</span>
                                <span class="px-1.5 py-0.5 rounded text-[9px] font-medium ${isBuy ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}">
                                    ${order.side}
                                </span>
                            </div>
                            <button class="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="flex items-center gap-3 text-[10px]">
                            <span class="text-slate-500">Amount: <span class="text-white font-mono">${order.amount}</span></span>
                            <span class="text-slate-500">@ <span class="text-cyan-400 font-mono">${formatNumber(order.price, 2)}</span></span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // History
        function generateHistory() {
            const container = document.getElementById('historyPanel');
            const history = [
                { symbol: "BTC/USDT", side: "Buy", amount: "0.25", price: 66800, pnl: "+$342.50", time: "10:23:45" },
                { symbol: "ETH/USDT", side: "Sell", amount: "2.00", price: 3520, pnl: "-$89.20", time: "09:15:22" },
                { symbol: "SOL/USDT", side: "Buy", amount: "15.0", price: 142.50, pnl: "+$127.80", time: "Yesterday" }
            ];
            
            container.innerHTML = history.map(h => {
                const isProfit = h.pnl.startsWith('+');
                const isBuy = h.side === 'Buy';
                return `
                    <div class="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                                <span class="font-medium text-white text-[11px]">${h.symbol}</span>
                                <span class="px-1.5 py-0.5 rounded text-[9px] font-medium ${isBuy ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}">
                                    ${h.side}
                                </span>
                            </div>
                            <span class="font-mono text-[11px] ${isProfit ? 'text-emerald-400' : 'text-rose-400'}">${h.pnl}</span>
                        </div>
                        <div class="flex items-center justify-between text-[10px] text-slate-500">
                            <span>${h.amount} @ ${formatNumber(h.price, 2)}</span>
                            <span>${h.time}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Calendar
        function generateCalendar() {
            const container = document.getElementById('calendarEvents');
            if (!container) return;
            
            const events = [
                { time: "14:30", title: "US CPI", impact: "high", currency: "USD" },
                { time: "16:00", title: "Fed Speech", impact: "medium", currency: "USD" },
                { time: "18:30", title: "Oil Inventories", impact: "low", currency: "USD" }
            ];
            
            container.innerHTML = events.map(e => {
                const impactColor = e.impact === 'high' ? 'bg-rose-500' : e.impact === 'medium' ? 'bg-yellow-500' : 'bg-emerald-500';
                return `
                    <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition">
                        <span class="text-[10px] font-mono text-slate-400 w-10">${e.time}</span>
                        <span class="w-2 h-2 rounded-full ${impactColor}"></span>
                        <div class="flex-1">
                            <p class="text-[11px] text-white">${e.title}</p>
                            <p class="text-[9px] text-slate-500">${e.currency}</p>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Chart Drawing
        function generateCandleData() {
            candleData = [];
            volumeData = [];
            let price = 66500;
            
            for (let i = 0; i < 60; i++) {
                const open = price;
                const change = (Math.random() - 0.48) * 200;
                const close = open + change;
                const high = Math.max(open, close) + Math.random() * 100;
                const low = Math.min(open, close) - Math.random() * 100;
                const volume = Math.random() * 1000 + 200;
                
                candleData.push({ open, high, low, close, time: Date.now() - (60 - i) * 3600000 });
                volumeData.push({ value: volume, isUp: close >= open });
                price = close;
            }
        }

        function drawChart() {
            const canvas = document.getElementById('priceChart');
            const volumeCanvas = document.getElementById('volumeChart');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const vCtx = volumeCanvas.getContext('2d');
            
            // Set canvas size
            const rect = canvas.parentElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            volumeCanvas.width = rect.width * dpr;
            volumeCanvas.height = 48 * dpr;
            ctx.scale(dpr, dpr);
            vCtx.scale(dpr, dpr);
            
            const width = rect.width;
            const height = rect.height;
            const vHeight = 48;
            
            // Clear
            ctx.clearRect(0, 0, width, height);
            vCtx.clearRect(0, 0, width, vHeight);
            
            if (candleData.length === 0) return;
            
            const minPrice = Math.min(...candleData.map(c => c.low)) - 50;
            const maxPrice = Math.max(...candleData.map(c => c.high)) + 50;
            const priceRange = maxPrice - minPrice;
            const maxVolume = Math.max(...volumeData.map(v => v.value));
            
            const candleWidth = (width - 40) / candleData.length;
            const padding = 10;
            
            // Draw candles
            candleData.forEach((candle, i) => {
                const x = i * candleWidth + candleWidth / 2 + 20;
                const isGreen = candle.close >= candle.open;
                
                const openY = padding + (height - 2 * padding) * (1 - (candle.open - minPrice) / priceRange);
                const closeY = padding + (height - 2 * padding) * (1 - (candle.close - minPrice) / priceRange);
                const highY = padding + (height - 2 * padding) * (1 - (candle.high - minPrice) / priceRange);
                const lowY = padding + (height - 2 * padding) * (1 - (candle.low - minPrice) / priceRange);
                
                // Wick
                ctx.strokeStyle = isGreen ? '#10b981' : '#ef4444';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x, highY);
                ctx.lineTo(x, lowY);
                ctx.stroke();
                
                // Body
                const gradient = ctx.createLinearGradient(0, Math.min(openY, closeY), 0, Math.max(openY, closeY));
                if (isGreen) {
                    gradient.addColorStop(0, '#10b981');
                    gradient.addColorStop(1, '#059669');
                } else {
                    gradient.addColorStop(0, '#ef4444');
                    gradient.addColorStop(1, '#dc2626');
                }
                ctx.fillStyle = gradient;
                const bodyTop = Math.min(openY, closeY);
                const bodyHeight = Math.max(Math.abs(closeY - openY), 2);
                ctx.fillRect(x - candleWidth * 0.35, bodyTop, candleWidth * 0.7, bodyHeight);
            });
            
            // Draw MAs
            const drawMA = (period, color) => {
                ctx.strokeStyle = color;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                let sum = 0;
                candleData.forEach((candle, i) => {
                    sum += candle.close;
                    if (i >= period - 1) {
                        const ma = sum / period;
                        sum -= candleData[i - period + 1].close;
                        const x = i * candleWidth + candleWidth / 2 + 20;
                        const y = padding + (height - 2 * padding) * (1 - (ma - minPrice) / priceRange);
                        if (i === period - 1) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                });
                ctx.stroke();
            };
            
            drawMA(20, '#06b6d4');
            drawMA(50, '#8b5cf6');
            
            // Current price line
            const currentY = padding + (height - 2 * padding) * (1 - (basePrice - minPrice) / priceRange);
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(20, currentY);
            ctx.lineTo(width, currentY);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Update price label
            const priceLabel = document.getElementById('priceLabel');
            if (priceLabel) {
                priceLabel.textContent = formatNumber(basePrice, 2);
                priceLabel.style.top = `${currentY}px`;
            }
            
            // Draw volume bars
            volumeData.forEach((vol, i) => {
                const x = i * candleWidth + 20;
                const barHeight = (vol.value / maxVolume) * (vHeight - 8);
                vCtx.fillStyle = vol.isUp ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)';
                vCtx.fillRect(x + 2, vHeight - barHeight - 4, candleWidth - 4, barHeight);
            });
        }

        // Price Simulation
        function simulatePriceUpdate() {
            const change = (Math.random() - 0.5) * 30;
            basePrice += change;
            
            // Update displays
            document.getElementById('currentPrice').textContent = formatNumber(basePrice, 2);
            document.getElementById('headerPrice').textContent = formatNumber(basePrice, 2);
            document.getElementById('midPrice').textContent = formatNumber(basePrice, 2);
            
            const priceEl = document.getElementById('currentPrice');
            priceEl.classList.remove('price-up', 'price-down');
            priceEl.classList.add(change > 0 ? 'price-up' : 'price-down');
            
            // Update trend badge
            const badge = document.getElementById('trendBadge');
            if (change > 0) {
                badge.className = 'text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium';
                badge.textContent = '↑ BULLISH';
            } else {
                badge.className = 'text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-medium';
                badge.textContent = '↓ BEARISH';
            }
            
            // Update candle data
            if (candleData.length > 0) {
                const last = candleData[candleData.length - 1];
                last.close = basePrice;
                last.high = Math.max(last.high, basePrice);
                last.low = Math.min(last.low, basePrice);
                volumeData[volumeData.length - 1].isUp = last.close >= last.open;
            }
        }

        // Toast
        function showToast(message, type = 'success') {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            
            const icons = {
                success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>',
                error: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',
                info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
            };
            
            const colors = {
                success: 'from-emerald-500/90 to-emerald-600/90 border-emerald-400/50',
                error: 'from-rose-500/90 to-rose-600/90 border-rose-400/50',
                info: 'from-cyan-500/90 to-cyan-600/90 border-cyan-400/50'
            };
            
            toast.className = `bg-gradient-to-r ${colors[type]} border backdrop-blur-xl px-4 py-3 rounded-xl text-white shadow-2xl slide-up flex items-center gap-3 text-sm`;
            toast.innerHTML = `
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">${icons[type]}</svg>
                <span class="font-medium">${message}</span>
            `;
            
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px)';
                toast.style.transition = 'all 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // Event Listeners
        function setupEventListeners() {
            // Language toggle
            document.getElementById('langToggle').addEventListener('click', () => {
                setLanguage(currentLang === 'en' ? 'fa' : 'en');
            });
            
            // Watchlist tabs
            document.querySelectorAll('.watchlist-tab').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.watchlist-tab').forEach(b => {
                        b.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
                        b.classList.add('text-slate-400', 'border-transparent');
                    });
                    btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
                    btn.classList.remove('text-slate-400', 'border-transparent');
                    currentWatchlistTab = btn.dataset.tab;
                    generateWatchlist();
                });
            });
            
            // Timeframe buttons
            document.querySelectorAll('.tf-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.tf-btn').forEach(b => {
                        b.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
                        b.classList.add('text-slate-400');
                    });
                    btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
                    btn.classList.remove('text-slate-400');
                    generateCandleData();
                    drawChart();
                });
            });
            
            // Buy/Sell mode toggle
            document.getElementById('buyModeBtn').addEventListener('click', () => {
                isBuyMode = true;
                document.getElementById('buyModeBtn').className = 'flex-1 py-2 rounded-lg text-xs font-semibold bg-emerald-500 text-white transition-all';
                document.getElementById('sellModeBtn').className = 'flex-1 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:bg-white/5 transition-all';
                document.getElementById('submitOrderBtn').className = 'w-full py-3.5 rounded-xl gradient-btn-buy text-white font-semibold text-sm hover:brightness-110 transition-all active:scale-[0.98]';
                document.querySelector('#submitOrderBtn span').textContent = t('order.buyMarket');
            });
            
            document.getElementById('sellModeBtn').addEventListener('click', () => {
                isBuyMode = false;
                document.getElementById('sellModeBtn').className = 'flex-1 py-2 rounded-lg text-xs font-semibold bg-rose-500 text-white transition-all';
                document.getElementById('buyModeBtn').className = 'flex-1 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:bg-white/5 transition-all';
                document.getElementById('submitOrderBtn').className = 'w-full py-3.5 rounded-xl gradient-btn-sell text-white font-semibold text-sm hover:brightness-110 transition-all active:scale-[0.98]';
                document.querySelector('#submitOrderBtn span').textContent = t('order.sellMarket');
            });
            
            // Order type change
            document.getElementById('orderTypeSelect').addEventListener('change', (e) => {
                const limitRow = document.getElementById('limitPriceRow');
                limitRow.classList.toggle('hidden', e.target.value === 'market');
            });
            
            // TP/SL toggle
            document.getElementById('tpslToggle').addEventListener('click', function() {
                const inputs = document.getElementById('tpslInputs');
                const thumb = this.querySelector('span');
                const isActive = inputs.classList.contains('hidden');
                
                inputs.classList.toggle('hidden');
                if (isActive) {
                    this.classList.add('bg-emerald-500');
                    this.classList.remove('bg-slate-700');
                    thumb.classList.add('translate-x-5', 'bg-white');
                    thumb.classList.remove('bg-slate-400');
                } else {
                    this.classList.remove('bg-emerald-500');
                    this.classList.add('bg-slate-700');
                    thumb.classList.remove('translate-x-5', 'bg-white');
                    thumb.classList.add('bg-slate-400');
                }
            });
            
            // Amount slider
            document.getElementById('amountSlider').addEventListener('input', (e) => {
                document.getElementById('sliderValue').textContent = e.target.value + '%';
            });
            
            // Submit order
            document.getElementById('submitOrderBtn').addEventListener('click', () => {
                showToast(t('toast.orderPlaced'), 'success');
            });
            
            // Positions tabs
            document.querySelectorAll('.positions-tab').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.positions-tab').forEach(b => {
                        b.classList.remove('text-white', 'bg-white/5', 'border-emerald-500');
                        b.classList.add('text-slate-400', 'border-transparent');
                    });
                    btn.classList.add('text-white', 'bg-white/5', 'border-emerald-500');
                    btn.classList.remove('text-slate-400', 'border-transparent');
                    
                    document.getElementById('positionsPanel').classList.add('hidden');
                    document.getElementById('ordersPanel').classList.add('hidden');
                    document.getElementById('historyPanel').classList.add('hidden');
                    document.getElementById(btn.dataset.tab + 'Panel').classList.remove('hidden');
                });
            });
            
            // Window resize
            window.addEventListener('resize', drawChart);
        }

        // Live Updates
        function startLiveUpdates() {
            setInterval(simulatePriceUpdate, 1000);
            setInterval(generateOrderBook, 2000);
            setInterval(generateRecentTrades, 2500);
            setInterval(() => {
                document.getElementById('pingValue').textContent = (Math.floor(Math.random() * 25) + 12) + 'ms';
            }, 5000);
            setInterval(drawChart, 1000);
        }

        // Initialize
        window.initDashboard = init;
