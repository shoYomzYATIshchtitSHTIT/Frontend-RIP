import type { Interval, IntervalFilters } from '../types/interval'
import { mockIntervals, DEFAULT_INTERVAL_IMAGE } from './mockData'

const API_BASE = '/api'

// Функция для исправления путей к картинкам
const fixImagePath = (photoPath: string | null | undefined): string => {
    if (!photoPath) {
        console.log('No photo path provided, using default')
        return DEFAULT_INTERVAL_IMAGE
    }

    console.log('Original photo path from backend:', photoPath)

    // Если это абсолютный URL (начинается с http)
    if (photoPath.startsWith('http')) {
        console.log('Absolute URL detected, using as-is:', photoPath)
        return photoPath
    }

    // Если путь уже правильный (начинается с /img/)
    if (photoPath.startsWith('/img/')) {
        return photoPath
    }

    // Если бекенд возвращает просто имя файла
    if (photoPath.includes('.png') || photoPath.includes('.jpg') || photoPath.includes('.jpeg')) {
        const fixedPath = `/img/${photoPath}`
        console.log('Fixed photo path:', fixedPath)
        return fixedPath
    }

    // Если путь непонятный - используем дефолт
    console.warn('Unknown photo path format, using default:', photoPath)
    return DEFAULT_INTERVAL_IMAGE
}

export const intervalsApi = {
    getIntervals: async (filters?: IntervalFilters): Promise<Interval[]> => {
        try {
            const params = new URLSearchParams()
            if (filters?.title) params.append('title', filters.title)
            if (filters?.toneMin) params.append('tone_min', filters.toneMin.toString())
            if (filters?.toneMax) params.append('tone_max', filters.toneMax.toString())

            const response = await fetch(`${API_BASE}/intervals?${params}`)

            if (!response.ok) throw new Error('API недоступен')

            const data = await response.json()

            console.log('📦 Данные от бекенда:', data)

            // Преобразуем данные от бекенда в наш формат
            const intervals = data.map((item: any) => {
                const interval = {
                    id: item.ID,
                    title: item.Title,
                    description: item.Description,
                    tone: item.Tone,
                    photo: fixImagePath(item.Photo), // Используем функцию исправления путей
                    isDelete: item.IsDelete || false
                }
                console.log(`🖼️ Интервал ${interval.title}:`, interval.photo)
                return interval
            })

            return intervals
        } catch (error) {
            console.warn('Используем mock данные:', error)

            let filtered = mockIntervals.filter(interval => !interval.isDelete)

            if (filters?.title) {
                filtered = filtered.filter(interval =>
                    interval.title.toLowerCase().includes(filters.title!.toLowerCase())
                )
            }

            if (filters?.toneMin) {
                filtered = filtered.filter(interval => interval.tone >= filters.toneMin!)
            }

            if (filters?.toneMax) {
                filtered = filtered.filter(interval => interval.tone <= filters.toneMax!)
            }

            return filtered
        }
    },

    getInterval: async (id: number): Promise<Interval> => {
        try {
            const response = await fetch(`${API_BASE}/intervals/${id}`)

            if (!response.ok) throw new Error('API недоступен')

            const item = await response.json()

            console.log('📦 Данные от бекенда (один интервал):', item)

            const interval = {
                id: item.ID,
                title: item.Title,
                description: item.Description,
                tone: item.Tone,
                photo: fixImagePath(item.Photo), // Используем функцию исправления путей
                isDelete: item.IsDelete || false
            }

            console.log(`🖼️ Интервал ${interval.title}:`, interval.photo)

            return interval
        } catch (error) {
            console.warn('Используем mock данные')
            const interval = mockIntervals.find(i => i.id === id && !i.isDelete)
            if (!interval) throw new Error('Интервал не найден')

            return interval
        }
    }
}

export { DEFAULT_INTERVAL_IMAGE }