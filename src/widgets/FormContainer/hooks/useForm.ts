import { reactive } from 'vue';
import type { FormState } from '../../../shared/types/form';
import type { BirthDate } from '../../../shared/types/userInfo';
import { initialFormState } from '../model/initialState.ts';
import { useFormValidation } from './useFormValidation.ts';

export const useForm = () => {
  const formState = reactive<FormState>({ ...initialFormState });
  const { formErrors, validate } = useFormValidation(formState);

  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (key === 'birthDate') {
      formState.birthDate = value as BirthDate;
    } else {
      formState[key] = value;
    }
  };

  const handleSubmit = async () => {
    const formValid = await validate();

    if (!formValid) {
      return;
    }

    console.log('Form submitted:', formState);
    Object.assign(formState, structuredClone(initialFormState));
  };

  return {
    formState,
    formErrors,
    handleChange,
    handleSubmit
  };
};
