import { CycleRecord, CyclePhase, CycleCalculationResult } from '../types';

/**
 * Format date to YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function daysBetween(dateA: Date, dateB: Date): number {
  const oneDayMs = 24 * 60 * 60 * 1000;
  const utcA = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
  const utcB = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
  return Math.round((utcB - utcA) / oneDayMs);
}

/**
 * Main cycle calculation engine
 */
export function calculateCycleStatus(
  cycles: CycleRecord[],
  defaultCycleLength = 28,
  defaultPeriodLength = 5,
  currentDate = new Date()
): CycleCalculationResult {
  // Sort cycles with newest first
  const sortedCycles = [...cycles].sort((a, b) => {
    return parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime();
  });

  // Calculate historical averages if cycles exist
  let avgCycleLength = defaultCycleLength;
  let avgPeriodLength = defaultPeriodLength;
  let isIrregular = false;

  if (sortedCycles.length >= 2) {
    const validCycleDurations: number[] = [];
    const validPeriodDurations: number[] = [];

    for (let i = 0; i < sortedCycles.length - 1; i++) {
      const currentStart = parseDate(sortedCycles[i].startDate);
      const prevStart = parseDate(sortedCycles[i + 1].startDate);
      const diff = daysBetween(prevStart, currentStart);
      if (diff >= 20 && diff <= 45) {
        validCycleDurations.push(diff);
      }
      if (sortedCycles[i].periodDuration && sortedCycles[i].periodDuration! >= 2 && sortedCycles[i].periodDuration! <= 10) {
        validPeriodDurations.push(sortedCycles[i].periodDuration!);
      }
    }

    if (validCycleDurations.length > 0) {
      avgCycleLength = Math.round(
        validCycleDurations.reduce((sum, d) => sum + d, 0) / validCycleDurations.length
      );
      // Check standard deviation
      const variance = validCycleDurations.reduce((sum, val) => sum + Math.pow(val - avgCycleLength, 2), 0) / validCycleDurations.length;
      const stdDev = Math.sqrt(variance);
      isIrregular = stdDev >= 4;
    }

    if (validPeriodDurations.length > 0) {
      avgPeriodLength = Math.round(
        validPeriodDurations.reduce((sum, d) => sum + d, 0) / validPeriodDurations.length
      );
    }
  }

  // Never fabricate a health history. Until a first period is recorded, the UI can
  // explain how to begin without presenting an ovulation or period as a fact.
  if (sortedCycles.length === 0) {
    return {
      hasCycleData: false,
      currentDayOfCycle: 1,
      totalCycleLength: avgCycleLength,
      phase: 'follicular',
      phaseName: 'À compléter',
      phaseDescription: 'Ajoute le premier jour de tes dernières règles pour voir tes prévisions.',
      daysUntilNextPeriod: 0,
      nextPeriodDate: '',
      ovulationDate: '',
      fertileWindowStart: '',
      fertileWindowEnd: '',
      isDelayed: false,
      daysDelayed: 0,
      averageCycleLength: avgCycleLength,
      averagePeriodLength: avgPeriodLength,
      isIrregular: false
    };
  }

  const latestCycle = sortedCycles[0];
  const lastStartDate = parseDate(latestCycle.startDate);
  const daysSinceStart = daysBetween(lastStartDate, currentDate) + 1; // 1-indexed (Day 1 = start date)

  const estimatedOvulationDay = Math.max(8, avgCycleLength - 14);
  const nextPeriod = addDays(lastStartDate, avgCycleLength);
  const ovulDate = addDays(lastStartDate, estimatedOvulationDay - 1);
  const fertStart = addDays(ovulDate, -5);
  const fertEnd = addDays(ovulDate, 1);

  const daysUntilNext = daysBetween(currentDate, nextPeriod);
  const isDelayed = daysUntilNext < 0;
  const daysDelayed = isDelayed ? Math.abs(daysUntilNext) : 0;

  let currentDayOfCycle = Math.max(1, daysSinceStart);
  let phase: CyclePhase = 'follicular';
  let phaseName = 'Après tes règles';
  let phaseDescription = 'Tu peux retrouver de l’élan petit à petit. Écoute ton énergie.';

  const actualPeriodLength = latestCycle.periodDuration || avgPeriodLength;

  if (currentDayOfCycle <= actualPeriodLength) {
    phase = 'menstrual';
    phaseName = 'Tes règles';
    phaseDescription = 'C’est le moment de te reposer et de faire ce qui te soulage.';
  } else if (currentDayOfCycle >= estimatedOvulationDay - 5 && currentDayOfCycle < estimatedOvulationDay) {
    phase = 'fertile';
    phaseName = 'Période où une grossesse est possible';
    phaseDescription = 'C’est une estimation. Elle ne protège pas d’une grossesse.';
  } else if (currentDayOfCycle === estimatedOvulationDay) {
    phase = 'ovulation';
    phaseName = 'Jour le plus propice à une grossesse';
    phaseDescription = 'C’est une estimation basée sur ton cycle, pas une certitude.';
  } else if (currentDayOfCycle > estimatedOvulationDay && currentDayOfCycle <= avgCycleLength) {
    phase = 'luteal';
    phaseName = 'Avant tes règles';
    phaseDescription = 'Tu peux te sentir plus fatiguée, sensible ou gonflée. C’est fréquent.';
  } else if (currentDayOfCycle > avgCycleLength) {
    phase = 'luteal';
    phaseName = isDelayed ? 'Tes règles sont en retard' : 'Fin de ton cycle';
    phaseDescription = isDelayed
      ? 'Un retard peut arriver. Si tu as un doute, un test de grossesse peut t’aider.'
      : 'Ton cycle touche bientôt à sa fin.';
  }

  return {
    hasCycleData: true,
    currentDayOfCycle,
    totalCycleLength: avgCycleLength,
    phase,
    phaseName,
    phaseDescription,
    daysUntilNextPeriod: Math.max(0, daysUntilNext),
    nextPeriodDate: formatDate(nextPeriod),
    ovulationDate: formatDate(ovulDate),
    fertileWindowStart: formatDate(fertStart),
    fertileWindowEnd: formatDate(fertEnd),
    isDelayed,
    daysDelayed,
    averageCycleLength: avgCycleLength,
    averagePeriodLength: avgPeriodLength,
    isIrregular
  };
}
