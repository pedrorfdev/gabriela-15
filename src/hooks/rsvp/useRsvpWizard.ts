import { useState } from 'react';
import { RSVP_LIMITS } from '@/lib/constants';
import { EMPTY_PERSON, type Person, type WizardStep } from './types';

export function useRsvpWizard() {
  const [step, setStep] = useState<WizardStep>('personal');
  const [personal, setPersonal] = useState<Person>(EMPTY_PERSON);
  const [companionCount, setCompanionCount] = useState(0);
  const [companions, setCompanions] = useState<Person[]>([]);
  const [companionIndex, setCompanionIndex] = useState(0);
  const [companionDraft, setCompanionDraft] = useState<Person>(EMPTY_PERSON);

  function updatePersonal(field: keyof Person, value: string) {
    setPersonal((prev) => ({ ...prev, [field]: value }));
  }

  function updateCompanionDraft(field: keyof Person, value: string) {
    setCompanionDraft((prev) => ({ ...prev, [field]: value }));
  }

  function confirmGoing(isGoing: boolean) {
    if (!personal.name.trim()) return false;
    setStep(isGoing ? 'companionCount' : 'declined');
    return true;
  }

  function incrementCompanions() {
    setCompanionCount((count) => Math.min(count + 1, RSVP_LIMITS.maxCompanions));
  }

  function decrementCompanions() {
    setCompanionCount((count) => Math.max(count - 1, 0));
  }

  function startCompanionForms() {
    setCompanions([]);
    setCompanionIndex(0);
    setCompanionDraft(EMPTY_PERSON);
    setStep(companionCount === 0 ? 'review' : 'companionForm');
  }

  function submitCompanionForm() {
    if (!companionDraft.name.trim()) return false;

    const nextCompanions = [...companions, companionDraft];
    setCompanions(nextCompanions);
    setCompanionDraft(EMPTY_PERSON);

    const nextIndex = companionIndex + 1;
    if (nextIndex < companionCount) {
      setCompanionIndex(nextIndex);
    } else {
      setStep('review');
    }
    return true;
  }

  return {
    step,
    personal,
    companionCount,
    companions,
    companionIndex,
    companionDraft,
    updatePersonal,
    updateCompanionDraft,
    confirmGoing,
    incrementCompanions,
    decrementCompanions,
    startCompanionForms,
    submitCompanionForm,
  };
}
