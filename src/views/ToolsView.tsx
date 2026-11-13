import React, { useEffect, useRef, useState } from 'react';
import { DailyLog } from '../types';
import { NavTabId } from '../components/Navbar';
import { formatDate } from '../services/cycleCalculator';
import {
  Wind,
  Droplets,
  Moon,
  Phone,
  Check,
  Play,
  Square,
  Save,
  CheckCircle2,
  Bell,
  Heart,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ToolsViewProps {
  todayLog: DailyLog;
  onSaveLog: (log: DailyLog) => void;
  onOpenLogModal: () => void;
  onSelectTab: (tab: NavTabId) => void;
}

type BreathPhase = 'inspire' | 'garde' | 'souffle';

const PHASE_TEXT: Record<BreathPhase, string> = {
  inspire: 'Inspire doucement par le nez',
  garde: 'Garde l’air quelques secondes',
  souffle: 'Souffle lentement par la bouche'
};

const PHASE_SECONDS: Record<BreathPhase, number> = {
  inspire: 4,
  garde: 4,
  souffle: 6
};

const NIGHT_ITEMS = [
  { key: 'screens', label: 'Je coupe les écrans', emoji: '📵' },
  { key: 'bag', label: 'Je prépare mes affaires pour demain', emoji: '🎒' },
  { key: 'water', label: 'Je bois un dernier verre d’eau', emoji: '💧' },
  { key: 'breathe', label: 'Je respire doucement 5 fois', emoji: '🌬️' }
];

const EMERGENCY_NUMBERS = [
  { number: '112', label: 'Urgences en Europe', desc: 'Si ta vie est en danger, tout de suite' },
  { number: '15', label: 'SAMU (France)', desc: 'Un problème de santé urgent' },
  { number: '3919', label: 'Violences faites aux femmes', desc: 'Écoute, anonyme et gratuit' },
  { number: '3114', label: 'Souffrance psychologique', desc: 'Parler à quelqu’un, jour et nuit' }
];

export const ToolsView: React.FC<ToolsViewProps> = ({
  todayLog,
  onSaveLog,
  onOpenLogModal,
  onSelectTab
}) => {
  const [breathing, setBreathing] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('inspire');
  const [breathSeconds, setBreathSeconds] = useState<number>(4);
  const phaseRef = useRef<BreathPhase>('inspire');

  useEffect(() => {
    phaseRef.current = breathPhase;
  }, [breathPhase]);

  useEffect(() => {
    if (!breathing) return;

    const timer = setInterval(() => {
      setBreathSeconds(previous => {
        if (previous > 1) return previous - 1;
        const current = phaseRef.current;
        const next: BreathPhase =
          current === 'inspire' ? 'garde' : current === 'garde' ? 'souffle' : 'inspire';
        phaseRef.current = next;
        setBreathPhase(next);
        return PHASE_SECONDS[next];
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathing]);

  const toggleBreathing = () => {
    if (breathing) {
      setBreathing(false);
      setBreathPhase('inspire');
      setBreathSeconds(4);
      phaseRef.current = 'inspire';
    } else {
      setBreathing(true);
      setBreathPhase('inspire');
      setBreathSeconds(4);
      phaseRef.current = 'inspire';
    }
  };

  const dateKey = formatDate(new Date());
  const checklistKey = `mood_soir_${dateKey}`;
  const defaultChecklist: Record<string, boolean> = {
    screens: false,
    bag: false,
    water: false,
    breathe: false
  };
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(checklistKey);
      return saved ? { ...defaultChecklist, ...JSON.parse(saved) } : defaultChecklist;
    } catch {
      return defaultChecklist;
    }
  });

  const toggleChecklist = (key: string) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    localStorage.setItem(checklistKey, JSON.stringify(updated));
  };

  const water = todayLog.waterGlasses || 0;
  const setWater = (amount: number) => {
    onSaveLog({
      ...todayLog,
      date: dateKey,
      waterGlasses: Math.max(0, Math.min(12, amount))
    });
  };

  const [note, setNote] = useState<string>(todayLog.generalNotes || '');
  const [noteSaved, setNoteSaved] = useState<boolean>(false);

  const saveNote = () => {
    onSaveLog({ ...todayLog, date: dateKey, generalNotes: note });
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  const doneCount = NIGHT_ITEMS.filter(item => checklist[item.key]).length;

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-in fade-in duration-300 pb-12">
      {/* En-tête */}
      <div>
        <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Mes petits outils</h2>
        <p className="text-sm text-zinc-500 mt-1">
          Des choses simples pour t’aider au quotidien. Rien n’est obligatoire.
        </p>
      </div>

      {/* Respiration */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-b from-rose-50 via-pink-50/60 to-card border border-rose-200/70 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-card text-[#ff2e7e] flex items-center justify-center shadow-2xs">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-zinc-900">Respirer pour me calmer</h3>
              <p className="text-[11px] text-zinc-500">2 minutes pour relâcher la pression</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-rose-500 bg-card px-2 py-1 rounded-full border border-rose-100">
            4 – 4 – 6
          </span>
        </div>

        <div className="flex flex-col items-center py-2">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div
              className="absolute rounded-full bg-[#ff8db8]/50 border border-[#ff8db8]"
              style={{
                width: '100%',
                height: '100%',
                transform: `scale(${!breathing ? 1 : breathPhase === 'souffle' ? 0.82 : 1.18})`,
                transition:
                  !breathing
                    ? 'transform 0.6s ease'
                    : breathPhase === 'inspire'
                    ? 'transform 4s ease-in-out'
                    : breathPhase === 'souffle'
                    ? 'transform 6s ease-in-out'
                    : 'transform 0.6s ease'
              }}
            />
            <div className="relative z-10 text-center">
              <span className="text-3xl font-black text-[#ff2e7e] block leading-none">
                {breathing ? breathSeconds : '🌸'}
              </span>
              <span className="text-[11px] font-bold text-rose-700 block mt-1 max-w-[120px]">
                {breathing ? PHASE_TEXT[breathPhase] : 'Prête quand tu veux'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleBreathing}
            className={`mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black text-white shadow-md transition-all ${
              breathing
                ? 'bg-zinc-700 hover:bg-zinc-800'
                : 'bg-[#ff2e7e] hover:bg-[#d41b66] shadow-rose-200'
            }`}
          >
            {breathing ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {breathing ? 'Arrêter' : 'Commencer'}
          </button>
          <p className="text-[10px] text-zinc-400 mt-2 text-center">
            Inspire 4 secondes, garde 4 secondes, souffle 6 secondes.
          </p>
        </div>
      </div>

      {/* Eau */}
      <div className="p-5 rounded-3xl bg-card border border-sky-100 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-zinc-900">Boire de l’eau</h3>
              <p className="text-[11px] text-zinc-500">Un verre à la fois, sans pression</p>
            </div>
          </div>
          <span className="text-xs font-black text-sky-700">{water} / 8</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 8 }).map((_, index) => (
            <span
              key={index}
              className={`text-xl transition-all ${index < water ? 'opacity-100 scale-100' : 'opacity-25 scale-90'}`}
            >
              💧
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWater(water - 1)}
            className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 font-black hover:bg-sky-100"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => setWater(water + 1)}
            className="flex-1 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-black shadow-md shadow-sky-200"
          >
            + J’ai bu un verre
          </button>
        </div>
      </div>

      {/* Checklist du soir */}
      <div className="p-5 rounded-3xl bg-card border border-indigo-100 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-zinc-900">Ma checklist du soir</h3>
              <p className="text-[11px] text-zinc-500">Pour préparer une nuit plus tranquille</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-indigo-600">{doneCount} / {NIGHT_ITEMS.length}</span>
        </div>

        <div className="space-y-2">
          {NIGHT_ITEMS.map(item => {
            const checked = Boolean(checklist[item.key]);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => toggleChecklist(item.key)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                  checked
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900'
                    : 'bg-card border-zinc-200 text-zinc-700 hover:bg-indigo-50/40'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className={`flex-1 text-xs font-semibold ${checked ? 'line-through opacity-70' : ''}`}>
                  {item.label}
                </span>
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    checked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-zinc-300'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Note rapide */}
      <div className="p-5 rounded-3xl bg-card border border-rose-100 shadow-2xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#ff2e7e] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-zinc-900">Une note pour aujourd’hui</h3>
            <p className="text-[11px] text-zinc-500">Une pensée, une chose à ne pas oublier…</p>
          </div>
        </div>
        <textarea
          rows={3}
          value={note}
          onChange={event => setNote(event.target.value)}
          placeholder="Ex : penser à racheter des protections, appeler la sage-femme, me reposer ce soir…"
          className="w-full p-3 rounded-2xl border border-rose-200 bg-rose-50/20 text-xs text-zinc-800 leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-rose-300"
        />
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-zinc-400">Cette note reste sur ton appareil.</span>
          <button
            type="button"
            onClick={saveNote}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ff2e7e] hover:bg-[#d41b66] text-white text-xs font-bold shadow-md shadow-rose-200"
          >
            {noteSaved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {noteSaved ? 'Noté !' : 'Enregistrer'}
          </button>
        </div>
      </div>

      {/* Rappels */}
      <button
        type="button"
        onClick={() => onSelectTab('reminders')}
        className="w-full p-4 rounded-3xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-left hover:bg-amber-100 transition-colors"
      >
        <div className="w-10 h-10 rounded-2xl bg-card text-amber-600 flex items-center justify-center shadow-2xs">
          <Bell className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-black text-amber-950 block">Besoin d’un rappel ?</span>
          <span className="text-[11px] text-amber-800">Pilule, eau, rendez-vous… ajoute-le en un clic.</span>
        </div>
        <ArrowRight className="w-4 h-4 text-amber-700" />
      </button>

      {/* Numéros utiles */}
      <div className="p-5 rounded-3xl bg-card border border-rose-100 shadow-2xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#ff2e7e] flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-zinc-900">Numéros utiles</h3>
            <p className="text-[11px] text-zinc-500">À garder sous la main, sans hésiter</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {EMERGENCY_NUMBERS.map(item => (
            <a
              key={item.number}
              href={`tel:${item.number}`}
              className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100 hover:bg-rose-50 transition-colors"
            >
              <span className="text-lg font-black text-[#ff2e7e] block">{item.number}</span>
              <span className="text-[11px] font-bold text-zinc-800 block">{item.label}</span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">{item.desc}</span>
            </a>
          ))}
        </div>

        <p className="text-[10px] text-zinc-400 flex items-start gap-1.5">
          <Heart className="w-3 h-3 mt-0.5 shrink-0" />
          En cas de danger immédiat, appelle le 112. Tu n’as pas besoin d’expliquer toute ta vie pour demander de l’aide.
        </p>
      </div>

      {/* Lien vers le journal */}
      <button
        type="button"
        onClick={onOpenLogModal}
        className="w-full py-3.5 rounded-3xl bg-[#ff2e7e] hover:bg-[#d41b66] text-white text-xs font-black shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-4 h-4" />
        Noter ma journée complète
      </button>
    </div>
  );
};
