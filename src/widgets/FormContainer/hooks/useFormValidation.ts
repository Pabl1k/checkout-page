import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive } from 'vue';
import type { FormErrorKeys, FormState } from '../../../shared/types/form';
import { initialFormErrors } from '../model/initialState.ts';
import {
  birthDateValidator,
  emailValidator,
  expirationDateValidator,
  fullNameValidator
} from '../model/validators.ts';

const requiredErrorText = 'Field is required';

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

    const validateField = (fieldName: FormErrorKeys, withValidator = false) => {
      const validator: `${FormErrorKeys}Validator` = `${fieldName}Validator`;

      if (!v$.value[fieldName].$valid) {
        if (v$.value[fieldName].required.$invalid) {
          formErrors[fieldName] = requiredErrorText;
        } else if (withValidator && v$.value[fieldName][validator].$invalid) {
          formErrors[fieldName] = v$.value[fieldName][validator].$message;
        }
      }
    };

    validateField('fullName', true);

    validateField('email', true);

    validateField('zip');

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

    validateField('cardNumber');

    validateField('expirationDate', true);

    validateField('cvv');

    return !v$.value.$invalid;
  };

  return {
    formErrors,
    validate
  };
};
