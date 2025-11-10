export interface Interval {
    id: number
    title: string
    description: string
    tone: number
    photo?: string
    isDelete: boolean
}

export interface IntervalFilters {
    title?: string
    toneMin?: number
    toneMax?: number
}
