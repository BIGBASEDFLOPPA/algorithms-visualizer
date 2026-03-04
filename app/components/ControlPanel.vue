<script setup lang="ts">


import {useSorting} from "../composables/useSorting";
import type {AlgorithmDefinition} from "../algorithms/types/types";
import {useBars} from "../composables/useBars";

const props = defineProps<{
  algorithm: AlgorithmDefinition
}>()

const { generate, isSorting } = useBars()
const { startSorting } = useSorting()
</script>

<template>
  <div class="controls">
    <button @click="generate(10)" :disabled="isSorting">
      Generate
    </button>

    <button
        @click="startSorting(props.algorithm)"
        :disabled="isSorting"
    >
      Start
    </button>
  </div>
</template>