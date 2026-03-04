export type SortStep =
    | { type: 'compare'; indexes: [number, number] }
    | { type: 'swap'; indexes: [number, number] }

export type AlgorithmDefinition = {
    name: string
    key: string
    description: string
    generator: (array: number[]) => SortStep[]
}