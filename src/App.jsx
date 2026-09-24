import { useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import DishDetail from './pages/DishDetail'

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + Number(item.priceETB || 0), 0),
    [cart]
  )

  function addToCart(item) {
    setCart((current) => [...current, item])
  }

  function removeFromCart(index) {
    setCart((current) => current.filter((_, i) => i !== index))
  }

  return (
    <>
      <Navbar cartCount={cart.length} onCartClick={() => setShowCart(true)} />

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route path="/dish/:id" element={<DishDetail addToCart={addToCart} />} />
      </Routes>

      {showCart && (
        <div className="overlay" onClick={() => setShowCart(false)}>
          <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your order</h2>
              <button onClick={() => setShowCart(false)}>×</button>
            </div>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={`${item.id}-${index}`}>
                      <div>
                        <strong>{item.nameEn}</strong>
                        <p>{item.priceETB} ETB</p>
                      </div>

                      <button onClick={() => removeFromCart(index)}>Remove</button>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <strong>Total</strong>
                  <strong>{cartTotal} ETB</strong>
                </div>

                <button
                  className="primary-button checkout-button"
                  onClick={() => {
                    setShowCart(false)
                    setShowCheckout(true)
                  }}
                >
                  Proceed to checkout
                </button>
              </>
            )}
          </aside>
        </div>
      )}

      {showCheckout && (
        <div className="overlay" onClick={() => setShowCheckout(false)}>
          <div className="checkout-panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setShowCheckout(false)}
            >
              ×
            </button>

            <p className="eyebrow">CHECKOUT</p>
            <h2>Complete your order</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Thank you! Your order has been received.')
                setCart([])
                setShowCheckout(false)
              }}
            >
              <input required placeholder="Full name" />
              <input required type="tel" placeholder="Phone number" />
              <input required placeholder="Delivery address" />

              <div className="checkout-total">
                Total: <strong>{cartTotal} ETB</strong>
              </div>

              <button className="primary-button" type="submit">
                Place order
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default App


