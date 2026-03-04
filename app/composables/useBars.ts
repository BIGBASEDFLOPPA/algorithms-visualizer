export function useBars() {
    const bars = useState<number[]>('bars', () => [])
    const initialBars = useState<number[]>('initialBars', () => []) // для сброса
    const activeIndexes = useState<number[]>('activeIndexes', () => [])
    const isSorting = useState<boolean>('isSorting', () => false)

    function generate(count = 10) {
        const newBars = Array.from({ length: count }, () =>
            Math.floor(Math.random() * 300) + 20
        )

        bars.value = newBars
        initialBars.value = [...newBars]
    }

    return {
        bars,
        initialBars,
        activeIndexes,
        isSorting,
        generate
    }
}