import { FadeIn } from "@/components/ui/fade-in";
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-8 min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <FadeIn>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-neutral-500 mt-1">Overview of your activity.</p>
          </div>
          <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
            <span>Download Report</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, change: "+20.1%" },
          { title: "Subscriptions", value: "+2350", icon: Users, change: "+180.1%" },
          { title: "Sales", value: "+12,234", icon: CreditCard, change: "+19%" },
          { title: "Active Now", value: "+573", icon: Activity, change: "+201" },
        ].map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.1}>
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <span className="text-sm font-medium text-neutral-500">{item.title}</span>
                <item.icon className="h-4 w-4 text-neutral-500" />
              </div>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                <span className="text-emerald-500 font-medium">{item.change}</span> from last month
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        <div className="lg:col-span-4">
          <FadeIn delay={0.4}>
            <div className="h-[400px] rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Overview</h3>
              <div className="w-full h-full flex items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                Chart Placeholder
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-3">
          <FadeIn delay={0.5}>
            <div className="h-[400px] rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm overflow-hidden">
              <h3 className="font-semibold mb-4">Recent Sales</h3>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="flex items-center group cursor-pointer">
                    <div className="h-9 w-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold group-hover:bg-black group-hover:text-white transition-colors">
                      OM
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Olivia Martin</p>
                      <p className="text-xs text-neutral-500">olivia.martin@email.com</p>
                    </div>
                    <div className="ml-auto font-medium text-sm">+$1,999.00</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
