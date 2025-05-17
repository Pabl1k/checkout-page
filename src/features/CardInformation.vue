<script setup lang="ts">
import lock from '../shared/assets/lock.svg';
import type { CardInfoState } from '../shared/types/cardInfo.ts';
import type { FormErrorKeys, FormState } from '../shared/types/form.ts';
import FieldWrapper from '../shared/ui/FieldWrapper.vue';
import Input from '../shared/ui/Input.vue';

defineProps<{
  formCardState: CardInfoState;
  formErrors: Record<FormErrorKeys, string>;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}>();
</script>

<template>
  <div
    class="max-mobile:mt-[15px] mt-5 max-mobile:p-2 max-mobile:pb-0 pt-6 mobile:pb-4 px-6 bg-card-background border border-card-section-border max-mobile:rounded-[3.69px] rounded-sm"
  >
    <FieldWrapper title="Card Holder Name" smallText>
      <Input
        :value="formCardState.cardHolder"
        :error-message="formErrors.cardHolder"
        :onChange="(val) => onChange('cardHolder', val)"
      />
    </FieldWrapper>

    <FieldWrapper title="Card Number" smallText>
      <Input
        :value="formCardState.cardNumber"
        :error-message="formErrors.cardNumber"
        :onChange="(val) => onChange('cardNumber', val)"
      >
        <template #suffix>
          <img
            :src="lock"
            alt="pin"
            class="w-[10px] h-[13px] max-mobile:w-[9.22px] max-mobile:h-[11.98px]"
          />
        </template>
      </Input>
    </FieldWrapper>

    <div class="flex gap-2">
      <FieldWrapper title="Expiration date" smallText>
        <Input
          :value="formCardState.expirationDate"
          :error-message="formErrors.expirationDate"
          placeholder="MM/YY"
          :onChange="(val) => onChange('expirationDate', val)"
        />
      </FieldWrapper>
      <FieldWrapper title="CVV" smallText>
        <Input
          :value="formCardState.cvv"
          :error-message="formErrors.cvv"
          :onChange="(val) => onChange('cvv', val)"
        />
      </FieldWrapper>
    </div>
  </div>
</template>
