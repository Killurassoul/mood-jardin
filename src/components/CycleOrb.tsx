import React, { useEffect, useMemo, useState } from 'react';
import { Droplet, RotateCcw, Sparkles } from 'lucide-react';
import { CycleCalculationResult, CyclePhase } from '../types';

type PhaseInfo = { phase: CyclePhase; title: string; description: string; care: string };

const phaseForDay = (day: number, totalDays: number, periodDays: number): PhaseInfo => {
  const ovulationDay = Math.max(8, totalDays - 14);
  if (day <= periodDays) return { phase: 'menstrual', title: 'Règles', description: 'Ton corps se repose. C’est normal d’avoir moins d’énergie.', care: 'Chaleur, repos, eau : fais ce qui te fait du bien.' };
  if (day < ovulationDay - 5) return { phase: 'follicular', title: 'L’énergie revient', description: 'Après les règles, l’énergie remonte petit à petit.', care: 'Profite de cet élan, sans te mettre de pression.' };
  if (day < ovulationDay) return { phase: 'fertile', title: 'Fenêtre fertile', description: 'Estimation : une grossesse est possible ces jours-ci.', care: 'Si tu veux éviter ou avoir un bébé, demande conseil à un professionnel.' };
  if (day === ovulationDay) return { phase: 'ovulation', title: 'Ovulation estimée', description: 'Le jour où une grossesse a le plus de chances de commencer.', care: 'Une estimation ne remplace ni un test ni un médecin.' };
  return { phase: 'luteal', title: 'Avant les règles', description: 'Le corps ralentit. Fatigue ou irritabilité sont fréquentes.', care: 'Accorde-toi du temps et note ce qui t’aide.' };
};

const R = 92, C = 2 * Math.PI * R;
const arc = (from: number, len: number, total: number) => ({ strokeDasharray: `${(len / total) * C} ${C}`, strokeDashoffset: -((from - 1) / total) * C });

/** The red planet: a CSS-lit sphere with the cycle drawn as its orbit. */
export const Orb: React.FC<{ day?: number; total?: number; periodDays?: number; size?: number; label?: string }> = ({ day, total = 28, periodDays = 5, size = 220, label }) => {
  const ov = Math.max(8, total - 14);
  const a = day ? ((day - 0.5) / total) * 2 * Math.PI - Math.PI / 2 : 0;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg viewBox="0 0 220 220" className="absolute inset-0 h-full w-full -rotate-90 overflow-visible">
        <circle cx="110" cy="110" r={R} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="2" />
        <circle cx="110" cy="110" r={R} fill="none" stroke="#e8283c" strokeWidth="7" strokeLinecap="round" style={arc(1, periodDays, total)} />
        <circle cx="110" cy="110" r={R} fill="none" stroke="#ffb27a" strokeWidth="4" strokeLinecap="round" style={arc(ov - 5, 6, total)} />
      </svg>
      {day && <span className="absolute h-3.5 w-3.5 -ml-[7px] -mt-[7px] rounded-full bg-white shadow-[0_0_0_5px_rgba(232,40,60,.7)]" style={{ left: `${50 + (R / 220) * 100 * Math.cos(a)}%`, top: `${50 + (R / 220) * 100 * Math.sin(a)}%` }} />}
      <div className="orb absolute inset-[22%] rounded-full" />
      {label !== undefined && <div className="absolute inset-0 grid place-items-center text-center pointer-events-none"><div><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/80">{label}</p>{day && <p className="text-4xl font-black leading-none tracking-tight text-white">J{day}</p>}</div></div>}
    </div>
  );
};

interface CycleOrbProps { stats: CycleCalculationResult; onOpenLogModal?: () => void; onQuickLogPeriodStart?: () => void; className?: string; showDetails?: boolean; }

