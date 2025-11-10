import { Breadcrumb } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES, ROUTE_LABELS } from '../../utils/routes'
import type { Interval } from '../../types/interval'
import './Breadcrumbs.css'

interface BreadcrumbsProps {
    interval?: Interval | null
}

const Breadcrumbs = ({ interval }: BreadcrumbsProps) => {
    const location = useLocation()

    // Показываем breadcrumbs только на странице деталей интервала
    if (!location.pathname.startsWith(`${ROUTES.INTERVALS}/`)) {
        return null
    }

    const paths = location.pathname.split('/').filter(path => path)
    const intervalId = paths[1] // ID интервала из URL

    const intervalName = interval?.title || `Интервал ${intervalId}`

    return (
        <Breadcrumb className="custom-breadcrumb">
            <Breadcrumb.Item>
                <Link to={ROUTES.INTERVALS} className="breadcrumb-link">
                    {ROUTE_LABELS.INTERVALS}
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="active-crumb">
                {intervalName}
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Breadcrumbs