import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { CycleCalculationResult, ReminderItem, UserProfile } from '../types';
import { parseDate } from './cycleCalculator';

export const canNotify = Capacitor.isNativePlatform();

// Notification ids must be ints: reminders use their index, cycle alerts use fixed ids.
const PERIOD_SOON = 9001, FERTILE_START = 9002;

/** Re-schedules every reminder plus the "period soon" and "fertile window" alerts. Android only. */
export async function syncNotifications(reminders: ReminderItem[], profile: UserProfile, stats: CycleCalculationResult) {
  if (!canNotify) return;
  if ((await LocalNotifications.checkPermissions()).display !== 'granted') {
    if ((await LocalNotifications.requestPermissions()).display !== 'granted') return;
  }
  const pending = await LocalNotifications.getPending();
  if (pending.notifications.length) await LocalNotifications.cancel({ notifications: pending.notifications.map(n => ({ id: n.id })) });

  const title = (r: ReminderItem) => (profile.discreteMode ? r.discreetTitle : r.title);
  const list: Parameters<typeof LocalNotifications.schedule>[0]['notifications'] = [];
  reminders.forEach((r, i) => {
    if (!r.enabled) return;
    const [hour, minute] = r.time.split(':').map(Number);
    const days = r.daysOfWeek?.length ? r.daysOfWeek : null;
    if (!days) list.push({ id: i + 1, title: 'Mood Jardin', body: title(r), schedule: { on: { hour, minute }, allowWhileIdle: true } });
    // Capacitor weekdays are 1 (Sunday) to 7; ours are 0 (Sunday) to 6.
    else days.forEach(d => list.push({ id: (i + 1) * 10 + d, title: 'Mood Jardin', body: title(r), schedule: { on: { weekday: d + 1, hour, minute }, allowWhileIdle: true } }));
  });

  const at9 = (dateStr: string, shiftDays: number) => { const d = parseDate(dateStr); d.setDate(d.getDate() + shiftDays); d.setHours(9, 0, 0, 0); return d; };
  if (stats.hasCycleData) {
    const soon = at9(stats.nextPeriodDate, -2);
    if (soon > new Date()) list.push({ id: PERIOD_SOON, title: 'Mood Jardin', body: profile.discreteMode ? 'Petit rappel bien-être pour dans 2 jours.' : 'Tes règles sont prévues dans 2 jours. Pense à prévoir des protections.', schedule: { at: soon, allowWhileIdle: true } });
    const fertile = at9(stats.fertileWindowStart, 0);
    if (fertile > new Date() && !profile.discreteMode) list.push({ id: FERTILE_START, title: 'Mood Jardin', body: 'Ta fenêtre fertile estimée commence aujourd’hui.', schedule: { at: fertile, allowWhileIdle: true } });
  }
  if (list.length) await LocalNotifications.schedule({ notifications: list });
}

export async function testNotification(body: string) {
  if (!canNotify) return false;
  if ((await LocalNotifications.requestPermissions()).display !== 'granted') return false;
  await LocalNotifications.schedule({ notifications: [{ id: 9999, title: 'Mood Jardin', body, schedule: { at: new Date(Date.now() + 1500) } }] });
  return true;
}
