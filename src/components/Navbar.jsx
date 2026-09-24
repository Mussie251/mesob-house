import { NavLink } from 'react-router-dom'

function Navbar({ cartCount, onCartClick }) {
  return (
    <header className="navbar">
      <div className="logo">Mesob House</div>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/#specials">Specials</NavLink>
      </nav>

      <button className="cart-button" onClick={onCartClick}>
        Cart ({cartCount})
      </button>
    </header>
  )
}

export default Navbar