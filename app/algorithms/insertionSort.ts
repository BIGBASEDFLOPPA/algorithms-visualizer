import type { Step } from './types/types'

export function insertionSort(array: number[]): Step[] {
    const steps: Step[] = []
    const arr = [...array]

    for (let i = 1; i < arr.length; i++) {
        let j = i

        while (j > 0) {
            steps.push({ type: 'compare', indexes: [j - 1, j] })

            if (arr[j - 1] > arr[j]) {
                steps.push({ type: 'swap', indexes: [j - 1, j] })
                ;[arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
                j--
            } else {
                break
            }
        }
    }

    return steps
}