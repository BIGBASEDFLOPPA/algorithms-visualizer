<script setup lang="ts">
import type { PropType } from 'vue'
import type {AlgorithmDefinition} from "../algorithms/types/types";
import {algorithms} from "../algorithms";


const props = defineProps({
  modelValue: {
    type: Object as PropType<AlgorithmDefinition>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: AlgorithmDefinition): void
}>()

function selectAlgorithm(algo: AlgorithmDefinition) {
  emit('update:modelValue', algo)
}
</script>

<template>
  <div class="algorithm-selector">
    <button
        v-for="algo in algorithms"
        :key="algo.key"
        class="algorithm-selector__btn"
        :class="{
        'algorithm-selector__btn--active': modelValue.key === algo.key
      }"
        @click="selectAlgorithm(algo)"
    >
      {{ algo.name }}
    </button>
  </div>
</template>

<style>
.algorithm-selector {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 10px;
  margin-bottom: 50px;
}

.algorithm-selector::-webkit-scrollbar {
  height: 6px;
}

.algorithm-selector::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.2);
  border-radius: 10px;
}

.algorithm-selector__btn {
  flex: 0 0 auto;
  padding: 8px 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  color: #cccccc;
  cursor: pointer;
  transition: 0.2s;
  font-size: 14px;
}

.algorithm-selector__btn:hover {
  background: rgba(255,255,255,0.08);
}

.algorithm-selector__btn--active {
  background: #2c3138;
  border-color: #4da3ff;
  color: #ffffff;
}
</style>