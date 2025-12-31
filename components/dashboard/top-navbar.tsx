"use client";

import { useState, useRef, useEffect } from "react";
import { Wallet, Bell, X, ArrowDownToLine, ArrowUpFromLine, Check, CheckCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "message" | "deposit" | "withdraw" | "competition";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: "1", type: "deposit", title: "واریز موفق", message: "مبلغ $500 به حساب شما واریز شد", time: "5 دقیقه پیش", read: false },
  { id: "2", type: "competition", title: "شروع مسابقه", message: "مسابقه توربو شروع شد", time: "1 ساعت پیش", read: false },
  { id: "3", type: "message", title: "پیام جدید", message: "شما یک پیام جدید دارید", time: "2 ساعت پیش", read: true },
];

export function TopNavbar() {
  const { t, locale, dir } = useI18n();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [walletTab, setWalletTab] = useState<"deposit" | "withdraw">("deposit");
  const [notifications, setNotifications] = useState(mockNotifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const walletRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const balance = 12450;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (walletRef.current && !walletRef.current.contains(event.target as Node)) {
        setShowWalletModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <>
      <nav className="sticky top-0 z-40 flex items-center justify-between h-14 px-4 lg:px-6 bg-[#0b1224]/95 border-b border-white/10 backdrop-blur-sm" dir={dir}>
        <div className="flex-1" />
        
        <button
          onClick={() => setShowWalletModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500/20 to-purple-500/20 border border-white/10 hover:border-sky-500/30 transition-all group"
        >
          <Wallet size={18} className="text-sky-400" />
          <span className="text-sm font-bold text-white">${balance.toLocaleString("en-US")}</span>
        </button>

        <div className="flex-1 flex justify-end">
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Bell size={20} className={unreadCount > 0 ? "text-sky-400" : "text-slate-400"} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold bg-rose-500 text-white rounded-full px-1 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className={cn(
                "absolute top-full mt-2 w-80 sm:w-96 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden",
                dir === "rtl" ? "left-0" : "right-0"
              )}>
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="font-bold text-white">{t.notifications.title}</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      <CheckCheck size={14} />
                      {t.notifications.markAllRead}
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="p-6 text-center text-slate-500 text-sm">{t.notifications.noNotifications}</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => !notif.read && markAsRead(notif.id)}
                        className={cn(
                          "p-4 border-b border-white/5 hover:bg-white/5 transition-colors",
                          !notif.read && "bg-sky-500/5 cursor-pointer"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                            notif.type === "deposit" && "bg-emerald-500/20 text-emerald-400",
                            notif.type === "withdraw" && "bg-amber-500/20 text-amber-400",
                            notif.type === "competition" && "bg-purple-500/20 text-purple-400",
                            notif.type === "message" && "bg-sky-500/20 text-sky-400"
                          )}>
                            {notif.type === "deposit" && <ArrowDownToLine size={16} />}
                            {notif.type === "withdraw" && <ArrowUpFromLine size={16} />}
                            {notif.type === "competition" && "🏆"}
                            {notif.type === "message" && <Bell size={16} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">{notif.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5 truncate">{notif.message}</p>
                            <p className="text-[10px] text-slate-500 mt-1">{notif.time}</p>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0 mt-2" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div ref={walletRef} className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden" dir={dir}>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-bold text-white">
                {walletTab === "deposit" ? t.wallet.depositTitle : t.wallet.withdrawTitle}
              </h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex border-b border-white/10">
              <button
                onClick={() => setWalletTab("deposit")}
                className={cn(
                  "flex-1 py-3 text-sm font-medium transition-colors",
                  walletTab === "deposit"
                    ? "text-sky-400 border-b-2 border-sky-400 bg-sky-500/5"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <ArrowDownToLine size={16} className="inline-block mr-2" />
                {t.wallet.deposit}
              </button>
              <button
                onClick={() => setWalletTab("withdraw")}
                className={cn(
                  "flex-1 py-3 text-sm font-medium transition-colors",
                  walletTab === "withdraw"
                    ? "text-amber-400 border-b-2 border-amber-400 bg-amber-500/5"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <ArrowUpFromLine size={16} className="inline-block mr-2" />
                {t.wallet.withdraw}
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-slate-500 mb-1">{t.wallet.available}</p>
                <p className="text-2xl font-bold text-white">${balance.toLocaleString("en-US")}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-2">{t.wallet.amount}</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                  <div className="flex gap-2 mt-2">
                    {["25%", "50%", "75%", "100%"].map((pct) => (
                      <button
                        key={pct}
                        className="flex-1 py-1.5 text-xs font-medium text-slate-400 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {pct}
                      </button>
                    ))}
                  </div>
                </div>

                {walletTab === "withdraw" && (
                  <div>
                    <label className="block text-xs text-slate-400 mb-2">{t.wallet.address}</label>
                    <input
                      type="text"
                      placeholder="TRC-20 Address"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors font-mono text-sm"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs text-slate-400 mb-2">{t.wallet.network}</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sky-500/50 transition-colors appearance-none">
                    <option value="trc20">TRC-20 (USDT)</option>
                    <option value="erc20">ERC-20 (USDT)</option>
                    <option value="bep20">BEP-20 (USDT)</option>
                  </select>
                </div>
              </div>

              <button
                className={cn(
                  "w-full py-3 rounded-lg font-bold text-sm transition-all",
                  walletTab === "deposit"
                    ? "bg-sky-500 text-black hover:bg-sky-400 shadow-lg shadow-sky-500/30"
                    : "bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/30"
                )}
              >
                {walletTab === "deposit" ? t.wallet.deposit : t.wallet.withdraw}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
