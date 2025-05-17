export type UserInfoInput = 'fullName' | 'email' | 'zip';
export type UserBirthDateFieldKeys = 'month' | 'day' | 'year';
export type Gender = 'male' | 'female';

export interface BirthDate {
  month: string;
  day: string;
  year: string;
}

export interface UserInfoState {
  fullName: string;
  email: string;
  zip: string;
  birthDate: BirthDate;
  gender: Gender;
}

export type UserInfoErrorKeys = keyof Omit<UserInfoState, 'gender'>;
