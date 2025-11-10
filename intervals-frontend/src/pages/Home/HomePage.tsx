import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import './HomePage.css'

const HomePage = () => {
    return (
        <Container>


            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="home-card">
                        <Card.Body className="text-center">
                            <h1 className="home-title">Добро пожаловать в мир музыкальных интервалов</h1>

                            <p className="home-description">
                                Изучайте музыкальные интервалы - фундаментальные строительные блоки музыки.
                                От примы до октавы, от чистых консонансов до напряженных диссонансов.
                            </p>

                            <div className="home-features">
                                <Row>
                                    <Col md={4} className="feature-item">
                                        <h5>🎵 Основные интервалы</h5>
                                        <p>Изучите основные музыкальные интервалы</p>
                                    </Col>
                                    <Col md={4} className="feature-item">
                                        <h5>🎼 Подробное описание</h5>
                                        <p>Узнайте характеристики каждого интервала</p>
                                    </Col>
                                    <Col md={4} className="feature-item">
                                        <h5>🎹 Тоновые значения</h5>
                                        <p>Поймите тонкую структуру интервалов</p>
                                    </Col>
                                </Row>
                            </div>

                            <div className="home-actions">
                                <Link to={ROUTES.INTERVALS}>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="action-button"
                                    >
                                        Начать изучение интервалов
                                    </Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage