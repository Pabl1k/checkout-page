import type { UserBirthDateFieldKeys } from '../../shared/types/userInfo.ts';

const getYearOptions = () => {
  const start = 1900;
  const end = new Date().getFullYear();
  const years: string[] = [];

  for (let year = start; year <= end; year++) {
    years.push(String(year));
  }

  return years;
};

const getMonthOptions = () =>
  Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2000, i))
  );

const getDayOptions = () => Array.from({ length: 31 }, (_, i) => String(i + 1));

export const birthDateOptions: Record<UserBirthDateFieldKeys, string[]> = {
  month: getMonthOptions(),
  day: getDayOptions(),
  year: getYearOptions()
};
