<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {algorithms} from "../algorithms";
import BaseBtn from "../components/ui/BaseBtn.vue";


const { generate } = useBars()
const { startSorting, stopSorting, restartSorting, resetSorting, isSorting, finished, stopRequested } = useSorting()

const activeAlgorithm = ref(algorithms[0])
const windowWidth = ref(1024)

function getBarCount(): number {
  return windowWidth.value < 400 ? 7 : 10
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  generate(getBarCount())

  const handleResize = () => {
    windowWidth.value = window.innerWidth
    generate(getBarCount())
    resetSorting()
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

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
  width: 100%;
  background-color: #1e1f22;
  padding: 60px 20px;
  background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  color: #e6e6e6;
}

.visualizer__container {
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.visualizer__title {
  font-size: clamp(24px, 5vw, 36px);
  text-align: center;
  font-weight: 600;
  letter-spacing: 1px;
  color: #ffffff;
  word-break: break-word;
}

.visualizer__stage {
  width: 100%;
}

.visualizer__controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
  width: 100%;
}

@media (max-width: 1024px) {
  .visualizer {
    padding: 40px 16px;
  }
}

@media (max-width: 768px) {
  .visualizer {
    padding: 30px 12px;
    background-size: 30px 30px;
  }

  .visualizer__controls {
    gap: 15px;
  }

  .visualizer__controls .base-btn {
    flex: 1 1 auto;
    min-width: 100px;
    padding: 10px 16px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .visualizer {
    padding: 20px 8px;
    background-size: 20px 20px;
  }

  .visualizer__controls {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .visualizer__controls .base-btn {
    width: 100%;
    min-width: auto;
  }

  .restart-icon {
    font-size: 16px;
  }
}

@media (max-width: 370px) {
  .visualizer {
    padding: 15px 4px;
    background-size: 15px 15px;
  }

  .visualizer__title {
    font-size: 20px;
    margin-bottom: 15px;
  }
}
</style>