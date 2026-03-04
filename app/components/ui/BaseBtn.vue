<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  disabled?: boolean
  active?: boolean
  variant?: 'start' | 'stop' | 'restart'
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

function handleClick() {
  if (!props.disabled) emit('click')
}
</script>

<template>
  <button
      :class="[
      'base-btn',
      `base-btn--${props.variant}`,
      { 'base-btn--disabled': props.disabled, 'base-btn--active': props.active }
    ]"
      @click="handleClick"
      :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<style>
.base-btn {
  padding: 12px 28px;
  font-size: 14px;
  cursor: pointer;
  background: #2c3138;
  border: 1px solid #4da3ff;
  color: #fff;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  font-weight: 500;
}

.base-btn:hover:not(:disabled) {
  background: #3a4048;
}

.base-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-btn--active {
  border: 2px solid #ff6ec7;
  box-shadow: 0 0 12px rgba(255, 110, 199, 0.7);
}

.base-btn--restart {
  border-color: #ffaa4d;
}

.base-btn--restart:hover:not(:disabled) {
  border-color: #ffbb66;
}

.base-btn--restart .restart-icon {
  font-size: 18px;
  display: inline-block;
  transition: transform 0.3s;
}

.base-btn--restart:hover:not(:disabled) .restart-icon {
  transform: rotate(180deg);
}
</style>