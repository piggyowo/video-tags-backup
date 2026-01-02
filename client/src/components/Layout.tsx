import React from 'react';
import { Link, useLocation } from 'wouter';
import { LayoutDashboard, Tags, PieChart, Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: '/', icon: LayoutDashboard, label: '概览' },
    { href: '/tags', icon: Tags, label: '标签管理' },
    { href: '/report', icon: PieChart, label: '可视化报告' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar hidden md:flex flex-col p-6 fixed h-full">
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              V
            </div>
            VideoTags
          </h1>
          <p className="text-xs text-muted-foreground mt-2">视频关键词备份系统</p>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm" 
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <Settings className="w-5 h-5" />
            设置
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 animate-in fade-in duration-500">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
