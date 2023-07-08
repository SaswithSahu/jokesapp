import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {ImCancelCircle} from 'react-icons/im'

import EachCategory from '../EachCategory'

import './index.css'

class JokesPage extends Component {
  state = {
    pageLoading: true,
    categoriesList: [],
    activeCategory: '',
    joke: '',
    displayPopup: false,
    isLoading: true,
  }

  componentDidMount() {
    this.getAllCategories()
  }

  getAllCategories = async () => {
    const request = await fetch('https://api.chucknorris.io/jokes/categories')
    const data = await request.json()
    this.setState({categoriesList: [...data], pageLoading: false})
  }

  updateActiveCategory = category => {
    this.setState({activeCategory: category, displayPopup: true}, this.getJoke)
  }

  getJoke = async () => {
    this.setState({isLoading: true})
    const {activeCategory} = this.state
    const url = `https://api.chucknorris.io/jokes/random?category=${activeCategory}`
    const request = await fetch(url)
    const data = await request.json()
    this.setState({joke: data.value, isLoading: false})
  }

  onCLickCancel = () => {
    this.setState({displayPopup: false, activeCategory: ''})
  }

  render() {
    const {
      pageLoading,
      categoriesList,
      activeCategory,
      joke,
      displayPopup,
      isLoading,
    } = this.state
    return (
      <>
        {pageLoading ? (
          <div className="loader-container1">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <div className="main-container">
            <h1 className="main-heading">Chuck Norries</h1>
            <ul className="list-of-containers">
              {categoriesList.map(eachItem => (
                <EachCategory
                  eachItem={eachItem}
                  activated={activeCategory === eachItem}
                  updateActiveCategory={this.updateActiveCategory}
                />
              ))}
            </ul>
            {displayPopup && (
              <div className="popup-container">
                <div className="upper-container">
                  <h1 className="head">{activeCategory}</h1>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={this.onCLickCancel}
                  >
                    <ImCancelCircle className="cancel-icon" />
                  </button>
                </div>
                {isLoading ? (
                  <div data-testid="loader" className="loader-container2">
                    <Loader
                      type="Oval"
                      color="#ffffff"
                      height={50}
                      width={50}
                    />
                  </div>
                ) : (
                  <div className="container">
                    <p className="para">{joke}</p>
                    <button
                      type="button"
                      className="popup-button"
                      onClick={this.getJoke}
                    >
                      Next Joke
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </>
    )
  }
}

export default JokesPage
