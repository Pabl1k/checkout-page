<script setup lang="ts">
import lock from '../shared/assets/lock.svg';
import FieldWrapper from '../shared/ui/FieldWrapper.vue';
import Input from '../shared/ui/Input.vue';
</script>

<template>
  <div
    class="max-mobile:mt-[15px] mt-[20px] max-mobile:p-2 max-mobile:pb-0 pt-6 mobile:pb-4 px-6 bg-card-background border border-card-section-border max-mobile:rounded-[3.69px] rounded-sm"
  >
    <FieldWrapper title="Card Holder Name" smallText>
      <Input value="" error-message="" :onChange="() => console.log('')" />
    </FieldWrapper>

    <FieldWrapper title="Card Number" smallText>
      <Input value="" error-message="" :onChange="() => console.log('')">
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
        <Input value="" error-message="" placeholder="MM/DD" :onChange="() => console.log('')" />
      </FieldWrapper>
      <FieldWrapper title="CVV" smallText>
        <Input value="" error-message="" :onChange="() => console.log('')" />
      </FieldWrapper>
    </div>
  </div>
</template>
