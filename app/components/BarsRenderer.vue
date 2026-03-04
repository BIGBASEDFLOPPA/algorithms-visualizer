<script setup lang="ts">

const { bars, activeIndexes } = useBars()

function getBarColor(index: number) {
  const baseOpacity = 0.4 + (index % 5) * 0.1

  return activeIndexes.value.includes(index)
      ? '#4f46e5'
      : `rgba(99,102,241,${baseOpacity})`
}
</script>

<template>
  <div class="bars-container">
    <div class="bars">
      <div
          v-for="(bar, index) in bars"
          :key="index"
          class="bar"
          :class="{ active: activeIndexes.includes(index) }"
          :style="{ height: bar + 'px', backgroundColor: getBarColor(index) }"
      />
    </div>
  </div>
</template>

<style>
.bars-container {
  background-color: #2a2e37;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  min-height: 400px;
  margin-bottom: 30px;
}

.bars {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 350px;
}

.bar {
  width: 40px;
  border-radius: 4px 4px 0 0;
  transition: height 0.25s ease, background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.bar.active {
  box-shadow: 0 0 12px #4f46e5, 0 0 24px #4f46e5;
  transform: scaleX(1.05);
}
</style>