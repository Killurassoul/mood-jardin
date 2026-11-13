import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import { Droplet, Flower2, RotateCcw, Sparkles } from 'lucide-react';
import { CycleCalculationResult, CyclePhase } from '../types';

interface FloralGarden3DProps { stats: CycleCalculationResult; onOpenLogModal?: () => void; onQuickLogPeriodStart?: () => void; className?: string; showDetails?: boolean; }
type PhaseInfo = { phase: CyclePhase; title: string; description: string; bloom: number; care: string };

const phaseForDay = (day: number, totalDays: number, periodDays: number): PhaseInfo => {
  const ovulationDay = Math.max(8, totalDays - 14);
  if (day <= periodDays) return { phase: 'menstrual', title: 'Mes règles · Repos', description: 'Ton corps se repose. C’est normal d’avoir moins d’énergie.', bloom: 0.12, care: 'Fais ce qui te fait du bien : chaleur, repos, eau.' };
  if (day < ovulationDay - 5) return { phase: 'follicular', title: 'Après mes règles · L’énergie revient', description: 'Petit à petit, tu retrouves de l’élan. Les fleurs s’ouvrent doucement.', bloom: 0.5, care: 'Profite de cette énergie, sans te mettre de pression.' };
  if (day < ovulationDay) return { phase: 'fertile', title: 'Période où une grossesse est possible', description: 'C’est une estimation. La fleur s’ouvre pour montrer cette période, sans certitude.', bloom: 0.82, care: 'Si tu souhaites éviter ou avoir un bébé, demande conseil à un professionnel de santé.' };
  if (day === ovulationDay) return { phase: 'ovulation', title: 'Jour le plus propice · Pleine floraison', description: 'La fleur est grande ouverte. C’est le jour estimé où une grossesse a le plus de chances de commencer.', bloom: 1, care: 'Une estimation ne remplace pas un test ni l’avis d’un médecin.' };
  return { phase: 'luteal', title: 'Avant mes règles · Cocon', description: 'Ton corps ralentit avant les règles. La fleur se referme pour se protéger.', bloom: 0.38, care: 'Accorde-toi du temps et note ce qui t’aide.' };
};

function Petal({ angle, layer, bloom, color }: { angle: number; layer: number; bloom: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null); const target = useRef(0);
  useFrame((_, delta) => { target.current = THREE.MathUtils.damp(target.current, bloom, 4, delta); if (!ref.current) return; const open = target.current; ref.current.rotation.set((1 - open) * 1.25, angle, (1 - open) * Math.sin(angle) * 0.28); ref.current.position.set(Math.sin(angle) * 0.1 * open, 0.16 + layer * 0.035, Math.cos(angle) * 0.1 * open); const size = (0.28 + open * 0.62) * (1 - layer * 0.11); ref.current.scale.set(size, 0.82 + open * 0.26, size); });
  return <mesh ref={ref} castShadow><sphereGeometry args={[1, 22, 18, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshPhysicalMaterial color={color} roughness={0.42} clearcoat={0.18} sheen={0.7} sheenColor="#ffe5ee" side={THREE.DoubleSide} /></mesh>;
}

function Flower({ bloom, accent = '#ff8fac', position = [0, 0, 0], scale = 1 }: { bloom: number; accent?: string; position?: [number, number, number]; scale?: number }) {
  const group = useRef<THREE.Group>(null); const core = useRef<THREE.Mesh>(null);
  const petals = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ angle: (i / 14) * Math.PI * 2, layer: i % 2 })), []);
  useFrame(({ clock }, delta) => { if (!group.current) return; group.current.rotation.y += delta * 0.12; group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.2) * 0.025; if (core.current) core.current.scale.setScalar(THREE.MathUtils.damp(core.current.scale.x, 0.28 + bloom * 0.24, 4, delta)); });
  return <group ref={group} position={position} scale={scale}>
    <mesh position={[0, -0.55, 0]} castShadow><cylinderGeometry args={[0.055, 0.08, 1.1, 12]} /><meshStandardMaterial color="#a9c992" roughness={0.85} /></mesh>
    <mesh position={[-0.16, -0.23, 0]} rotation={[0.45, 0.8, 0]}><sphereGeometry args={[0.16, 16, 12]} /><meshStandardMaterial color="#b8d99e" roughness={0.8} /></mesh>
    <mesh position={[0.16, -0.1, 0]} rotation={[-0.38, -0.9, 0]}><sphereGeometry args={[0.15, 16, 12]} /><meshStandardMaterial color="#b8d99e" roughness={0.8} /></mesh>
    <group position={[0, 0.05, 0]}>{petals.map(({ angle, layer }) => <Petal key={`${angle}-${layer}`} angle={angle} layer={layer} bloom={bloom} color={layer ? '#ffc1d1' : accent} />)}</group>
    <mesh ref={core} position={[0, 0.17, 0]}><sphereGeometry args={[1, 20, 20]} /><meshStandardMaterial color="#ffd56a" emissive="#f6a800" emissiveIntensity={0.35 + bloom * 0.7} /></mesh><pointLight color="#ffd7e3" intensity={bloom * 1.5} distance={3.4} position={[0, 0.7, 0]} />
  </group>;
}

