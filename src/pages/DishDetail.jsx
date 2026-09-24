import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMenu } from '../services/api'

function DishDetail({ addToCart }) {
  const { id } = useParams()
  const [dish, setDish] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMenu()
      .then((data) => {
        const menu = data.data || data
        const foundDish = menu.find((item) => String(item.id) === String(id))

        if (!foundDish) {
          setError('Dish not found.')
          return
        }

        setDish(foundDish)
      })
      .catch(() => {
        setError('Unable to load dish details.')
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <main className="menu-section"><p>Loading dish...</p></main>
  if (error) return <main className="menu-section"><p>{error}</p></main>

  return (
    <main className="menu-section">
      <Link to="/menu" className="primary-button" style={{ display: 'inline-block', marginBottom: '24px' }}>
        ← Back to menu
      </Link>

      <article className="menu-card" style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="menu-image" style={{ minHeight: '280px' }}>🍲</div>

        <div className="menu-card-content">
          {dish.isSpecial && <span className="special-badge">SPECIAL</span>}

          <h3>{dish.nameEn}</h3>
          <p className="amharic-name">{dish.nameAm}</p>
          <p>{dish.description}</p>

          <div className="card-bottom">
            <span>{dish.priceETB} ETB</span>
            <button onClick={() => addToCart(dish)}>Add to cart</button>
          </div>
        </div>
      </article>
    </main>
  )
}

export default DishDetail
