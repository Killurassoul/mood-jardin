import React from 'react';
import {
  UserProfile,
  DailyLog,
  CycleCalculationResult,
  ReminderItem
} from '../types';
import { SunCloudIllustration } from '../components/SunCloudIllustration';
import { NavTabId } from '../components/Navbar';
import { LogModalTab } from '../components/DailyLogModal';
import {
  Bell,
  ChevronRight,
  Heart,
  Droplets,
  Sparkles,
  CalendarDays,
  Activity,
  BookOpen,
  HelpCircle,
  Wind,
  Moon,
  Phone,
  PlusCircle,
  ArrowRight
} from 'lucide-react';

interface DashboardViewProps {
  profile: UserProfile;
  stats: CycleCalculationResult;
  todayLog: DailyLog;
  reminders: ReminderItem[];
  onOpenLogModal: (tab: LogModalTab) => void;
  onSelectTab: (tab: NavTabId) => void;
  onQuickMoodSelect: (mood: string) => void;
  onQuickLogPeriodStart: () => void;
}

const GENTLE_THOUGHTS = [
  'Tu n’as pas besoin d’être productive pour mériter de te reposer.',
  'Un verre d’eau, cinq respirations, et tu as déjà fait quelque chose pour toi.',
  'Ton corps t’envoie des messages. Tu n’es pas obligée de tout comprendre tout de suite.',
  'Les jours sans énergie font aussi partie d’un cycle normal.',
  'Tu peux demander de l’aide. Ce n’est pas un signe de faiblesse.',
  'Personne ne connaît ton corps mieux que toi.',
  'Aujourd’hui, fais seulement ce qui est possible. C’est assez.'
];

