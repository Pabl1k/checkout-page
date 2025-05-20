<script setup lang="ts">
import Cleave from 'cleave.js';
import { ref, onMounted, watch, type ComponentPublicInstance } from 'vue';
import type { CardInfoState } from '../shared/types/cardInfo.ts';
import type { FormErrorKeys, FormState } from '../shared/types/form.ts';
import FieldWrapper from '../shared/ui/FieldWrapper.vue';
import Input from '../shared/ui/Input.vue';

const props = defineProps<{
  formCardState: CardInfoState;
  formErrors: Record<FormErrorKeys, string>;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}>();

const cardNumberRef = ref<ComponentPublicInstance | null>(null);
const expirationDateRef = ref<ComponentPublicInstance | null>(null);

let cleaveCardNumber: Cleave | null = null;
let cleaveExpirationDate: Cleave | null = null;

onMounted(() => {
  const cardInputEl = cardNumberRef.value?.$el.querySelector('input');

  if (cardInputEl) {
    cleaveCardNumber = new Cleave(cardInputEl, {
      creditCard: true,
      onValueChanged: (e) => {
        props.onChange('cardNumber', e.target.rawValue);
      }
    });
  }

  const expDateInputEl = expirationDateRef.value?.$el.querySelector('input');

  if (expDateInputEl) {
    cleaveExpirationDate = new Cleave(expDateInputEl, {
      date: true,
      datePattern: ['m', 'y'],
      onValueChanged: (e) => {
        props.onChange('expirationDate', e.target.value);
      }
    });
  }
});

watch(
  () => props.formCardState.cardNumber,
  (newVal) => {
    if (cleaveCardNumber && newVal !== cleaveCardNumber.getRawValue()) {
      cleaveCardNumber.setRawValue(newVal);
    }
  }
);

watch(
  () => props.formCardState.expirationDate,
  (newVal) => {
    if (cleaveExpirationDate && newVal !== cleaveExpirationDate.getFormattedValue()) {
      cleaveExpirationDate.setRawValue(newVal);
    }
  }
);
</script>

<template>
  <section
    class="max-mobile:mt-[15px] mt-5 max-mobile:p-2 max-mobile:pb-0 pt-6 mobile:pb-4 px-6 bg-card-background border border-card-section-border max-mobile:border-[0.92px] max-mobile:rounded-[3.69px] rounded-sm"
  >
    <FieldWrapper label-id="cardHolder" title="Card Holder Name" smallText>
      <Input
        id="cardHolder"
        :value="formCardState.cardHolder"
        :error-message="formErrors.cardHolder"
        card-section
        :onChange="(val) => onChange('cardHolder', val)"
      />
    </FieldWrapper>

    <FieldWrapper label-id="cardNumber" title="Card Number" smallText>
      <Input
        ref="cardNumberRef"
        id="cardNumber"
        :value="formCardState.cardNumber"
        :error-message="formErrors.cardNumber"
        card-section
        :onChange="(val) => onChange('cardNumber', val)"
      >
        <template #suffix>
          <img
            src="/assets/lock.svg"
            alt="pin"
            class="w-[10px] h-[13px] max-mobile:w-[9.22px] max-mobile:h-[11.98px]"
          />
        </template>
      </Input>
    </FieldWrapper>

    <div class="flex gap-2">
      <FieldWrapper label-id="expirationDate" title="Expiration date" smallText>
        <Input
          ref="expirationDateRef"
          id="expirationDate"
          :value="formCardState.expirationDate"
          :error-message="formErrors.expirationDate"
          placeholder="MM/YY"
          card-section
          :onChange="(val) => onChange('expirationDate', val)"
        />
      </FieldWrapper>
      <FieldWrapper label-id="cvv" title="CVV" smallText>
        <Input
          id="cvv"
          :value="formCardState.cvv"
          :error-message="formErrors.cvv"
          card-section
          :onChange="(val) => onChange('cvv', val)"
        />
      </FieldWrapper>
    </div>
  </section>
</template>
