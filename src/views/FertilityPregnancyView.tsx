import React, { useState } from 'react';
import {
  UserProfile,
  CycleCalculationResult,
  DailyLog
} from '../types';
import { addDays, daysBetween, formatDate, parseDate } from '../services/cycleCalculator';
import {
  Baby,
  Sparkles,
  Heart,
  Thermometer,
  Calendar,
  AlertCircle,
  Clock,
  ShieldCheck,
  Feather,
  CheckCircle2
} from 'lucide-react';

interface FertilityPregnancyViewProps {
  profile: UserProfile;
  stats: CycleCalculationResult;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

const PREGNANCY_WEEKS_SAMPLE = [
  { week: 4, sizeFruit: 'Graine de pavot (1 mm)', highlight: 'L’embryon s’installe. Son cœur commence à se former.', exam: 'Test urinaire de confirmation' },
  { week: 8, sizeFruit: 'Framboise (1,6 cm)', highlight: 'Les doigts, les paupières et les membres se dessinent.', exam: 'Première consultation de grossesse' },
  { week: 12, sizeFruit: 'Prune (5,4 cm)', highlight: 'Fin du 1er trimestre. Bébé commence à bouger.', exam: 'Échographie du 1er trimestre' },
  { week: 16, sizeFruit: 'Avocat (11 cm)', highlight: 'Bébé bouge doucement. Ses yeux perçoivent la lumière.', exam: 'Test de dépistage (trisomie 21)' },
  { week: 20, sizeFruit: 'Banane (16 cm)', highlight: 'Les premiers coups de pied sont souvent ressentis !', exam: 'Échographie des 5 mois' },
  { week: 24, sizeFruit: 'Épi de maïs (30 cm)', highlight: 'Bébé entend ta voix et réagit aux sons.', exam: 'Test du sucre (diabète de grossesse)' },
  { week: 28, sizeFruit: 'Aubergine (38 cm)', highlight: 'Début du 3e trimestre. Bébé ouvre les yeux.', exam: 'Consultation du 7e mois' },
  { week: 32, sizeFruit: 'Chou chinois (42 cm)', highlight: 'Bébé grossit et ses poumons se préparent.', exam: 'Échographie de croissance' },
  { week: 37, sizeFruit: 'Melon (48 cm)', highlight: 'Bébé est considéré à terme. Il se positionne pour naître.', exam: 'Consultation avec l’anesthésiste et prélèvement' },
  { week: 40, sizeFruit: 'Pastèque (51 cm)', highlight: 'C’est la date prévue ! Bébé est prêt à naître.', exam: 'Surveillance avant la naissance' },
];

export const FertilityPregnancyView: React.FC<FertilityPregnancyViewProps> = ({
  profile,
  stats,
  onUpdateProfile
}) => {
  const [activeSubMode, setActiveSubMode] = useState<'fertility' | 'pregnancy' | 'postpartum'>(
    profile.activeMode === 'pregnancy' ? 'pregnancy' : profile.activeMode === 'postpartum' ? 'postpartum' : 'fertility'
  );

  const [basalTemp, setBasalTemp] = useState<number | ''>('');
  const [lhTest, setLhTest] = useState<'none' | 'negative' | 'positive'>('none');
  const [currentWeek, setCurrentWeek] = useState<number>(() => profile.pregnancyConceptionDate ? Math.max(1, Math.min(40, Math.floor(daysBetween(parseDate(profile.pregnancyConceptionDate), new Date()) / 7) + 2)) : 1);
  const [postpartumDays, setPostpartumDays] = useState<number>(() => profile.postpartumDeliveryDate ? Math.max(1, daysBetween(parseDate(profile.postpartumDeliveryDate), new Date())) : 1);
  const [lochiaColor, setLochiaColor] = useState<string>('');
  const dueDate = profile.pregnancyConceptionDate ? formatDate(addDays(parseDate(profile.pregnancyConceptionDate), 266)) : '';
  const selectMode = (mode: 'fertility' | 'pregnancy' | 'postpartum') => { setActiveSubMode(mode); onUpdateProfile({ activeMode: mode }); };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
            Bébé, grossesse et après
          </h2>
          <p className="text-sm text-zinc-500">
            Des repères simples, selon l’étape où tu en es.
          </p>
        </div>

        {/* Sub-modes selector */}
        <div className="flex items-center bg-white border border-rose-200 rounded-2xl p-1 shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => selectMode('fertility')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubMode === 'fertility'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Envie de bébé
          </button>
          <button
            type="button"
            onClick={() => selectMode('pregnancy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubMode === 'pregnancy'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Je suis enceinte
          </button>
          <button
            type="button"
            onClick={() => selectMode('postpartum')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubMode === 'postpartum'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Après l’accouchement
          </button>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Les dates et repères sont indicatifs. Ils ne remplacent pas ton suivi avec une sage-femme ou un médecin.
        </p>
      </div>

      {/* SUB-MODE 1: FERTILITÉ & CONCEPTION */}
      {activeSubMode === 'fertility' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fertile window card */}
            <div className="p-6 rounded-3xl bg-linear-to-b from-purple-50 to-white border border-purple-100 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                Période où une grossesse est possible
              </span>
              <div className="text-2xl font-black text-zinc-900">
                {stats.fertileWindowStart} → {stats.fertileWindowEnd}
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Environ 6 jours pendant lesquels une grossesse peut commencer. C’est une estimation.
              </p>
              <div className="pt-2 text-[11px] text-purple-900 font-semibold bg-purple-100/60 p-2.5 rounded-xl">
                Jour le plus propice : {stats.ovulationDate}
              </div>
            </div>

            {/* Basal body temp */}
            <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  Température le matin
                </span>
                <Thermometer className="w-4 h-4 text-rose-500" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="35.5"
                  max="38.5"
                  step="0.05"
                  value={basalTemp}
                  onChange={e => setBasalTemp(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-24 p-2.5 rounded-xl border border-rose-200 text-lg font-black text-rose-700 text-center"
                />
                <span className="text-sm font-bold text-zinc-500">°C</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Prends-la le matin au réveil, avant de te lever. Une petite hausse peut indiquer que le jour le plus propice est passé.
              </p>
            </div>

            {/* LH Ovulation test */}
            <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  Test de fertilité urinaire
                </span>
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { id: 'none', label: 'Pas fait' },
                  { id: 'negative', label: 'Négatif (ligne pâle)' },
                  { id: 'positive', label: 'Positif (le jour propice approche)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLhTest(opt.id as any)}
                    className={`p-2 rounded-xl text-xs text-left border ${
                      lhTest === opt.id
                        ? 'bg-purple-600 text-white font-bold border-purple-700'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Advice card */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-zinc-900">
              Pour mettre toutes les chances de ton côté :
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-zinc-700">
              <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100">
                <strong className="block text-purple-900 mb-1">Vitamine B9 (acide folique)</strong>
                Commence 400 µg par jour dès que tu essaies d’avoir un bébé. Demande conseil à ton médecin ou à ta sage-femme.
              </div>
              <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100">
                <strong className="block text-rose-900 mb-1">Rapports</strong>
                Pendant la période où une grossesse est possible, un rapport tous les 2 jours laisse de bonnes chances, sans stress du calendrier.
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-100">
                <strong className="block text-amber-900 mb-1">Tabac et alcool</strong>
                Les arrêter à deux améliore les chances de conception. C’est un vrai coup de pouce pour les deux.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODE 2: GROSSESSE (SEMAINE PAR SEMAINE) */}
      {activeSubMode === 'pregnancy' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-white border border-rose-100 text-xs text-zinc-700">
            <label className="block font-bold mb-2">Date du début de grossesse (si tu la connais)</label>
            <input type="date" value={profile.pregnancyConceptionDate || ''} onChange={e => onUpdateProfile({ pregnancyConceptionDate: e.target.value || undefined })} className="w-full sm:w-56 p-2.5 rounded-xl border border-rose-200" />
          </div>
          <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-rose-500 to-purple-600 text-white shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                  Ma grossesse
                </span>
                <h3 className="text-3xl font-black tracking-tight mt-1">
                  Semaine {currentWeek} de grossesse
                </h3>
                <p className="text-xs text-rose-100 mt-1">
                  Trimestre {currentWeek <= 13 ? 1 : currentWeek <= 27 ? 2 : 3}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
                <span className="text-[10px] uppercase font-bold text-rose-200">Date prévue d’accouchement</span>
                <div className="text-lg font-black text-white">{dueDate || 'À renseigner'}</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-rose-200 font-bold">
                <span>Semaine 1</span>
                <span>Semaine 40</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={currentWeek}
                onChange={e => setCurrentWeek(parseInt(e.target.value))}
                className="w-full accent-white"
              />
            </div>
          </div>

          {/* Week milestones */}
          <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-zinc-900">
              Ce qui se passe semaine après semaine :
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PREGNANCY_WEEKS_SAMPLE.map(item => (
                <div
                  key={item.week}
                  className={`p-4 rounded-2xl border transition-all ${
                    currentWeek === item.week
                      ? 'bg-rose-50 border-rose-400 shadow-xs ring-1 ring-rose-400'
                      : 'bg-zinc-50/70 border-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-rose-700">
                      Semaine {item.week}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-600 bg-white px-2 py-0.5 rounded-md border border-zinc-200">
                      🍇 {item.sizeFruit}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-700 mt-1 leading-relaxed">
                    {item.highlight}
                  </p>
                  <div className="mt-2 text-[10px] text-purple-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-purple-500" /> {item.exam}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODE 3: POST-PARTUM */}
      {activeSubMode === 'postpartum' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-white border border-indigo-100 text-xs text-zinc-700">
            <label className="block font-bold mb-2">Date de l’accouchement (facultative)</label>
            <input type="date" value={profile.postpartumDeliveryDate || ''} onChange={e => { const date = e.target.value || undefined; onUpdateProfile({ postpartumDeliveryDate: date }); if (date) setPostpartumDays(Math.max(1, daysBetween(parseDate(date), new Date()))); }} className="w-full sm:w-56 p-2.5 rounded-xl border border-indigo-200" />
          </div>
          <div className="p-6 rounded-3xl bg-indigo-50/60 border border-indigo-100 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Après la naissance
                </span>
                <h3 className="text-2xl font-black text-zinc-900 mt-1">
                  Jour {postpartumDays} après la naissance
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Ton corps se remet doucement. Prends soin de toi.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={postpartumDays}
                  onChange={e => setPostpartumDays(parseInt(e.target.value) || 1)}
                  className="w-20 p-2 rounded-xl border border-indigo-200 text-center font-bold text-indigo-800"
                />
                <span className="text-xs text-zinc-500">jours</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lochia tracking */}
            <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-zinc-900">
                Mes saignements après l’accouchement :
              </h4>
              <p className="text-xs text-zinc-500">
                Ils changent de couleur et diminuent petit à petit au fil des semaines.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'rouges', label: 'Rouge vif (jours 1 à 4)' },
                  { id: 'rosées', label: 'Rosés / bruns (semaines 2 à 3)' },
                  { id: 'jaunes', label: 'Jaunes / clairs (semaines 4 à 6)' },
                  { id: 'terminées', label: 'Terminés' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLochiaColor(opt.id)}
                    className={`px-3 py-2 rounded-xl text-xs border ${
                      lochiaColor === opt.id
                        ? 'bg-rose-500 text-white font-bold border-rose-600'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-900">
                <strong>Quand consulter vite :</strong> si les saignements redeviennent très abondants (plus de 2 serviettes remplies par heure), ou s’ils sentent très mauvais avec de la fièvre, va aux urgences sans attendre.
              </div>
            </div>

            {/* Emotional well-being / Postpartum depression screening */}
            <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-zinc-900">
                Comment va ton moral ?
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Le baby blues dure quelques jours après la naissance. Si tu te sens très triste, épuisée ou coupable pendant plus de 2 semaines, tu n’es pas seule et ce n’est pas de ta faute. Parles-en.
              </p>
              <div className="p-3.5 rounded-xl bg-purple-50 text-purple-900 text-xs">
                Le rendez-vous après la naissance (6 à 8 semaines plus tard) est un moment prévu pour en parler librement avec ta sage-femme ou ton médecin.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
