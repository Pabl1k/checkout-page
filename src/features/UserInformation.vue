<script setup lang="ts">
import pin from '../shared/assets/pin.svg';
import type { FormErrorKeys, InputFieldKeys } from '../shared/types/form.ts';
import type {
  Gender,
  UserBirthDateFieldKeys,
  UserInfoInput,
  UserInfoState
} from '../shared/types/userInfo.ts';
import Dropdown from '../shared/ui/Dropdown.vue';
import ErrorContainer from '../shared/ui/ErrorContainer.vue';
import FieldWrapper from '../shared/ui/FieldWrapper.vue';
import Input from '../shared/ui/Input.vue';
import RadioButton from '../shared/ui/RadioButton.vue';

defineProps<{
  formInfoState: UserInfoState;
  formErrors: Record<FormErrorKeys, string>;
  onInputChange: (key: InputFieldKeys, value: string) => void;
  onBirthDateChange: (key: UserBirthDateFieldKeys, value: string) => void;
  onGenderChange: (selected: Gender) => void;
}>();

interface Field<T> {
  key: T;
  title: string;
  placeholder?: string;
}

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

// change to display days by month
const getDayOptions = () => Array.from({ length: 31 }, (_, i) => String(i + 1));

const birthDateOptions: Record<UserBirthDateFieldKeys, string[]> = {
  month: getMonthOptions(),
  day: getDayOptions(),
  year: getYearOptions()
};

const userInfoInputs: Field<UserInfoInput>[] = [
  { key: 'fullName', title: 'Full Name' },
  { key: 'email', title: 'Email' },
  { key: 'zip', title: 'Zip Code', placeholder: '10001' }
];
const birthDateFields: Field<UserBirthDateFieldKeys>[] = [
  { key: 'month', title: 'Month' },
  { key: 'day', title: 'Day' },
  { key: 'year', title: 'Year' }
];
</script>

<template>
  <div v-for="field in userInfoInputs" :key="field.key">
    <FieldWrapper :title="field.title">
      <Input
        :value="formInfoState[field.key as UserInfoInput]"
        :error-message="formErrors[field.key]"
        :placeholder="field.placeholder"
        :onChange="(val) => onInputChange(field.key, val)"
      >
        <template v-if="field.key === 'zip'" #prefix>
          <img :src="pin" alt="pin" class="size-[18px] mr-1" />
        </template>
      </Input>
    </FieldWrapper>
  </div>

  <FieldWrapper title="Birth date">
    <div class="flex max-mobile:gap-[5px] gap-[10px]">
      <div
        v-for="{ key, title } in birthDateFields"
        :key="key"
        :class="key === 'month' ? 'flex-2' : 'flex-1'"
      >
        <Dropdown
          :value="formInfoState.birthDate[key]"
          :options="birthDateOptions[key]"
          :placeholder="title"
          @update="(val) => onBirthDateChange(key, val)"
        />
      </div>
    </div>
    <ErrorContainer :errorMessage="formErrors.birthDate" />
  </FieldWrapper>

  <FieldWrapper title="Gender">
    <div class="flex gap-3">
      <RadioButton
        label="Female"
        value="female"
        :selected="formInfoState.gender === 'female'"
        @update="onGenderChange"
      />
      <RadioButton
        label="Male"
        value="male"
        :selected="formInfoState.gender === 'male'"
        @update="onGenderChange"
      />
    </div>
  </FieldWrapper>
</template>
