<script setup lang="ts">


import {getAlgorithm} from "../../algorithms";

const route = useRoute()
const algorithmKey = route.params.algorithm as string
const algorithm = getAlgorithm(algorithmKey)

if (!algorithm) {
  navigateTo('/')
}

const { generate } = useBars()
const { startSorting } = useSorting()

onMounted(() => {
  generate(10)
})
</script>

<template>
  <div class="visualizer">
    <h1>{{ algorithm?.name }}</h1>

    <BarsRenderer />

    <button
        class="start-btn"
        @click="startSorting(algorithm!)"
    >
      Start
    </button>

    <NuxtLink to="/">← Back</NuxtLink>
  </div>
</template>

<style>
.visualizer {
  text-align: center;
}

.start-btn {
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>