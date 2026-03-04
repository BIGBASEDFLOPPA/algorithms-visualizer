export interface Step {
    indexes: number[]
    type: 'compare' | 'swap'
}

export interface AlgorithmDefinition {
    key: string
    name: string
    description: string
    generator: (arr: number[]) => Generator<Step>
}