function GardenScene({ bloom }: { bloom: number }) {
  const garden = useRef<THREE.Group>(null);
  useFrame(({ clock }, delta) => { if (garden.current) garden.current.rotation.y += delta * 0.035 + Math.sin(clock.elapsedTime * 0.25) * 0.0004; });
  return <group ref={garden}><ambientLight intensity={1.7} color="#fff0f5" /><directionalLight position={[4, 6, 5]} intensity={2.4} color="#fff9fc" castShadow /><pointLight position={[-3, 2, 2]} intensity={1.2} color="#ffc4d4" />
    <mesh position={[0, -0.82, 0]} receiveShadow><cylinderGeometry args={[2.3, 2.55, 0.42, 48]} /><meshStandardMaterial color="#f8e2ea" roughness={0.9} /></mesh><mesh position={[0, -0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[2.28, 48]} /><meshStandardMaterial color="#e0edcf" roughness={1} /></mesh>
    <Flower bloom={bloom} accent="#ff8fac" position={[0, -0.05, 0]} scale={1.32} /><Flower bloom={Math.max(0.08, bloom * 0.78)} accent="#f6aac0" position={[-1.2, -0.28, 0.25]} scale={0.56} /><Flower bloom={Math.max(0.08, bloom * 0.9)} accent="#eeb1df" position={[1.15, -0.27, 0.1]} scale={0.62} /><Flower bloom={Math.max(0.08, bloom * 0.68)} accent="#ffc0a8" position={[0.42, -0.32, -1.02]} scale={0.48} /><ContactShadows position={[0, -1.02, 0]} opacity={0.22} scale={5} blur={2.4} far={3} color="#c77b97" />
  </group>;
}

export const FloralGarden3D: React.FC<FloralGarden3DProps> = ({ stats, onOpenLogModal, onQuickLogPeriodStart, className = '', showDetails = true }) => {
  const [selectedDay, setSelectedDay] = useState(stats.currentDayOfCycle || 1); const [previewing, setPreviewing] = useState(false);
  const totalDays = Math.max(20, stats.totalCycleLength || 28); const day = Math.min(totalDays, Math.max(1, selectedDay)); const calculatedPhase = useMemo(() => phaseForDay(day, totalDays, stats.averagePeriodLength || 5), [day, totalDays, stats.averagePeriodLength]); const phase = stats.hasCycleData ? calculatedPhase : { phase: 'follicular' as CyclePhase, title: 'Ton jardin t’attend', description: 'Ajoute le premier jour de tes dernières règles. Le jardin suivra alors ton rythme, sans rien inventer.', bloom: 0.34, care: 'Tu pourras ensuite noter seulement ce qui compte pour toi.' };
  useEffect(() => { if (!previewing) setSelectedDay(stats.currentDayOfCycle || 1); }, [stats.currentDayOfCycle, previewing]);
  const jumpTo = (phaseName: CyclePhase) => { const ovulation = Math.max(8, totalDays - 14); setPreviewing(true); setSelectedDay(phaseName === 'menstrual' ? 1 : phaseName === 'follicular' ? Math.min(totalDays, (stats.averagePeriodLength || 5) + 2) : phaseName === 'fertile' || phaseName === 'ovulation' ? ovulation : Math.min(totalDays, ovulation + 4)); };
  return <section className={`relative overflow-hidden rounded-3xl border border-rose-100 bg-linear-to-b from-[#fff7fa] via-[#fffdfd] to-[#fff0f5] p-4 sm:p-5 shadow-sm ${className}`} aria-label="Jardin floral : une image de ton cycle">
    <div className="absolute -top-16 right-0 h-44 w-44 rounded-full bg-rose-200/35 blur-3xl" /><div className="relative mb-3 flex items-start justify-between gap-3"><div className="flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-2xl bg-rose-100 text-[#e96087]"><Flower2 className="h-4 w-4" /></span><div><h3 className="text-sm font-black text-zinc-900">Mon jardin du cycle</h3><p className="text-[11px] font-medium text-zinc-500">Une image douce de ton cycle</p></div></div>{previewing && <button type="button" onClick={() => { setPreviewing(false); setSelectedDay(stats.currentDayOfCycle || 1); }} className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#df5e83] shadow-sm ring-1 ring-rose-100"><RotateCcw className="h-3 w-3" /> Aujourd’hui</button>}</div>
    <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-linear-to-b from-rose-100/65 to-pink-50/30 sm:h-72"><Canvas dpr={[1, 1.5]} camera={{ position: [0, 2.1, 5.4], fov: 38 }} shadows gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}><Suspense fallback={null}><GardenScene bloom={phase.bloom} /><OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.8} maxPolarAngle={1.55} autoRotate={false} /></Suspense></Canvas><div className="pointer-events-none absolute left-3 top-3 rounded-2xl border border-white/75 bg-white/80 px-3 py-2 backdrop-blur-sm"><p className="text-[11px] font-black text-zinc-900">Jour {day} <span className="font-medium text-zinc-400">/ {totalDays}</span></p><p className="text-[10px] font-bold text-[#df5e83]">{phase.title}</p></div><p className="pointer-events-none absolute bottom-2 right-3 rounded-full bg-white/75 px-2 py-1 text-[10px] font-medium text-rose-400">Fais glisser la fleur</p></div>
    <div className="relative mt-3 rounded-2xl border border-rose-100 bg-white/80 p-3"><div className="flex items-center justify-between gap-2"><h4 className="text-xs font-black text-rose-950">{phase.title}</h4>{stats.hasCycleData && <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">{stats.isDelayed ? `En retard de ${stats.daysDelayed} jours` : `Règles prévues dans ${stats.daysUntilNextPeriod} jours`}</span>}</div><p className="mt-1 text-xs leading-relaxed text-zinc-600">{phase.description}</p><p className="mt-2 flex gap-1.5 border-t border-rose-100 pt-2 text-[11px] font-medium text-[#c55878]"><Sparkles className="mt-0.5 h-3 w-3 shrink-0" />{phase.care}</p></div>
    {stats.hasCycleData && <div className="relative mt-3"><div className="mb-1.5 flex justify-between text-[11px] font-bold text-zinc-600"><span>Voir un autre jour</span><span className="text-rose-500">Jour {day}</span></div><input aria-label="Choisir un jour du cycle" type="range" min="1" max={totalDays} value={day} onChange={e => { setPreviewing(true); setSelectedDay(Number(e.target.value)); }} className="w-full accent-[#e96087]" /><div className="mt-2 grid grid-cols-4 gap-1.5">{([['menstrual', 'Règles'], ['follicular', 'Après'], ['ovulation', 'Propice'], ['luteal', 'Avant']] as const).map(([name, label]) => <button key={name} type="button" onClick={() => jumpTo(name)} className={`rounded-xl px-1 py-1.5 text-[10px] font-bold transition ${phase.phase === name || (name === 'ovulation' && phase.phase === 'fertile') ? 'bg-[#e96087] text-white shadow-sm' : 'bg-rose-50 text-zinc-600 hover:bg-rose-100'}`}>{label}</button>)}</div></div>}
    <details className="relative mt-3 rounded-2xl bg-rose-50/60 px-3 py-2 text-[11px] text-zinc-600"><summary className="cursor-pointer font-bold text-rose-700">Comment lire ce jardin ?</summary><p className="mt-1.5 leading-relaxed">La fleur s’ouvre quand ton énergie monte et se referme avant tes règles. Les jours affichés sont des estimations, pas des certitudes médicales.</p></details>
    {showDetails && <div className="relative mt-3 flex gap-2 border-t border-rose-100 pt-3">{onOpenLogModal && <button type="button" onClick={onOpenLogModal} className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-rose-200 bg-white px-3 py-2.5 text-xs font-bold text-[#d9587e]"><Sparkles className="h-3.5 w-3.5" /> Noter ma journée</button>}{onQuickLogPeriodStart && <button type="button" onClick={onQuickLogPeriodStart} className="flex items-center justify-center gap-1.5 rounded-2xl bg-[#e96087] px-3 py-2.5 text-xs font-bold text-white shadow-sm"><Droplet className="h-3.5 w-3.5" /> Mes règles ont commencé</button>}</div>}
  </section>;
};

export const CycleWheel = FloralGarden3D;
export default FloralGarden3D;
