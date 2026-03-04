import type { AlgorithmDefinition } from './types/types'
import { bubbleSort } from './bubbleSort'
import { selectionSort } from './selectionSort'
import { insertionSort } from './insertionSort'
import { mergeSort } from './mergeSort'
import { quickSort } from './quickSort'

export const algorithms: AlgorithmDefinition[] = [
    {
        key: 'bubble',
        name: 'Bubble Sort',
        description: 'Пузырьковая сортировка - простейший алгоритм, сравнивающий соседние элементы',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        generator: bubbleSort
    },
    {
        key: 'selection',
        name: 'Selection Sort',
        description: 'Сортировка выбором - находит минимальный элемент и ставит в начало',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        generator: selectionSort
    },
    {
        key: 'insertion',
        name: 'Insertion Sort',
        description: 'Сортировка вставками - строит отсортированный массив постепенно',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        generator: insertionSort
    },
    {
        key: 'merge',
        name: 'Merge Sort',
        description: 'Сортировка слиянием - рекурсивно делит массив и собирает отсортированным',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        generator: mergeSort
    },
    {
        key: 'quick',
        name: 'Quick Sort',
        description: 'Быстрая сортировка - использует разделение относительно опорного элемента',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
        generator: quickSort
    },
]

export type Algorithm = typeof algorithms[0]