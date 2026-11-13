/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  CycleRecord,
  DailyLog,
  ReminderItem,
  HealthAppointment,
  MedicationItem,
  ContraceptionRecord
} from './types';
import { StorageService } from './services/storage';
import { syncNotifications } from './services/notifications';
import { calculateCycleStatus, formatDate } from './services/cycleCalculator';
import { Navbar, NavTabId } from './components/Navbar';
import { Header } from './components/Header';
import { PinLockModal } from './components/PinLockModal';
import { OnboardingModal } from './components/OnboardingModal';
import { DailyLogModal, LogModalTab } from './components/DailyLogModal';

// Views
import { DashboardView } from './views/DashboardView';
import { ToolsView } from './views/ToolsView';
import { CycleView } from './views/CycleView';
import { BodyView } from './views/BodyView';
import { MoodView } from './views/MoodView';
import { EncyclopediaView } from './views/EncyclopediaView';
import { NormalityChecker } from './views/NormalityChecker';
import { FertilityPregnancyView } from './views/FertilityPregnancyView';
import { HealthRecordsView } from './views/HealthRecordsView';
import { StatisticsView } from './views/StatisticsView';
import { RemindersView } from './views/RemindersView';
import { ProfileSecurityView } from './views/ProfileSecurityView';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(StorageService.getProfile());
  const [cycles, setCycles] = useState<CycleRecord[]>(StorageService.getCycles());
  const [dailyLogs, setDailyLogs] = useState<Record<string, DailyLog>>(StorageService.getDailyLogs());
  const [reminders, setReminders] = useState<ReminderItem[]>(StorageService.getReminders());
  const [appointments, setAppointments] = useState<HealthAppointment[]>(StorageService.getAppointments());
  const [medications, setMedications] = useState<MedicationItem[]>(StorageService.getMedications());
  const [contraception, setContraception] = useState<ContraceptionRecord>(StorageService.getContraception());

  // Navigation & UI state
  const [currentTab, setCurrentTab] = useState<NavTabId>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(StorageService.isSessionLocked());
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!profile.onboarded);

  // Daily log modal state
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [logModalDate, setLogModalDate] = useState<string>(formatDate(new Date()));
  const [logModalTab, setLogModalTab] = useState<LogModalTab>('flow');

  // Active article state for encyclopedia jump
  const [selectedArticleId, setSelectedArticleId] = useState<string | undefined>(undefined);

  // Today string & current log
  const todayStr = formatDate(new Date());
  const todayLog = dailyLogs[todayStr] || {
    date: todayStr,
    flow: 'none',
    symptoms: [],
    painLocations: [],
    waterGlasses: 0,
    sleepHours: 0
  };

  // Recalculate cycle status whenever cycles or profile change
  const cycleStats = calculateCycleStatus(cycles, profile.cycleLength, profile.periodLength);

  // Keep phone notifications in step with reminders and the predicted cycle.
  useEffect(() => {
    syncNotifications(reminders, profile, cycleStats).catch(err => console.error('Notifications', err));
  }, [reminders, profile.discreteMode, cycleStats.nextPeriodDate, cycleStats.fertileWindowStart]);

  // Profile handlers
  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    StorageService.saveProfile(updated);
  };

  const handleToggleDiscreteMode = () => {
    handleUpdateProfile({ discreteMode: !profile.discreteMode });
  };

  const handleLockNow = () => {
    StorageService.lockSession();
    setIsLocked(true);
  };

  const handleUnlocked = () => {
    StorageService.unlockSession();
    setIsLocked(false);
  };

  // Cycle handlers
  const handleSaveCycle = (cycle: CycleRecord) => {
    const updated = StorageService.addOrUpdateCycle(cycle);
    setCycles([...updated]);
  };

  const handleDeleteCycle = (id: string) => {
    const updated = StorageService.deleteCycle(id);
    setCycles([...updated]);
  };

  // Daily Log handlers
  const handleSaveDailyLog = (log: DailyLog) => {
    StorageService.saveDailyLog(log);
    setDailyLogs({ ...StorageService.getDailyLogs() });
  };

  // Quick actions
  const handleQuickMoodSelect = (mood: string) => {
    const updated: DailyLog = {
      ...todayLog,
      quickMood: mood
    };
    handleSaveDailyLog(updated);
  };

  const handleQuickLogPeriodStart = () => {
    const newCycle: CycleRecord = {
      id: `cycle-${Date.now()}`,
      startDate: todayStr,
      periodDuration: profile.periodLength,
      flowIntensity: 'medium',
      notes: 'Début des règles noté rapidement'
    };
    handleSaveCycle(newCycle);
    const updatedLog: DailyLog = {
      ...todayLog,
      flow: 'medium'
    };
    handleSaveDailyLog(updatedLog);
  };

  const openLogModal = (tab: LogModalTab = 'flow', dateStr: string = todayStr) => {
    setLogModalDate(dateStr);
    setLogModalTab(tab);
    setIsLogModalOpen(true);
  };

  const handleOpenLogModalForDate = (dateStr: string) => {
    openLogModal('flow', dateStr);
  };

  const handleOpenArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentTab('encyclopedia');
  };

  const handleOnboardingComplete = (data: Partial<UserProfile>, lastPeriodDate?: string) => {
    const updated = { ...profile, ...data, onboarded: true };
    setProfile(updated);
    StorageService.saveProfile(updated);
    setShowOnboarding(false);

    if (lastPeriodDate) {
      const newCycle: CycleRecord = {
        id: `cycle-${Date.now()}`,
        startDate: lastPeriodDate,
        periodDuration: updated.periodLength,
        flowIntensity: 'medium',
        notes: 'Premier jour des dernières règles'
      };
      handleSaveCycle(newCycle);
    }
  };

  const handleDataReset = () => {
    setProfile(StorageService.getProfile());
    setCycles(StorageService.getCycles());
    setDailyLogs(StorageService.getDailyLogs());
    setReminders(StorageService.getReminders());
    setAppointments(StorageService.getAppointments());
    setMedications(StorageService.getMedications());
    setContraception(StorageService.getContraception());
    setCurrentTab('home');
  };

  const textScaleClass =
    profile.textSize === 'large'
      ? 'text-scale-large'
      : profile.textSize === 'xlarge'
      ? 'text-scale-xlarge'
      : 'text-scale-normal';

  return (
    <div
      className={`min-h-screen flex text-zinc-800 font-sans transition-colors duration-200 ${textScaleClass}`}
    >
      {isLocked && profile.isPinEnabled && profile.pinCode && (
        <PinLockModal
          savedPin={profile.pinCode}
          onUnlocked={handleUnlocked}
          discreteMode={profile.discreteMode}
        />
      )}

      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        onClose={() => setShowOnboarding(false)}
      />

      <DailyLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        dateStr={logModalDate}
        initialTab={logModalTab}
        initialLog={dailyLogs[logModalDate] || {
          date: logModalDate,
          flow: 'none',
          symptoms: [],
          painLocations: [],
          waterGlasses: 0,
          sleepHours: 0
        }}
        onSave={handleSaveDailyLog}
      />

      <Navbar
        currentTab={currentTab}
        onSelectTab={tab => {
          if (tab !== 'encyclopedia') setSelectedArticleId(undefined);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={profile.lang}
        discreteMode={profile.discreteMode}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenQuickAdd={() => openLogModal('flow')}
      />

      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        <Header
          profile={profile}
          lang={profile.lang}
          onChangeLang={lang => handleUpdateProfile({ lang })}
          textSize={profile.textSize}
          onChangeTextSize={size => handleUpdateProfile({ textSize: size })}
          onToggleDiscreteMode={handleToggleDiscreteMode}
          onLockNow={handleLockNow}
          onOpenProfile={() => setCurrentTab('profile')}
          onOpenFloralOnboarding={() => setShowOnboarding(true)}
        />

        <main className="flex-1 w-full max-w-6xl mx-auto px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {currentTab === 'home' && (
            <DashboardView
              profile={profile}
              stats={cycleStats}
              todayLog={todayLog}
              reminders={reminders}
              onOpenLogModal={openLogModal}
              onSelectTab={tab => setCurrentTab(tab)}
              onQuickMoodSelect={handleQuickMoodSelect}
              onQuickLogPeriodStart={handleQuickLogPeriodStart}
            />
          )}

          {currentTab === 'tools' && (
            <ToolsView
              todayLog={todayLog}
              onSaveLog={handleSaveDailyLog}
              onOpenLogModal={() => openLogModal('flow')}
              onSelectTab={tab => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'cycle' && (
            <CycleView
              cycles={cycles}
              dailyLogs={dailyLogs}
              stats={cycleStats}
              profile={profile}
              onSaveCycle={handleSaveCycle}
              onDeleteCycle={handleDeleteCycle}
              onOpenLogModalForDate={handleOpenLogModalForDate}
            />
          )}

          {currentTab === 'body' && (
            <BodyView
              todayLog={todayLog}
              allLogs={dailyLogs}
              onSaveLog={handleSaveDailyLog}
            />
          )}

          {currentTab === 'mood' && (
            <MoodView
              todayLog={todayLog}
              allLogs={dailyLogs}
              onSaveLog={handleSaveDailyLog}
            />
          )}

          {currentTab === 'encyclopedia' && (
            <EncyclopediaView initialArticleId={selectedArticleId} />
          )}

          {currentTab === 'normality' && (
            <NormalityChecker
              onOpenArticle={handleOpenArticle}
              onSelectTab={tab => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'fertility' && (
            <FertilityPregnancyView
              profile={profile}
              stats={cycleStats}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {currentTab === 'healthRecords' && (
            <HealthRecordsView
              profile={profile}
              cycles={cycles}
              dailyLogs={dailyLogs}
              appointments={appointments}
              medications={medications}
              contraception={contraception}
              onSaveAppointments={apts => {
                StorageService.saveAppointments(apts);
                setAppointments(apts);
              }}
              onSaveMedications={meds => {
                StorageService.saveMedications(meds);
                setMedications(meds);
              }}
              onSaveContraception={c => {
                StorageService.saveContraception(c);
                setContraception(c);
              }}
            />
          )}

          {currentTab === 'statistics' && (
            <StatisticsView
              cycles={cycles}
              dailyLogs={dailyLogs}
              stats={cycleStats}
              profile={profile}
            />
          )}

          {currentTab === 'reminders' && (
            <RemindersView
              reminders={reminders}
              profile={profile}
              onSaveReminders={rems => {
                StorageService.saveReminders(rems);
                setReminders(rems);
              }}
              onToggleDiscreteMode={handleToggleDiscreteMode}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileSecurityView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onDataReset={handleDataReset}
            />
          )}
        </main>
      </div>
    </div>
  );
}