export const CycleOrb: React.FC<CycleOrbProps> = ({ stats, onOpenLogModal, onQuickLogPeriodStart, className = '', showDetails = true }) => {
  const [selectedDay, setSelectedDay] = useState(stats.currentDayOfCycle || 1);
  const [previewing, setPreviewing] = useState(false);
  const totalDays = Math.max(20, stats.totalCycleLength || 28);
  const periodDays = stats.averagePeriodLength || 5;
  const day = Math.min(totalDays, Math.max(1, selectedDay));
  const calculated = useMemo(() => phaseForDay(day, totalDays, periodDays), [day, totalDays, periodDays]);
  const phase = stats.hasCycleData ? calculated : { phase: 'follicular' as CyclePhase, title: 'Ton cycle t’attend', description: 'Ajoute le premier jour de tes dernières règles pour voir ton cycle.', care: 'Tu pourras ensuite noter seulement ce qui compte pour toi.' };
  useEffect(() => { if (!previewing) setSelectedDay(stats.currentDayOfCycle || 1); }, [stats.currentDayOfCycle, previewing]);
  const jumpTo = (p: CyclePhase) => { const ov = Math.max(8, totalDays - 14); setPreviewing(true); setSelectedDay(p === 'menstrual' ? 1 : p === 'follicular' ? Math.min(totalDays, periodDays + 2) : p === 'ovulation' ? ov : Math.min(totalDays, ov + 4)); };

  return (
    <section className={`relative overflow-hidden rounded-3xl border border-zinc-200 bg-card p-5 ${className}`} aria-label="Ton cycle">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-zinc-500">Mon cycle</p>
          <h3 className="mt-1 text-2xl font-black tracking-tight text-zinc-900">{phase.title}</h3>
        </div>
        {previewing && <button type="button" onClick={() => { setPreviewing(false); setSelectedDay(stats.currentDayOfCycle || 1); }} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white"><RotateCcw className="h-3 w-3" /> Aujourd’hui</button>}
      </div>

      <div className="my-4"><Orb day={stats.hasCycleData ? day : undefined} total={totalDays} periodDays={periodDays} label={stats.hasCycleData ? `sur ${totalDays}` : 'Bienvenue'} /></div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-600">
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#e8283c]" />Règles</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#ffb27a]" />Fenêtre fertile</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-white" />Jour affiché</span>
      </div>

      <div className="mt-4 border-t border-zinc-200 pt-4">
        {stats.hasCycleData && <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-rose-600">{stats.isDelayed ? `En retard de ${stats.daysDelayed} jours` : `Règles prévues dans ${stats.daysUntilNextPeriod} jours`}</p>}
        <p className="text-sm leading-relaxed text-zinc-700">{phase.description}</p>
        <p className="mt-2 flex gap-1.5 text-xs text-zinc-500"><Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-rose-500" />{phase.care}</p>
      </div>

      {stats.hasCycleData && <div className="mt-4">
        <input aria-label="Choisir un jour du cycle" type="range" min="1" max={totalDays} value={day} onChange={e => { setPreviewing(true); setSelectedDay(Number(e.target.value)); }} className="w-full accent-[#e8283c]" />
        <div className="mt-2 grid grid-cols-4 gap-1.5">{([['menstrual', 'Règles'], ['follicular', 'Après'], ['ovulation', 'Fertile'], ['luteal', 'Avant']] as const).map(([name, label]) =>
          <button key={name} type="button" onClick={() => jumpTo(name)} className={`rounded-lg px-1 py-2 text-[10px] font-semibold uppercase tracking-wider transition ${phase.phase === name || (name === 'ovulation' && phase.phase === 'fertile') ? 'bg-[#e8283c] text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}>{label}</button>)}
        </div>
      </div>}

      {showDetails && <div className="mt-4 flex gap-2 border-t border-zinc-200 pt-4">
        {onOpenLogModal && <button type="button" onClick={onOpenLogModal} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-800"><Sparkles className="h-3.5 w-3.5" /> Noter ma journée</button>}
        {onQuickLogPeriodStart && <button type="button" onClick={onQuickLogPeriodStart} className="flex items-center justify-center gap-1.5 rounded-lg bg-[#e8283c] px-3 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#c41426]"><Droplet className="h-3.5 w-3.5" /> Mes règles commencent</button>}
      </div>}
    </section>
  );
};

export default CycleOrb;
