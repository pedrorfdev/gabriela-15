import { motion, AnimatePresence } from 'motion/react';
import { useRsvpWizard } from '@/hooks/rsvp/useRsvpWizard';
import { fadeIn } from '@/lib/motion';
import ProgressDots from './rsvp-steps/ProgressDots';
import StepPersonalInfo from './rsvp-steps/StepPersonalInfo';
import StepCompanionCount from './rsvp-steps/StepCompanionCount';
import StepCompanionForm from './rsvp-steps/StepCompanionForm';
import StepReview from './rsvp-steps/StepReview';
import StepDeclined from './rsvp-steps/StepDeclined';

export default function RsvpWizard() {
  const wizard = useRsvpWizard();

  // TODO: wire this up to sheetsApi.ts once the Apps Script backend is built.
  function handleFinalSubmit() {
    console.log('RSVP submitted', {
      personal: wizard.personal,
      companions: wizard.companions,
    });
  }

  return (
    <div className="mx-auto max-w-[420px] rounded-2xl border border-black/8 bg-surface p-9">
      <ProgressDots step={wizard.step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={wizard.step}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
        >
          {wizard.step === 'personal' && (
            <StepPersonalInfo
              personal={wizard.personal}
              onChange={wizard.updatePersonal}
              onConfirmGoing={wizard.confirmGoing}
            />
          )}

          {wizard.step === 'companionCount' && (
            <StepCompanionCount
              count={wizard.companionCount}
              onIncrement={wizard.incrementCompanions}
              onDecrement={wizard.decrementCompanions}
              onContinue={wizard.startCompanionForms}
            />
          )}

          {wizard.step === 'companionForm' && (
            <StepCompanionForm
              draft={wizard.companionDraft}
              index={wizard.companionIndex}
              total={wizard.companionCount}
              onChange={wizard.updateCompanionDraft}
              onSubmit={wizard.submitCompanionForm}
            />
          )}

          {wizard.step === 'review' && (
            <StepReview
              personal={wizard.personal}
              companions={wizard.companions}
              onSubmit={handleFinalSubmit}
            />
          )}

          {wizard.step === 'declined' && (
            <StepDeclined name={wizard.personal.name} onConfirm={handleFinalSubmit} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
