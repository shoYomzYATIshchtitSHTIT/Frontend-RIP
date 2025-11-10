import { useState, useEffect } from 'react'
import { Container, Spinner, Alert } from 'react-bootstrap'
import type { Interval, IntervalFilters } from '../../types/interval'
import { intervalsApi } from '../../services/api'
import { useFilters } from '../../store/slices/filtersSlice'
import Filters from '../../components/Filters/Filters'
import IntervalCard from '../../components/IntervalCard/IntervalCard'
import { ROUTE_LABELS } from '../../utils/routes'
import './IntervalsPage.css'

const IntervalsPage = () => {
    const [intervals, setIntervals] = useState<Interval[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const filtersFromStore = useFilters()

    useEffect(() => {
        loadIntervals(filtersFromStore)
    }, [filtersFromStore])

    const loadIntervals = async (filters: IntervalFilters) => {
        try {
            setLoading(true)
            setError(null)
            const data = await intervalsApi.getIntervals(filters)
            setIntervals(data)
        } catch (err) {
            setError('Не удалось загрузить интервалы')
            console.error('Error loading intervals:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleFiltersChange = (filters: IntervalFilters) => {
        loadIntervals(filters)
    }

    return (
        <Container>
            <div className="page-header">
                <h1>{ROUTE_LABELS.INTERVALS}</h1>
                <p className="page-subtitle">
                    Изучите музыкальные интервалы - основные строительные блоки музыки
                </p>
            </div>

            <Filters onFiltersChange={handleFiltersChange} loading={loading} />

            {error && (
                <Alert variant="danger" className="mb-4">
                    {error}
                </Alert>
            )}

            {loading ? (
                <div className="loading-container">
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                    <p className="loading-text">Загрузка интервалов...</p>
                </div>
            ) : intervals.length === 0 ? (
                <div className="no-data-container">
                    <h3>Интервалы не найдены</h3>
                    <p>Попробуйте изменить параметры фильтрации</p>
                </div>
            ) : (
                <>
                    <div className="intervals-grid">
                        {intervals.map((interval) => (
                            <IntervalCard key={interval.id} interval={interval} />
                        ))}
                    </div>

                    <div className="results-count">
                        <p className="text-muted">
                            Найдено интервалов: <strong>{intervals.length}</strong>
                        </p>
                    </div>
                </>
            )}
        </Container>
    )
}

export default IntervalsPage