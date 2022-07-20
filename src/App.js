import React from 'react'
import Character from './components/Character'
import "./App.css"

class App extends React.Component {
  constructor (){
    super()
    this.state = {
      characters: [],
      favorites: [],
      continents: [],
      showCharacters: true,
      showFavorites: false,
      showContinents: false,
    }
  }

  async componentDidMount(){
    // personnages de got
    const request = await fetch("https://thronesapi.com/api/v2/Characters")
    const response = await request.json()
    this.setState({
      characters: response,
    })

    // continents
    const requestContinents = await fetch("https://thronesapi.com/api/v2/Continents")
    const responseContinents = await requestContinents.json()
    console.log(responseContinents)
    
    this.setState({
      continents: responseContinents,
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

  handleCharactersClick = () => {
    this.setState({
      showCharacters: true,
      showFavorites: false,
      showContinents: false,
    })
  }

  handleFavoriteSection = () => {
    this.setState({
      showCharacters: false,
      showFavorites: true,
      showContinents: false
    })
  }

  handleContinentsClick = () => {
    this.setState({
      showCharacters: false,
      showFavorites: false,
      showContinents: true
    })
  }

	render() {
		return(
      <div className='Container'>
        <h1 className='text-center mt-3 text-light'>Game of thrones</h1>
        <div className="onglets d-flex justify-content-center mt-5 mb-3 gap-3">
          <button onClick={this.handleCharactersClick} type="button" class="btn btn-outline-light">Characters</button>
          <button  onClick={this.handleFavoriteSection} type="button" class="btn btn-outline-light">Favorites</button>
          <button  onClick={this.handleContinentsClick} type="button" class="btn btn-outline-light">Continents</button>
        </div>
        <div className='d-flex flex-wrap justify-content-center'>
          {this.state.showCharacters && 
          <>
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
          </>
         }
        </div>

        <ul className="p-3">
            {this.state.showFavorites && 
            <>
            <h3 className='text-warning'>Favorites :</h3>
            {this.state.favorites.map((character) => {
              return (
                <li className="text-dark d-flex justify-content-between m-2">
                  {/* {character.fullName} */}
                  <Character
                    name = {character.fullName}
                    title = {character.title}
                    image= {character.imageUrl}
                  />
                  <button
                   className="ms-2 btn btn-danger"
                   onClick={() => this.handleRemoveFavoriteClick(character)}
                  >
                  X
                  </button>
                </li>
              );
            })}
            </>
            }
        </ul>

        <section className='continents'>
          {this.state.showContinents && 
            <>
            <h3>Continents</h3>
            {this.state.continents.map((continent) => {
              return (
                <p>{continent.name}</p>
              )
            })}
          </>
          }
        </section>
      </div>
		)
	}
}

export default App