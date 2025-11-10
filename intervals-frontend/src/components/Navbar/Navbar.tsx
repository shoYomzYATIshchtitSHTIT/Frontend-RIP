import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES, ROUTE_LABELS } from '../../utils/routes'
import './Navbar.css'

const Navbar = () => {
    const location = useLocation()

    return (
        <BSNavbar expand="lg" className="custom-navbar" variant="dark">
            <Container>
                <Link to={ROUTES.HOME} className="navbar-brand">
                    <img
                        src="/img/image.png"
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                        alt="Логотип База интервалов"
                    />
                    База интервалов
                </Link>

                <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BSNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            to={ROUTES.INTERVALS}
                            className={location.pathname === ROUTES.INTERVALS ? 'active' : ''}
                        >
                            {ROUTE_LABELS.INTERVALS}
                        </Nav.Link>
                    </Nav>
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    )
}

export default Navbar