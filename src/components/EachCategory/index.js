import './index.css'

const EachCategory = props => {
  const {eachItem, updateActiveCategory, activated} = props
  const onSelectCategory = () => {
    updateActiveCategory(eachItem)
  }
  const className = activated ? 'activated' : 'list-item'
  return (
    <button type="button" onClick={onSelectCategory}>
      <li className={className}>
        <h1>{eachItem}</h1>
        <p>Unlimited Jokes On {eachItem}</p>
      </li>
    </button>
  )
}

export default EachCategory
