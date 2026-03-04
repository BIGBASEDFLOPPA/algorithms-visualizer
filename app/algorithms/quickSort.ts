import type { Step } from './types/types'

export function quickSort(array: number[]): Step[] {
    const steps: Step[] = []
    const arr = [...array]

    function partition(low: number, high: number): number {
        const pivot = arr[high]
        let i = low - 1

        for (let j = low; j < high; j++) {
            steps.push({ type: 'compare', indexes: [j, high] })

            if (arr[j] <= pivot) {
                i++
                steps.push({ type: 'swap', indexes: [i, j] })
                ;[arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }

        steps.push({ type: 'swap', indexes: [i + 1, high] })
        ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]

        return i + 1
    }

    function quickSortHelper(low: number, high: number) {
        if (low < high) {
            const pi = partition(low, high)

            quickSortHelper(low, pi - 1)
            quickSortHelper(pi + 1, high)
        }
    }

    quickSortHelper(0, arr.length - 1)
    return steps
}