import React, { useState } from 'react';
import { UserProfile, ActiveTrackingMode } from '../types';
import { Orb } from './CycleOrb';
import { Sparkles, Shield, Heart, ArrowRight, Check, Flower2, X } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: Partial<UserProfile>, lastPeriodDate?: string) => void;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  onClose
}) => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
  const [activeMode, setActiveMode] = useState<ActiveTrackingMode>('cycle');
  const [discreteMode, setDiscreteMode] = useState<boolean>(false);

  if (!isOpen) return null;


  const handleFinish = () => {
    onComplete(
      {
        name: name.trim(),
        cycleLength: cycleLength || 28,
        periodLength: periodLength || 5,
        activeMode,
        discreteMode,
        onboarded: true
      },
      lastPeriodDate || undefined
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-rose-950/20 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-linear-to-b from-[#431109] via-[#431109] to-[#431109] rounded-3xl shadow-2xl border-2 border-rose-200 overflow-hidden flex flex-col max-h-[94vh]">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-card/80 hover:bg-card text-rose-500 flex items-center justify-center shadow-xs transition-colors"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="relative w-full h-48 sm:h-56 bg-linear-to-b from-rose-100/60 via-pink-50/50 to-transparent flex items-center justify-center overflow-hidden shrink-0">
          <Orb size={170} />

          <div className="absolute top-3 left-4 px-3 py-1 rounded-full bg-card/80 backdrop-blur-xs border border-rose-200/80 text-[11px] font-extrabold text-[#e8283c] shadow-2xs flex items-center gap-1.5 pointer-events-none">
            <Flower2 className="w-3.5 h-3.5 text-[#e8283c]" />
            <span>Étape {step} sur 4</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-rose-200/60">
            <div
              className="h-full bg-linear-to-r from-[#ff6b5e] to-[#e8283c] transition-all duration-500 rounded-r-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5">
          {/* ÉTAPE 1 : BIENVENUE */}
          {step === 1 && (
            <div className="text-center space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#e8283c]">
                Bienvenue dans ton espace
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                Mood, en plus simple
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-sm mx-auto">
                Pas de mots compliqués. Tu notes ce que tu veux, quand tu veux.
                L’application t’aide à comprendre ton corps et à alléger ton quotidien.
              </p>

              <div className="p-4 rounded-2xl bg-card/90 border border-rose-200/80 text-left space-y-3 text-xs text-zinc-700 shadow-2xs mt-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#e8283c] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-rose-900 block">Simple</span>
                    <span className="text-[11px] text-zinc-500">
                      Un appui suffit pour noter ton humeur, ta douleur ou tes règles.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#e8283c] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-rose-900 block">Privé</span>
                    <span className="text-[11px] text-zinc-500">
                      Ce que tu écris reste sur cet appareil. Pas de compte, pas de publicité.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-[#e8283c] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-rose-900 block">Sans jugement</span>
                    <span className="text-[11px] text-zinc-500">
                      Tu peux tout noter, ou rien. Il n’y a pas de bonne façon de faire.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 : PRÉNOM & OBJECTIF */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-black uppercase tracking-wider text-[#e8283c]">
                  Faisons connaissance
                </span>
                <h3 className="text-xl font-black text-zinc-900 mt-0.5">
                  Comment veux-tu qu’on t’appelle ?
                </h3>
                <p className="text-xs text-zinc-500 mt-1">Un prénom ou un pseudo, comme tu préfères.</p>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-zinc-700 mb-1">
                  Prénom ou pseudo :
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ex : Camille, Sarah, Lila..."
                  className="w-full p-3.5 rounded-2xl border-2 border-rose-200 bg-card text-sm font-bold text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:border-[#e8283c]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-zinc-700 mb-2">
                  Qu’est-ce qui t’amène ?
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'cycle', label: 'Suivre mes règles', desc: 'Voir quand elles arrivent et comment je me sens' },
                    { id: 'fertility', label: 'Savoir quand je peux tomber enceinte', desc: 'Repérer ma période la plus propice, sans stress' },
                    { id: 'pregnancy', label: 'Suivre ma grossesse', desc: 'Des repères simples, semaine après semaine' },
                    { id: 'postpartum', label: 'Après bébé', desc: 'Mon corps, mon moral et mon repos' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveMode(item.id as ActiveTrackingMode)}
                      className={`w-full p-3.5 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
                        activeMode === item.id
                          ? 'border-[#e8283c] bg-card text-rose-950 font-bold shadow-xs'
                          : 'border-rose-100 bg-card/70 hover:bg-card text-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-black">{item.label}</div>
                        <div className="text-[11px] text-zinc-400 font-medium">{item.desc}</div>
                      </div>
                      {activeMode === item.id && <Check className="w-4 h-4 text-[#e8283c] stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 : INFOS DE BASE */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-black uppercase tracking-wider text-[#e8283c]">
                  Deux ou trois petites choses
                </span>
                <h3 className="text-xl font-black text-zinc-900 mt-0.5">
                  Pour tes premières estimations
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Tu pourras tout changer plus tard. Si tu ne sais pas, laisse les valeurs proposées.
                </p>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-zinc-700 mb-1">
                  Premier jour de tes dernières règles (si tu t’en souviens) :
                </label>
                <input
                  type="date"
                  value={lastPeriodDate}
                  onChange={e => setLastPeriodDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-rose-200 bg-card text-xs font-semibold text-zinc-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-card rounded-2xl border border-rose-200/80 shadow-2xs">
                  <label className="block text-xs font-extrabold text-zinc-800 mb-1 leading-tight">
                    Entre deux règles
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="20"
                      max="45"
                      value={cycleLength}
                      onChange={e => setCycleLength(parseInt(e.target.value) || 28)}
                      className="w-16 p-2 rounded-xl border border-rose-200 text-center font-black text-[#e8283c] text-base"
                    />
                    <span className="text-xs text-zinc-500 font-bold">jours</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 block">Souvent autour de 28 jours</span>
                </div>

                <div className="p-3.5 bg-card rounded-2xl border border-rose-200/80 shadow-2xs">
                  <label className="block text-xs font-extrabold text-zinc-800 mb-1 leading-tight">
                    Durée de tes règles
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={periodLength}
                      onChange={e => setPeriodLength(parseInt(e.target.value) || 5)}
                      className="w-16 p-2 rounded-xl border border-rose-200 text-center font-black text-[#e8283c] text-base"
                    />
                    <span className="text-xs text-zinc-500 font-bold">jours</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 block">Souvent 3 à 7 jours</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDiscreteMode(!discreteMode)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  discreteMode
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-card border-rose-200 text-zinc-700'
                }`}
              >
                <span className="text-left">
                  <span className="text-xs font-black block">Mode privé</span>
                  <span className="text-[11px] text-zinc-500">Cache les mots sensibles sur l’écran</span>
                </span>
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    discreteMode ? 'bg-amber-500 border-amber-500 text-white' : 'border-zinc-300'
                  }`}
                >
                  {discreteMode && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </button>
            </div>
          )}

          {/* ÉTAPE 4 : PRÊT */}
          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-[#e8283c] flex items-center justify-center mx-auto shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
                C’est prêt !
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed max-w-sm mx-auto">
                {name.trim() ? <>Tout est prêt, <strong className="text-[#e8283c]">{name.trim()}</strong>.</> : 'Tout est prêt.'}
                Tu peux commencer par noter comment tu te sens aujourd’hui.
              </p>

              <div className="p-4 rounded-2xl bg-card border border-rose-200 text-left space-y-2 text-xs text-zinc-700">
                <div className="flex items-center gap-2 font-bold text-rose-900">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Tes règles et tes prévisions
                </div>
                <div className="flex items-center gap-2 font-bold text-rose-900">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Tes petits outils du quotidien
                </div>
                <div className="flex items-center gap-2 font-bold text-rose-900">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Des réponses simples à tes questions
                </div>
              </div>

              <p className="text-[11px] text-zinc-400">
                Rappel : les dates sont des estimations, pas une contraception.
              </p>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 border-t border-rose-200 bg-card/80 flex items-center justify-between shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-xs text-zinc-500 hover:text-zinc-800 font-bold px-3 py-2"
            >
              Retour
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="text-xs text-zinc-400 hover:text-zinc-600 px-3 py-2 font-semibold"
            >
              Passer
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 rounded-2xl bg-[#e8283c] hover:bg-[#c41426] text-white text-xs font-black shadow-lg shadow-rose-300/60 transition-all flex items-center gap-2"
            >
              Continuer <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-3 rounded-2xl bg-linear-to-r from-[#ff6b5e] to-[#e8283c] text-white text-xs font-black shadow-lg shadow-rose-300/60 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              Entrer dans Mood <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
