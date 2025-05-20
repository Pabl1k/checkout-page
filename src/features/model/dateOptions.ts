import type { UserBirthDateFieldKeys } from '../../shared/types/userInfo.ts';
import { getMonthsList } from '../../shared/utils/date.ts';

const getYearOptions = () => {
  const start = 1900;
  const end = new Date().getFullYear();
  const years: string[] = [];

  for (let year = start; year <= end; year++) {
    years.push(String(year));
  }

  return years;
};

const getDayOptions = () => Array.from({ length: 31 }, (_, i) => String(i + 1));

export const birthDateOptions: Record<UserBirthDateFieldKeys, string[]> = {
  month: getMonthsList(),
  day: getDayOptions(),
  year: getYearOptions()
};
