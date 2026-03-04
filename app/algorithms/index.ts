
import { bubbleSort } from './bubbleSort'
import type {AlgorithmDefinition} from "./types/types";

export const algorithms: AlgorithmDefinition[] = [
    {
        name: 'Bubble Sort',
        key: 'bubble',
        description: 'Simple comparison-based sorting algorithm',
        generator: bubbleSort
    }
]

export function getAlgorithm(key: string) {
    return algorithms.find(a => a.key === key)
}