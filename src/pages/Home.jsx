import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMenu, getSpecials } from '../services/api'

function Home({ addToCart }) {
  const [menu, setMenu] = useState([])
  const [specials, setSpecials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getMenu(), getSpecials()])
      .then(([menuData, specialData]) => {
        setMenu(menuData.data || menuData)
        setSpecials(specialData.data || specialData)
      })
      .catch(() => {
        setError('Unable to load restaurant data.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">ETHIOPIAN & ERITREAN CUISINE</p>

          <h1>
            A table made
            <br />
            for sharing.
          </h1>

          <p className="hero-description">
            Discover authentic Habesha flavors, prepared with tradition and served with a modern touch.
          </p>

          <Link to="/menu" className="primary-button">
            Explore the menu
          </Link>
        </div>
      </section>

      <section className="specials-section" id="specials">
        <div className="section-heading">
          <p className="eyebrow">TODAY'S SELECTION</p>
          <h2>House specials</h2>
          <p>Discover dishes selected from our kitchen.</p>
        </div>

        <div className="specials-grid">
          {specials.slice(0, 5).map((item) => (
            <article className="special-card" key={item.id}>
              <div>
                <span className="special-badge">SPECIAL</span>
                <h3>{item.nameEn}</h3>
                <p>{item.description}</p>
              </div>

              <div className="card-bottom">
                <span>{item.priceETB} ETB</span>
                <button onClick={() => addToCart(item)}>Add</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <p className="eyebrow">OUR TABLE</p>
        <h2>Rooted in Habesha hospitality.</h2>
        <p>
          Mesob House brings Ethiopian and Eritrean culinary traditions into a modern digital dining experience.
        </p>
      </section>

      <footer>
        <strong>Mesob House</strong>
        <span>© 2026 · Ethiopian & Eritrean dining</span>
      </footer>

      {loading && <p>Loading menu...</p>}
      {error && <p>{error}</p>}
    </main>
  )
}

export default Home
