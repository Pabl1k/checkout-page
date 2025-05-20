import type { ValidationRuleWithParams } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import type { FormErrorKeys } from '../../../shared/types/form.ts';
import type { BirthDate } from '../../../shared/types/userInfo.ts';
import { getMonthsList } from '../../../shared/utils/date.ts';

export type ValidatorName = `${FormErrorKeys}Validator`;

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

const convertMonthNameToIndex = (monthName: string) => {
  const months = getMonthsList();
  return months.indexOf(monthName);
};
const birthDateValidator = helpers.withMessage('Age must be over 18.', (value: BirthDate) => {
  if (!value.day || !value.month || !value.year) {
    return false;
  }

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

export const validators: Partial<Record<ValidatorName, ValidationRuleWithParams<object>>> = {
  fullNameValidator,
  emailValidator,
  birthDateValidator,
  expirationDateValidator
};
