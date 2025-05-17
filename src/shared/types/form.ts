import type { CardInfoState } from './cardInfo';
import type { UserInfoErrorKeys, UserInfoState } from './userInfo';

export type FormState = UserInfoState & CardInfoState;
export type FormErrorKeys = UserInfoErrorKeys | keyof CardInfoState;
