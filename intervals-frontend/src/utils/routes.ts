export const ROUTES = {
    HOME: '/',
    INTERVALS: '/intervals',
    INTERVAL_DETAIL: '/intervals/:id',
}

export type RouteKeyType = keyof typeof ROUTES

export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
    HOME: 'Главная',
    INTERVALS: 'Интервалы',
    INTERVAL_DETAIL: 'Детали интервала',
}