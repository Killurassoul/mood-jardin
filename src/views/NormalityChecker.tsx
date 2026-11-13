import React, { useState } from 'react';
import {
  COMMON_SYMPTOM_PRESETS,
  evaluateSymptomTriage,
  TriageResult
} from '../data/normalityTriage';
import { NavTabId } from '../components/Navbar';
import {
  HelpCircle,
  AlertTriangle,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
  BookOpen,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface NormalityCheckerProps {
  onOpenArticle: (articleId: string) => void;
  onSelectTab: (tab: NavTabId) => void;
}

export const NormalityChecker: React.FC<NormalityCheckerProps> = ({
  onOpenArticle,
  onSelectTab
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('brown_blood');
  const [customText, setCustomText] = useState<string>('');
  const [step, setStep] = useState<'pick' | 'questions' | 'result'>('pick');

  // Answers state
  const [durationDays, setDurationDays] = useState<number>(2);
  const [intensity, setIntensity] = useState<number>(4);
  const [isRecurrent, setIsRecurrent] = useState<boolean>(false);
  const [cyclePeriod, setCyclePeriod] = useState<string>('during_period');
  const [hasFever, setHasFever] = useState<boolean>(false);
  const [hasSevereSharpPain, setHasSevereSharpPain] = useState<boolean>(false);
  const [hasDizzinessOrFainting, setHasDizzinessOrFainting] = useState<boolean>(false);
  const [hasHeavyHemorrhage, setHasHeavyHemorrhage] = useState<boolean>(false);
  const [isPregnancyPossible, setIsPregnancyPossible] = useState<boolean>(false);
  const [hasAbnormalSmell, setHasAbnormalSmell] = useState<boolean>(false);

  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);

  const handleStartQuestions = (presetId: string) => {
    setSelectedPresetId(presetId);
    setStep('questions');
  };

  const handleCalculateTriage = (e: React.FormEvent) => {
    e.preventDefault();
    const res = evaluateSymptomTriage({
      symptomKey: selectedPresetId,
      durationDays,
      intensity,
      isRecurrent,
      cyclePhase: cyclePeriod,
      hasFever,
      hasSevereSharpPain,
      hasDizzinessOrFainting,
      hasHeavyHemorrhage,
      isPregnancyPossible,
      hasAbnormalSmell
    });
    setTriageResult(res);
    setStep('result');
  };

  const resetAll = () => {
    setStep('pick');
    setTriageResult(null);
    setHasFever(false);
    setHasSevereSharpPain(false);
    setHasDizzinessOrFainting(false);
    setHasHeavyHemorrhage(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-amber-700" /> Un coup de main pour comprendre
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
          « Est-ce normal ? »
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto">
          Réponds à quelques questions. On t’aide à voir si c’est courant, s’il vaut mieux consulter, ou s’il faut agir vite.
        </p>
      </div>

      {/* STEP 1: PICK FREQUENT SITUATION */}
      {step === 'pick' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-card border border-rose-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-zinc-900">
              Choisis ce qui t’arrive :
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMMON_SYMPTOM_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleStartQuestions(preset.id)}
                  className="p-4 rounded-2xl text-left border border-zinc-200 hover:border-rose-400 hover:bg-rose-50/50 bg-card transition-all group shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-800 group-hover:text-rose-700">
                      {preset.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-rose-600 transition-transform group-hover:translate-x-1" />
                  </div>
                  <span className="text-[11px] text-zinc-400 block mt-1">
                    Répondre à quelques questions
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-100 space-y-2">
              <label className="block text-xs font-bold text-zinc-700">
                Ou écris ce qui t’inquiète :
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  placeholder="Ex : j’ai des pertes marron une semaine avant mes règles..."
                  className="flex-1 p-3 rounded-xl border border-zinc-200 text-xs text-zinc-800"
                />
                <button
                  type="button"
                  onClick={() => handleStartQuestions('custom')}
                  className="px-5 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-200"
                >
                  Continuer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: STEP-BY-STEP CONDITIONAL QUESTIONNAIRE */}
      {step === 'questions' && (
        <form
          onSubmit={handleCalculateTriage}
          className="p-6 sm:p-8 rounded-3xl bg-card border border-rose-100 shadow-xs space-y-6"
        >
          <div className="border-b border-rose-100 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Quelques questions
              </span>
              <h3 className="text-lg font-black text-zinc-900 mt-0.5">
                Parlons de ce qui t’arrive
              </h3>
            </div>
            <button
              type="button"
              onClick={resetAll}
              className="text-xs text-zinc-400 hover:text-zinc-600 underline"
            >
              Changer
            </button>
          </div>

          {/* Q1: Duration */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-zinc-800">
              1. Depuis combien de temps ?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Depuis aujourd’hui', days: 1 },
                { label: '2 à 3 jours', days: 3 },
                { label: 'Depuis une semaine', days: 7 },
                { label: 'Plus de 2 semaines', days: 15 }
              ].map(opt => (
                <button
                  key={opt.days}
                  type="button"
                  onClick={() => setDurationDays(opt.days)}
                  className={`p-3 rounded-xl text-xs font-medium border text-left ${
                    durationDays === opt.days
                      ? 'bg-rose-500 text-white border-rose-600 font-bold'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q2: Intensity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-800">
                2. C’est gênant ou douloureux à quel point ? (1 à 10)
              </label>
              <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                {intensity}/10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={e => setIntensity(parseInt(e.target.value))}
              className="w-full accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>À peine</span>
              <span>Moyen</span>
              <span>Très fort</span>
            </div>
          </div>

          {/* Q3: Recurrence */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-zinc-800">
              3. Est-ce que ça revient souvent ?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsRecurrent(true)}
                className={`p-3 rounded-xl text-xs font-medium border ${
                  isRecurrent ? 'bg-purple-600 text-white font-bold' : 'bg-zinc-50 text-zinc-700'
                }`}
              >
                Oui, ça revient
              </button>
              <button
                type="button"
                onClick={() => setIsRecurrent(false)}
                className={`p-3 rounded-xl text-xs font-medium border ${
                  !isRecurrent ? 'bg-purple-600 text-white font-bold' : 'bg-zinc-50 text-zinc-700'
                }`}
              >
                Non, c’est nouveau
              </button>
            </div>
          </div>

          {/* Q4: CRITICAL SAFETY SIGNS */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
            <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Signes qui inquiètent (coche si tu en as) :
            </h4>

            <div className="space-y-2">
              {[
                { state: hasSevereSharpPain, set: setHasSevereSharpPain, label: 'Douleur très forte et soudaine dans le bas du ventre' },
                { state: hasFever, set: setHasFever, label: 'Fièvre (plus de 38 °C) ou frissons' },
                { state: hasDizzinessOrFainting, set: setHasDizzinessOrFainting, label: 'Malaise, vertiges ou sensation de tomber dans les pommes' },
                { state: hasHeavyHemorrhage, set: setHasHeavyHemorrhage, label: 'Saignement très abondant (plus de 2 serviettes grand format par heure)' },
                { state: isPregnancyPossible, set: setIsPregnancyPossible, label: 'Possible grossesse ou test positif' },
                { state: hasAbnormalSmell, set: setHasAbnormalSmell, label: 'Pertes à très forte odeur' }
              ].map((item, idx) => (
                <label key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-card border border-rose-100 cursor-pointer text-xs font-medium text-zinc-800">
                  <input
                    type="checkbox"
                    checked={item.state}
                    onChange={e => item.set(e.target.checked)}
                    className="w-4 h-4 accent-rose-600 rounded-sm"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
            <button
              type="button"
              onClick={resetAll}
              className="text-xs text-zinc-500 font-semibold"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-200"
            >
              Voir le résultat →
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: TRIAGE RESULT */}
      {step === 'result' && triageResult && (
        <div className="space-y-6 animate-in zoom-in-95">
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
              triageResult.level === 'EMERGENCY'
                ? 'bg-red-50 border-red-300 text-red-950'
                : triageResult.level === 'CONSULTATION_RECOMMENDED'
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}
          >
            {/* Header Badge */}
            <div className="flex items-center gap-2">
              {triageResult.level === 'EMERGENCY' ? (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold">
                  <AlertTriangle className="w-4 h-4" /> À FAIRE MAINTENANT
                </div>
              ) : triageResult.level === 'CONSULTATION_RECOMMENDED' ? (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">
                  <HelpCircle className="w-4 h-4" /> PARLES-EN À UN PROFESSIONNEL
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" /> PLUTÔT RASSURANT
                </div>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
              {triageResult.title}
            </h3>

            <p className="text-sm font-medium leading-relaxed">
              {triageResult.summary}
            </p>

            <div className="p-4 rounded-2xl bg-card/80 border border-zinc-200/60 space-y-2 text-xs leading-relaxed text-zinc-800">
              <strong className="block text-zinc-900">Ce qu’il faut savoir :</strong>
              <p>{triageResult.detailedAnalysis}</p>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Ce que tu peux faire :
              </h4>
              <ul className="space-y-1.5 text-xs">
                {triageResult.safetyInstructions.map((ins, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>{ins}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency Contacts if applicable */}
            {triageResult.emergencyContacts && (
              <div className="p-4 rounded-2xl bg-red-600 text-white space-y-2">
                <div className="text-xs font-bold uppercase flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4" /> Numéros à appeler :
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-extrabold">
                  {triageResult.emergencyContacts.map((c, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-white/20">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Article button */}
            {triageResult.suggestedArticleId && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenArticle(triageResult.suggestedArticleId!)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50 shadow-2xs"
                >
                  <BookOpen className="w-4 h-4" /> Lire l’article du guide →
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-zinc-200/50 flex items-center justify-between">
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Vérifier autre chose
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('encyclopedia')}
                className="text-xs text-rose-600 hover:text-rose-800 underline font-bold"
              >
                Lire le guide santé →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
