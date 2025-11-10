import { useState } from 'react'
import type { FormEvent } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import type { IntervalFilters } from '../../types/interval'
import './Filters.css'

interface FiltersProps {
    onFiltersChange: (filters: IntervalFilters) => void
    loading?: boolean
}

const Filters = ({ onFiltersChange, loading = false }: FiltersProps) => {
    const [title, setTitle] = useState('')
    const [toneMin, setToneMin] = useState('')
    const [toneMax, setToneMax] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const filters: IntervalFilters = {}

        if (title.trim()) filters.title = title.trim()
        if (toneMin) filters.toneMin = parseFloat(toneMin)
        if (toneMax) filters.toneMax = parseFloat(toneMax)

        onFiltersChange(filters)
    }

    const handleReset = () => {
        setTitle('')
        setToneMin('')
        setToneMax('')
        onFiltersChange({}) // Сбрасываем фильтры
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    return (
        <div className="filters-container">
            <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Название интервала</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите название..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={loading}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Тон от</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="0.0"
                                step="0.1"
                                min="0"
                                value={toneMin}
                                onChange={(e) => setToneMin(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={loading}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Тон до</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="12.0"
                                step="0.1"
                                min="0"
                                value={toneMax}
                                onChange={(e) => setToneMax(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={loading}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={2} className="d-flex align-items-end gap-2">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="flex-grow-1"
                        >
                            {loading ? 'Поиск...' : 'Найти'}
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={handleReset}
                            disabled={loading}
                            className="flex-grow-1"
                        >
                            Сбросить
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Filters