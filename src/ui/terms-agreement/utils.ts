import type { TermsItem } from './terms-agreement';

export const isRequiredTermsAgreed = (items: TermsItem[], agreedIds: string[]) =>
  items.filter((item) => item.required).every((item) => agreedIds.includes(item.id));
