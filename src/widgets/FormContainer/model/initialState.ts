import type { FormErrorKeys, FormState } from '../../../shared/types/form';

export const initialFormState: FormState = {
  fullName: '',
  email: '',
  zip: '',
  birthDate: {
    month: '',
    day: '',
    year: ''
  },
  gender: 'female',
  cardHolder: '',
  cardNumber: '',
  expirationDate: '',
  cvv: ''
};

export const initialFormErrors: Record<FormErrorKeys, string> = {
  fullName: '',
  email: '',
  zip: '',
  birthDate: '',
  cardHolder: '',
  cardNumber: '',
  expirationDate: '',
  cvv: ''
};
