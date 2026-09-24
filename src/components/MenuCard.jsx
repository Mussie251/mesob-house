import { Link } from 'react-router-dom'

function MenuCard({ item, onAdd }) {
  return (
    <article className="menu-card">
      <div className="menu-image">🍲</div>

      <div className="menu-card-content">
        {item.isSpecial && (
          <span className="special-badge">SPECIAL</span>
        )}

        <h3>{item.nameEn}</h3>

        <p className="amharic-name">
          {item.nameAm}
        </p>

        <p>{item.description}</p>

        <div className="card-bottom">
          <span>{item.priceETB} ETB</span>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <Link
              to={`/dish/${item.id}`}
              className="primary-button"
            >
              View
            </Link>

            <button onClick={() => onAdd(item)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default MenuCard