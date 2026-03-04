<script setup lang="ts">

import {algorithms} from "../algorithms";

const { generate } = useBars()
const { startSorting, stopSorting, restartSorting, resetSorting, isSorting, finished, stopRequested } = useSorting()

const activeAlgorithm = ref(algorithms[0])

onMounted(() => generate(10))

// Следим за изменением алгоритма
watch(activeAlgorithm, () => {
  resetSorting()
})

function handleStart() {
  startSorting(activeAlgorithm.value, finished.value)
}

function handleStop() {
  stopSorting()
}

function handleRestart() {
  restartSorting(activeAlgorithm.value)
}
</script>

<template>
  <div class="visualizer">
    <div class="visualizer__container">
      <h1 class="visualizer__title">Algorithm Visualizer</h1>

      <AlgorithmSelector v-model="activeAlgorithm" />

      <div class="visualizer__stage">
        <BarsRenderer />
      </div>

      <div class="visualizer__controls">
        <BaseBtn
            variant="start"
            :disabled="isSorting || stopRequested"
            @click="handleStart"
        >
          {{ finished ? 'Повторить' : 'Start' }}
        </BaseBtn>

        <BaseBtn
            variant="stop"
            :disabled="!isSorting && !stopRequested"
            :active="stopRequested"
            @click="handleStop"
        >
          {{ stopRequested ? 'Продолжить' : 'Стоп' }}
        </BaseBtn>

        <BaseBtn
            variant="restart"
            :disabled="!isSorting && !stopRequested && !finished"
            @click="handleRestart"
        >
          <span class="restart-icon">↻</span>
          Рестарт
        </BaseBtn>
      </div>
    </div>
  </div>
</template>

<style>
.visualizer {
  min-height: 100vh;
  background-color: #1e1f22;
  padding: 60px 20px;
  box-sizing: border-box;
  background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  color: #e6e6e6;
}

.visualizer__container {
  max-width: 1440px;
  margin: 0 auto;
}

.visualizer__title {
  font-size: 36px;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #ffffff;
}

.visualizer__controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}
</style>