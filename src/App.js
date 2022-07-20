import React from 'react'
import Character from './components/Character'
import "./App.css"

class App extends React.Component {
  constructor (){
    super()
    this.state = {
      characters: [],
      favorites: [],
    }
  }

  async componentDidMount(){
    // personnages de got
    const request = await fetch("https://thronesapi.com/api/v2/Characters")
    const response = await request.json()

    // 

    this.setState({
      characters: response,
    })
  }

  handleFavoriteClick = (character) => {
    const clonedFavorites = [ ...this.state.favorites, character]

    this.setState({
      favorites: clonedFavorites,
    })
  }

  handleRemoveFavoriteClick = (character) => {
    const clonedFavorites = [...this.state.favorites]
    const index = clonedFavorites.indexOf(character)
    clonedFavorites.splice(index, 1);

    this.setState({
        favorites: clonedFavorites,
    })
  }

	render() {
    console.log(this.state.favorites)
		return(
      <div className='Container'>
        <h1 className='text-center mt-3 text-light'>Game of thrones</h1>
        <div className='d-flex flex-wrap justify-content-center'>
          {this.state.characters.map((character) => {
            return(
              <Character
                name = {character.fullName}
                title = {character.title}
                image= {character.imageUrl}
                favorite = {() => this.handleFavoriteClick(character)}
              />
            )
          })}
        </div>

        <ul className="p-3">
                    <h3 className='text-warning'>Favorites :</h3>
                    {this.state.favorites.map((character) => {
                        return (
                            <li className="text-white d-flex justify-content-between m-2">
                                {character.fullName}
                                <button
                                    className="ms-2 btn btn-danger"
                                    onClick={() => this.handleRemoveFavoriteClick(character)}
                                >
                                    X
                                </button>
                            </li>
                        );
                    })}
                </ul>
      </div>
		)
	}
}

export default App