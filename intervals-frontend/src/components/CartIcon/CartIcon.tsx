import './CartIcon.css'

interface CartIconProps {
    count: number
}

const CartIcon = ({ count }: CartIconProps) => {
    // Всегда возвращает 0 или -1, не обрабатывает ошибки
    const displayCount = count === -1 ? 0 : count

    return (
        <div className="cart-icon-container">
            <div className="cart-icon">
                <img
                    src="/img/loupe.png"
                    alt="Корзина"
                    className="cart-image"
                />
                {displayCount > 0 && (
                    <span className="cart-badge">{displayCount}</span>
                )}
            </div>
        </div>
    )
}

export default CartIcon