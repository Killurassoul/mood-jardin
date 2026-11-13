import React from 'react';
import {
  Home,
  CalendarDays,
  Heart,
  Activity,
  BookOpen,
  HelpCircle,
  Baby,
  FileText,
  Bell,
  TrendingUp,
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  NotebookPen
} from 'lucide-react';
import { AppLanguage } from '../types';
import { getTranslation } from '../locales/i18n';

export type NavTabId =
  | 'home'
  | 'cycle'
  | 'mood'
  | 'body'
  | 'tools'
  | 'reminders'
  | 'normality'
  | 'encyclopedia'
  | 'fertility'
  | 'healthRecords'
  | 'statistics'
  | 'profile';

interface NavbarProps {
  currentTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  lang: AppLanguage;
  discreteMode: boolean;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onOpenQuickAdd: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  discreteMode,
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenQuickAdd
}) => {
  const t = getTranslation(lang);

  const DAILY_ITEMS: Array<{ id: NavTabId; label: string; icon: any }> = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'cycle', label: t.nav.cycle, icon: CalendarDays },
    { id: 'mood', label: t.nav.mood, icon: NotebookPen },
    { id: 'body', label: t.nav.body, icon: Activity },
    { id: 'tools', label: t.nav.tools, icon: Sparkles },
    { id: 'reminders', label: t.nav.reminders, icon: Bell }
  ];

  const LEARN_ITEMS: Array<{ id: NavTabId; label: string; icon: any }> = [
    { id: 'normality', label: t.nav.normality, icon: HelpCircle },
    { id: 'encyclopedia', label: t.nav.encyclopedia, icon: BookOpen },
    { id: 'fertility', label: t.nav.fertility, icon: Baby },
    { id: 'statistics', label: t.nav.statistics, icon: TrendingUp },
    { id: 'healthRecords', label: t.nav.healthRecords, icon: FileText }
  ];

  const renderItem = (item: { id: NavTabId; label: string; icon: any }) => {
    const Icon = item.icon;
    const active = currentTab === item.id;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onSelectTab(item.id)}
        title={isSidebarCollapsed ? item.label : undefined}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
          active
            ? 'bg-[#e8283c] text-white shadow-md shadow-rose-300/50 scale-[1.01]'
            : 'text-zinc-600 hover:text-zinc-900 hover:bg-rose-100/60'
        }`}
      >
        <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-zinc-500'}`} />
        {!isSidebarCollapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
      </button>
    );
  };

  return (
    <>
      {/* Barre latérale sur ordinateur */}
      <aside
        className={`hidden md:flex flex-col border-r border-rose-200/70 bg-linear-to-b from-card via-rose-50/30 to-pink-50/20 transition-all duration-300 z-30 shrink-0 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-rose-100">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-[#ff6b5e] to-[#e8283c] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-rose-200">
                ✨
              </div>
              <div>
                <h1 className="text-lg font-black text-zinc-900 tracking-tight leading-none">Mood</h1>
                <span className="text-[10px] text-[#e8283c] font-extrabold tracking-wider uppercase">
                  {discreteMode ? 'Espace privé' : 'Mon espace'}
                </span>
              </div>
            </div>
          )}

          {isSidebarCollapsed && (
            <div className="mx-auto w-10 h-10 rounded-2xl bg-linear-to-tr from-[#ff6b5e] to-[#e8283c] text-white flex items-center justify-center font-bold shadow-md">
              ✨
            </div>
          )}

          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-rose-100 transition-colors"
            title={isSidebarCollapsed ? 'Agrandir le menu' : 'Réduire le menu'}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {!isSidebarCollapsed && (
            <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-wider text-zinc-400">
              Mon quotidien
            </p>
          )}
          <div className="space-y-1">{DAILY_ITEMS.map(renderItem)}</div>

          {!isSidebarCollapsed && (
            <p className="px-3 pt-5 pb-2 text-[10px] font-black uppercase tracking-wider text-zinc-400">
              Pour aller plus loin
            </p>
          )}
          <div className="space-y-1 mt-2">{LEARN_ITEMS.map(renderItem)}</div>

          <div className="mt-5 border-t border-rose-100 pt-3">
            {renderItem({ id: 'profile', label: t.nav.profile, icon: User })}
          </div>
        </nav>

        {!isSidebarCollapsed && (
          <div className="p-4 border-t border-rose-100/80">
            <button
              type="button"
              onClick={onOpenQuickAdd}
              className="w-full py-3 rounded-2xl bg-linear-to-r from-[#ff6b5e] to-[#e8283c] text-white text-xs font-extrabold shadow-md shadow-rose-200 flex items-center justify-center gap-2 hover:opacity-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Noter ma journée</span>
            </button>
          </div>
        )}
      </aside>

      {/* Barre du bas sur téléphone */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-rose-200/80 px-3 py-2 shadow-xl">
        <div className="flex items-center justify-between max-w-md mx-auto relative">
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              currentTab === 'home' ? 'text-[#e8283c] font-black' : 'text-zinc-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold">Accueil</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('cycle')}
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              currentTab === 'cycle' ? 'text-[#e8283c] font-black' : 'text-zinc-400'
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold">Règles</span>
          </button>

          <div className="relative -top-5">
            <button
              type="button"
              onClick={onOpenQuickAdd}
              className="w-13 h-13 rounded-full bg-[#e8283c] hover:bg-[#c41426] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-rose-400/60 transition-all border-4 border-zinc-200"
              title="Noter ma journée"
            >
              <Plus className="w-6 h-6 stroke-[3]" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onSelectTab('tools')}
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              currentTab === 'tools' ? 'text-[#e8283c] font-black' : 'text-zinc-400'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold">Outils</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('profile')}
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              currentTab === 'profile' ? 'text-[#e8283c] font-black' : 'text-zinc-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold">Profil</span>
          </button>
        </div>
      </nav>
    </>
  );
};
