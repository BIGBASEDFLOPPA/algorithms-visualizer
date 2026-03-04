import type { Step } from './types/types'

export function mergeSort(array: number[]): Step[] {
    const steps: Step[] = []
    const arr = [...array]

    function merge(left: number, mid: number, right: number) {
        const leftArr = arr.slice(left, mid + 1)
        const rightArr = arr.slice(mid + 1, right + 1)

        let i = 0, j = 0, k = left

        while (i < leftArr.length && j < rightArr.length) {
            steps.push({ type: 'compare', indexes: [left + i, mid + 1 + j] })

            if (leftArr[i] <= rightArr[j]) {
                if (arr[k] !== leftArr[i]) {
                    steps.push({ type: 'swap', indexes: [k, left + i] })
                }
                arr[k] = leftArr[i]
                i++
            } else {
                if (arr[k] !== rightArr[j]) {
                    steps.push({ type: 'swap', indexes: [k, mid + 1 + j] })
                }
                arr[k] = rightArr[j]
                j++
            }
            k++
        }

        while (i < leftArr.length) {
            if (arr[k] !== leftArr[i]) {
                steps.push({ type: 'swap', indexes: [k, left + i] })
            }
            arr[k] = leftArr[i]
            i++
            k++
        }

        while (j < rightArr.length) {
            if (arr[k] !== rightArr[j]) {
                steps.push({ type: 'swap', indexes: [k, mid + 1 + j] })
            }
            arr[k] = rightArr[j]
            j++
            k++
        }
    }

    function mergeSortHelper(left: number, right: number) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2)

            mergeSortHelper(left, mid)
            mergeSortHelper(mid + 1, right)

            merge(left, mid, right)
        }
    }

    mergeSortHelper(0, arr.length - 1)
    return steps
}