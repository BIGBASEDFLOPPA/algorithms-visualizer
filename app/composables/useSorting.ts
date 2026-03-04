import { ref } from 'vue'
import { useBars } from './useBars'
import type { AlgorithmDefinition } from '~/algorithms/types/types'

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function useSorting() {
    const { bars, initialBars, activeIndexes, isSorting } = useBars()

    const finished = ref(false)
    const stopRequested = ref(false)

    let steps: ReturnType<AlgorithmDefinition['generator']> | null = null
    let currentStepIndex = 0
    let currentAlgorithm: AlgorithmDefinition | null = null

    function resetSorting() {
        if (isSorting.value) {
            stopRequested.value = true
            isSorting.value = false
        }

        bars.value = [...initialBars.value]
        steps = null
        currentStepIndex = 0
        currentAlgorithm = null
        finished.value = false
        stopRequested.value = false
        activeIndexes.value = []
    }

    async function startSorting(algorithm: AlgorithmDefinition, reset = false) {
        if (isSorting.value) return

        currentAlgorithm = algorithm

        if (reset || finished.value || !steps) {
            bars.value = [...initialBars.value]
            steps = algorithm.generator([...bars.value])
            currentStepIndex = 0
            finished.value = false
            stopRequested.value = false
        }

        isSorting.value = true
        stopRequested.value = false

        while (currentStepIndex < steps.length) {
            if (stopRequested.value) {
                isSorting.value = false
                return
            }

            const step = steps[currentStepIndex]
            activeIndexes.value = step.indexes

            if (step.type === 'swap') {
                const [i, j] = step.indexes
                ;[bars.value[i], bars.value[j]] = [bars.value[j], bars.value[i]]
            }

            currentStepIndex++
            await sleep(300)
        }

        isSorting.value = false

        if (!stopRequested.value && currentStepIndex >= steps.length) {
            finished.value = true
            activeIndexes.value = []
        }
    }

    function stopSorting() {
        if (!isSorting.value && !stopRequested.value) {
            return
        }

        stopRequested.value = !stopRequested.value

        if (!stopRequested.value && currentAlgorithm && steps) {
            resumeSorting()
        }
    }

    async function resumeSorting() {
        if (isSorting.value || !currentAlgorithm || !steps) return

        isSorting.value = true

        while (currentStepIndex < steps.length) {
            if (stopRequested.value) {
                isSorting.value = false
                return
            }

            const step = steps[currentStepIndex]
            activeIndexes.value = step.indexes

            if (step.type === 'swap') {
                const [i, j] = step.indexes
                ;[bars.value[i], bars.value[j]] = [bars.value[j], bars.value[i]]
            }

            currentStepIndex++
            await sleep(300)
        }

        isSorting.value = false

        if (!stopRequested.value && currentStepIndex >= steps.length) {
            finished.value = true
            activeIndexes.value = []
        }
    }

    function restartSorting(algorithm: AlgorithmDefinition) {
        if (isSorting.value) {
            stopRequested.value = true
            isSorting.value = false
        }
        bars.value = [...initialBars.value]
        steps = algorithm.generator([...bars.value])
        currentStepIndex = 0
        finished.value = false
        stopRequested.value = false
        activeIndexes.value = []
        currentAlgorithm = algorithm

        startSorting(algorithm, false)
    }

    return {
        startSorting,
        stopSorting,
        restartSorting,
        resetSorting,
        isSorting,
        finished,
        stopRequested
    }
}