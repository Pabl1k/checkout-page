import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { reactive } from 'vue';
import type { FormErrorKeys, FormState } from '../../shared/types/form';
import type { BirthDate } from '../../shared/types/userInfo.ts';

const convertMonthNameToIndex = (monthName: string) => {
  const months = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2000, i))
  );

  return months.indexOf(monthName);
};

const requiredErrorText = 'Field is required';

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

const fullNameValidator = helpers.withMessage(
  'Enter at least 2 words, each 2+ letters',
  (value: string) => {
    if (!value) {
      return false;
    }

    const words = value.trim().split(/\s+/);
    if (words.length < 2) {
      return false;
    }

    return words.every((word) => word.length >= 2);
  }
);

const emailValidator = helpers.withMessage(
  'Invalid email address',
  helpers.regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/)
);

const birthDateValidator = helpers.withMessage('Age must be over 18.', (value: BirthDate) => {
  const day = Number(value.day);
  const month = convertMonthNameToIndex(value.month);
  const year = Number(value.year);

  const now = new Date();

  let age = now.getFullYear() - year;
  const m = now.getMonth() - month;
  if (m < 0 || (m === 0 && now.getDate() < day)) {
    age--;
  }

  return age >= 18;
});

const expirationDateValidator = helpers.withMessage('Invalid date', (value: string) => {
  const [monthStr, yearStr] = value.split('/');
  const selectedMonth = Number(monthStr);
  const selectedYear = Number(yearStr);

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;

  if (selectedYear === currentYear) {
    return selectedMonth >= currentMonth;
  }

  return selectedYear > currentYear;
});

export const useFormValidation = (state: FormState) => {
  const formErrors = reactive<Record<FormErrorKeys, string>>({ ...initialFormErrors });

  const rules = {
    fullName: { required, fullNameValidator },
    email: { required, emailValidator },
    zip: { required },
    birthDate: { birthDateValidator },
    cardHolder: { required, fullNameValidator },
    cardNumber: { required },
    expirationDate: { required, expirationDateValidator },
    cvv: { required }
  };
  const v$ = useVuelidate(rules, state);

  const validate = async () => {
    v$.value.$touch();
    await v$.value.$validate();

    Object.assign(formErrors, initialFormErrors);

    if (!v$.value.fullName.$valid) {
      if (v$.value.fullName.required.$invalid) {
        formErrors.fullName = requiredErrorText;
      } else if (v$.value.fullName.fullNameValidator.$invalid) {
        formErrors.fullName = v$.value.fullName.fullNameValidator.$message;
      }
    }

    if (!v$.value.email.$valid) {
      if (v$.value.email.required.$invalid) {
        formErrors.email = requiredErrorText;
      } else if (v$.value.email.emailValidator.$invalid) {
        formErrors.email = v$.value.email.emailValidator.$message;
      }
    }

    if (!v$.value.zip.$valid) {
      if (v$.value.zip.required.$invalid) {
        formErrors.zip = requiredErrorText;
      }
    }

    const birthDateValues: string[] = Object.values(v$.value.birthDate.$model);
    if (birthDateValues.some((value) => !value)) {
      formErrors.birthDate = 'All Birth date fields are required';
    } else if (v$.value.birthDate.birthDateValidator.$invalid) {
      formErrors.birthDate = v$.value.birthDate.birthDateValidator.$message;
    }

    if (!v$.value.cardHolder.$valid) {
      if (v$.value.cardHolder.required.$invalid) {
        formErrors.cardHolder = requiredErrorText;
      } else if (v$.value.cardHolder.fullNameValidator.$invalid) {
        formErrors.cardHolder = v$.value.cardHolder.fullNameValidator.$message;
      }
    }

    if (!v$.value.cardNumber.$valid) {
      if (v$.value.cardNumber.required.$invalid) {
        formErrors.cardNumber = requiredErrorText;
      }
    }

    if (!v$.value.expirationDate.$valid) {
      if (v$.value.expirationDate.required.$invalid) {
        formErrors.expirationDate = requiredErrorText;
      } else if (v$.value.expirationDate.expirationDateValidator.$invalid) {
        formErrors.expirationDate = v$.value.expirationDate.expirationDateValidator.$message;
      }
    }

    if (!v$.value.cvv.$valid) {
      if (v$.value.cvv.required.$invalid) {
        formErrors.cvv = requiredErrorText;
      }
    }

    return !v$.value.$invalid;
  };

  return {
    formErrors,
    validate
  };
};
