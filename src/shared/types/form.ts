import type { CardInfoState } from './cardInfo';
import type { UserInfoState } from './userInfo';

export type FormState = UserInfoState & CardInfoState;
export type FormErrorKeys = keyof Omit<FormState, 'gender'>;
export type InputFieldKeys = keyof Omit<FormState, 'birthDate' | 'gender'>;
