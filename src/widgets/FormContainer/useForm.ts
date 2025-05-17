import { reactive } from 'vue';
import type { FormErrorKeys, FormState } from '../../shared/types/form';
import type { BirthDate } from '../../shared/types/userInfo';

const initialFormState: FormState = {
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
const initialFormErrors: Record<FormErrorKeys, string> = {
  fullName: '',
  email: '',
  zip: '',
  birthDate: '',
  cardHolder: '',
  cardNumber: '',
  expirationDate: '',
  cvv: ''
};

export const useForm = () => {
  const formState = reactive<FormState>({ ...initialFormState });
  const formErrors = reactive<Record<FormErrorKeys, string>>(initialFormErrors);

  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (key === 'birthDate') {
      formState.birthDate = value as BirthDate;
    } else {
      formState[key] = value;
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formState);
    // form reset
    Object.assign(formState, structuredClone(initialFormState));
  };

  return {
    formState,
    formErrors,
    handleChange,
    handleSubmit
  };
};
