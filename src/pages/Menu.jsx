import MenuCard from '../components/MenuCard'
import { useEffect, useState } from 'react'

import { getMenu } from '../services/api'

function Menu({ addToCart }) {
  const [menu, setMenu] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMenu()
      .then((data) => {
        setMenu(data.data || data)
      })
      .catch(() => {
        setError('Unable to load restaurant data.')
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(menu.map((item) => item.category).filter(Boolean))]

  const filteredMenu =
    category === 'All' ? menu : menu.filter((item) => item.category === category)

  return (
    <main className="menu-section">
      <div className="section-heading">
        <p className="eyebrow">FROM OUR KITCHEN</p>
        <h2>Explore the menu</h2>
        <p>
          Traditional Habesha dishes prepared with familiar flavors, quality ingredients,
          and a modern dining experience.
        </p>
      </div>

      {loading && <p>Loading menu...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filteredMenu.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onAdd={addToCart}
              />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default Menu