const QUICK_MOODS = [
  { label: 'Je me sens bien', emoji: '🌸', color: 'border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800' },
  { label: 'Je suis fatiguée', emoji: '🌙', color: 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800' },
  { label: 'J’ai des douleurs', emoji: '🩹', color: 'border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800' },
  { label: 'Je suis stressée', emoji: '🌪️', color: 'border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800' },
  { label: 'Je me sens énergique', emoji: '✨', color: 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800' }
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  stats,
  todayLog,
  reminders,
  onOpenLogModal,
  onSelectTab,
  onQuickMoodSelect,
  onQuickLogPeriodStart
}) => {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';
  const firstName = profile.name || 'toi';

  const isPeriod = stats.hasCycleData && stats.currentDayOfCycle <= stats.averagePeriodLength && !stats.isDelayed;
  const isSoon = stats.hasCycleData && !isPeriod && !stats.isDelayed && stats.daysUntilNextPeriod <= 5;

  let statusEmoji = '🌸';
  let statusTitle = `Bienvenue, ${firstName}`;
  let statusText = 'Note le premier jour de tes dernières règles. C’est le seul point de départ dont l’application a besoin.';
  let statusHint = 'Tu pourras tout modifier plus tard.';

  if (stats.hasCycleData && isPeriod) {
    statusEmoji = '🫧';
    statusTitle = 'Tes règles sont là';
    statusText = `Tu es au jour ${stats.currentDayOfCycle} de tes règles. Repose-toi, bois de l’eau et fais ce qui te soulage.`;
    statusHint = 'Tu n’as rien à prouver aujourd’hui.';
  } else if (stats.hasCycleData && stats.isDelayed) {
    statusEmoji = '⏳';
    statusTitle = 'Tes règles ont un peu de retard';
    statusText = `Environ ${stats.daysDelayed} jour${stats.daysDelayed > 1 ? 's' : ''} de décalage. Ça peut arriver avec le stress, la fatigue ou un changement de rythme.`;
    statusHint = 'En cas de doute, un test de grossesse peut t’aider.';
  } else if (isSoon) {
    statusEmoji = '🎒';
    statusTitle = 'Tes règles arrivent bientôt';
    statusText = `Elles sont prévues dans environ ${stats.daysUntilNextPeriod} jour${stats.daysUntilNextPeriod > 1 ? 's' : ''}. Pense à mettre ce qu’il te faut dans ton sac.`;
    statusHint = 'C’est une estimation, pas une date certaine.';
  } else if (stats.hasCycleData) {
    statusEmoji = '🌷';
    statusTitle = `Tu es au jour ${stats.currentDayOfCycle}`;
    statusText = `Tes prochaines règles sont prévues dans environ ${stats.daysUntilNextPeriod} jours. Tu peux noter ce que tu ressens quand tu veux.`;
    statusHint = 'Les dates peuvent bouger d’un cycle à l’autre.';
  }

  const water = todayLog.waterGlasses || 0;
  const sleep = todayLog.sleepHours || 0;
  const painCount =
    (todayLog.symptoms || []).filter(s => s.category === 'pain').length +
    (todayLog.painLocations || []).length;
  const moodLabel = todayLog.quickMood || (todayLog.mood?.freeJournal ? 'Journal noté' : 'Pas encore noté');

  const enabledReminders = reminders
    .filter(r => r.enabled)
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 3);

  const dailyThought = GENTLE_THOUGHTS[now.getDate() % GENTLE_THOUGHTS.length];

  const quickActions: Array<{ label: string; icon: any; tab: LogModalTab; color: string }> = [
    { label: 'Mes règles', icon: Droplets, tab: 'flow', color: 'bg-rose-50 text-rose-600' },
    { label: 'J’ai mal', icon: Activity, tab: 'pain', color: 'bg-amber-50 text-amber-600' },
    { label: 'Mon humeur', icon: Heart, tab: 'mood', color: 'bg-purple-50 text-purple-600' },
    { label: 'Mon eau', icon: Droplets, tab: 'flow', color: 'bg-sky-50 text-sky-600' }
  ];

  const tools = [
    { label: 'Respirer', desc: 'Pour souffler 2 minutes', icon: Wind, emoji: '🌬️' },
    { label: 'Boire de l’eau', desc: 'Un verre à la fois', icon: Droplets, emoji: '💧' },
    { label: 'Mieux dormir', desc: 'Une petite routine du soir', icon: Moon, emoji: '🌙' },
    { label: 'Numéros utiles', desc: 'Les bons contacts', icon: Phone, emoji: '📞' }
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-in fade-in duration-300 pb-12">
      {/* Salutation */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-xl sm:text-2xl font-black text-zinc-900 block tracking-tight">
            {greeting},
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#FF5B84] block tracking-tight">
            {firstName} !
          </span>
          <span className="text-xs text-zinc-400 font-medium flex items-center gap-1 mt-0.5">
            Comment te sens-tu aujourd’hui ? <span className="text-amber-400">✨</span>
          </span>
        </div>
        <SunCloudIllustration size={92} />
      </div>

      {/* Carte principale : où j'en suis */}
      <div className="relative overflow-hidden p-6 rounded-3xl bg-linear-to-r from-[#FF98B1] via-[#FF6E91] to-[#FF5479] text-white shadow-lg shadow-rose-200/60">
        <div className="absolute -right-10 -top-10 text-[120px] opacity-15 leading-none select-none">
          {statusEmoji}
        </div>
        <div className="relative space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-100/90 block">
            Où j’en suis
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            {statusTitle}
          </h2>
          <p className="text-xs text-rose-50 leading-relaxed font-medium max-w-[95%]">
            {statusText}
          </p>
          <p className="text-[11px] text-rose-100/80">{statusHint}</p>
        </div>

        <div className="relative mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onQuickLogPeriodStart}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-rose-50 text-[#FF5B84] text-xs font-black shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Mes règles commencent</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenLogModal('flow')}
            className="px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 text-white text-xs font-black transition-all flex items-center gap-1.5"
          >
            <span>Noter ma journée</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="relative mt-3 text-[10px] text-rose-100/80">
          Les dates sont des estimations. Elles ne remplacent pas une contraception ni un avis médical.
        </p>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-4 gap-2.5">
        {quickActions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              onClick={() => onOpenLogModal(action.tab)}
              className="p-3 rounded-2xl bg-white border border-rose-100 hover:border-rose-300 shadow-2xs hover:shadow-xs transition-all flex flex-col items-center text-center group"
            >
              <div className={`p-2 rounded-xl mb-1.5 group-hover:scale-110 transition-transform ${action.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-zinc-800 leading-tight">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Ma journée en un coup d'œil */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-rose-100 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-zinc-900 tracking-tight">Ma journée</h3>
          <button
            type="button"
            onClick={() => onOpenLogModal('flow')}
            className="text-[11px] text-[#FF5B84] font-bold flex items-center gap-0.5"
          >
            Compléter <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100">
            <span className="text-[10px] font-bold text-sky-700 block">Eau</span>
            <span className="text-sm font-black text-sky-800">{water} / 8</span>
            <span className="text-[10px] text-sky-600 block">verres</span>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100">
            <span className="text-[10px] font-bold text-indigo-700 block">Sommeil</span>
            <span className="text-sm font-black text-indigo-800">{sleep || '—'} h</span>
            <span className="text-[10px] text-indigo-600 block">cette nuit</span>
          </div>
          <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
            <span className="text-[10px] font-bold text-rose-700 block">Douleurs</span>
            <span className="text-sm font-black text-rose-800">{painCount}</span>
            <span className="text-[10px] text-rose-600 block">zone{painCount > 1 ? 's' : ''} notée{painCount > 1 ? 's' : ''}</span>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100">
            <span className="text-[10px] font-bold text-purple-700 block">Humeur</span>
            <span className="text-[11px] font-black text-purple-800 leading-tight block mt-0.5">{moodLabel}</span>
          </div>
        </div>
      </div>

      {/* Comment te sens-tu ? */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-rose-100 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-zinc-900">Comment te sens-tu ?</span>
          <span className="text-[11px] text-zinc-400 font-medium">Un simple appui suffit</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_MOODS.map(m => {
            const selected = todayLog.quickMood === m.label;
            return (
              <button
                key={m.label}
                type="button"
                onClick={() => onQuickMoodSelect(m.label)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected
                    ? 'bg-[#FF6584] text-white border-[#FF6584] shadow-xs scale-105'
                    : m.color
                }`}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rappels */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-rose-100 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-zinc-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#FF5B84]" /> Mes rappels
          </h3>
          <button
            type="button"
            onClick={() => onSelectTab('reminders')}
            className="text-[11px] text-[#FF5B84] font-bold flex items-center gap-0.5"
          >
            Voir tout <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {enabledReminders.length > 0 ? (
          <div className="space-y-2">
            {enabledReminders.map(r => (
              <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-2xl bg-rose-50/50 border border-rose-100">
                <span className="text-xs font-black text-[#FF5B84] bg-white px-2 py-1 rounded-lg border border-rose-100">
                  {r.time}
                </span>
                <span className="text-xs font-semibold text-zinc-700 flex-1 truncate">
                  {profile.discreteMode ? r.discreetTitle : r.title}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-xs text-zinc-500">Aucun rappel pour l’instant.</p>
            <button
              type="button"
              onClick={() => onSelectTab('reminders')}
              className="mt-2 text-xs font-bold text-[#FF5B84] underline"
            >
              Ajouter un rappel simple
            </button>
          </div>
        )}
      </div>

      {/* Petits outils */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-zinc-900 tracking-tight">Mes petits outils</h3>
          <button
            type="button"
            onClick={() => onSelectTab('tools')}
            className="text-xs text-[#FF5B84] hover:text-[#FF4370] font-bold"
          >
            Tout voir
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {tools.map(tool => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.label}
                type="button"
                onClick={() => onSelectTab('tools')}
                className="p-4 rounded-3xl bg-white border border-rose-100 hover:border-rose-300 shadow-2xs hover:shadow-xs transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#FF5B84] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-lg group-hover:scale-110 transition-transform">{tool.emoji}</span>
                </div>
                <span className="text-xs font-black text-zinc-900 block">{tool.label}</span>
                <span className="text-[10px] text-zinc-400 font-medium block mt-0.5 leading-tight">{tool.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pensée douce */}
      <div className="p-4 rounded-3xl bg-rose-50/80 border border-rose-200/70 shadow-2xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-white text-[#FF6584] flex items-center justify-center shrink-0 shadow-2xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
            Une pensée douce
          </span>
          <p className="text-xs font-bold text-zinc-800 leading-snug mt-1">{dailyThought}</p>
        </div>
      </div>

      {/* Aller plus loin */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: 'Une question ?', icon: HelpCircle, tab: 'normality' as NavTabId, color: 'bg-amber-50 text-amber-600' },
          { label: 'Mieux comprendre', icon: BookOpen, tab: 'encyclopedia' as NavTabId, color: 'bg-sky-50 text-sky-600' },
          { label: 'Mes tendances', icon: CalendarDays, tab: 'statistics' as NavTabId, color: 'bg-purple-50 text-purple-600' }
        ].map(tile => {
          const Icon = tile.icon;
          return (
            <button
              key={tile.label}
              type="button"
              onClick={() => onSelectTab(tile.tab)}
              className="p-3 rounded-2xl bg-white border border-rose-100 hover:border-rose-300 shadow-2xs hover:shadow-xs transition-all flex flex-col items-center text-center group"
            >
              <div className={`p-2 rounded-xl mb-1.5 group-hover:scale-110 transition-transform ${tile.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-zinc-800 leading-tight">{tile.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
