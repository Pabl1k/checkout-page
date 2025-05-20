import { onMounted, reactive } from 'vue';
import type { FormState } from '../../../shared/types/form';
import type { BirthDate } from '../../../shared/types/userInfo';
import { initialFormState } from '../model/initialState.ts';
import { useFormValidation } from './useFormValidation.ts';

interface ApiResponse {
  status: number;
  message: string;
}

const fakeApiPost = (endpoint: string, data: any): Promise<ApiResponse> => {
  console.log('Submitted data:', data);

  return Promise.resolve({
    status: 200,
    message: `${endpoint} request submitted`
  });
};

export const useForm = () => {
  const formState = reactive<FormState>({ ...initialFormState });
  const { formErrors, validate } = useFormValidation(formState);

  onMounted(async () => {
    try {
      const response = await fetch('https://ipapi.co/postal');
      formState.zip = await response.json();
    } catch (err: unknown) {
      console.error('Error fetching data:', err);
    }
  });

  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (key === 'birthDate') {
      formState.birthDate = value as BirthDate;
    } else {
      formState[key] = value;
    }
  };

  const holderNameAutoFill = () => {
    formState.cardHolder = formState.fullName;
  };

  const handleSubmit = async () => {
    const formValid = await validate();

    if (!formValid) {
      return;
    }

    const response = await fakeApiPost('fakeEndpoint', JSON.stringify(formState));

    if (response.status !== 200) {
      console.error('Error submitting form');
      return;
    }

    Object.assign(formState, structuredClone(initialFormState));
    alert('Form submitted successfully!');
  };

  return {
    formState,
    formErrors,
    handleChange,
    holderNameAutoFill,
    handleSubmit
  };
};
