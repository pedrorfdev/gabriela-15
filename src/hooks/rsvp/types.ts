export type WizardStep = 'personal' | 'companionCount' | 'companionForm' | 'review' | 'declined';

export interface Person {
  name: string;
  note: string;
}

export const EMPTY_PERSON: Person = { name: '', note: '' };
