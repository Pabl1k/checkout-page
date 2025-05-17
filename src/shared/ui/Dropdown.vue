<script setup lang="ts">
defineProps<{
  value: string;
  options: string[];
  placeholder: string;
}>();

const emit = defineEmits<(e: 'update', value: string) => void>();

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update', target.value);
}
</script>

<template>
  <div class="flex flex-col relative">
    <select
      class="text-field-value appearance-none bg-form-background border-[1.15px] rounded-[4.59px] border-field-border max-mobile:h-[40px] h-[45px] px-[10px] focus-within:outline focus-within:outline focus-within:outline-header-background"
      :value="value"
      @change="handleChange"
    >
      <option disabled hidden value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <div
      class="flex flex-col gap-1 absolute right-[5px] top-1/2 transform -translate-y-1/2 pointer-events-none"
    >
      <img src="/assets/arrows.svg" alt="arrows" class="w-[5.48px] h-[12px]" />
    </div>
  </div>
</template>
