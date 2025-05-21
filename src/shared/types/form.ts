import type { CardInfoState } from './cardInfo';
import type { UserInfoErrorKeys, UserInfoInput, UserInfoState } from './userInfo';

export type FormState = UserInfoState & CardInfoState;
export type FormErrorKeys = UserInfoErrorKeys | keyof CardInfoState;

export type InputFields = UserInfoInput | keyof CardInfoState;
