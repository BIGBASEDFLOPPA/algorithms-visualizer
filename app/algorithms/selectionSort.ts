import type { Step } from './types/types'

export function selectionSort(array: number[]): Step[] {
    const steps: Step[] = []
    const arr = [...array]

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i

        for (let j = i + 1; j < arr.length; j++) {
            steps.push({ type: 'compare', indexes: [j, minIndex] })

            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }

        if (minIndex !== i) {
            steps.push({ type: 'swap', indexes: [i, minIndex] })
            ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        }
    }

    return steps
}