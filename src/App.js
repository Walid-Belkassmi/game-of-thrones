import React from 'react'
import Character from './components/Character'

class App extends React.Component {
  constructor (){
    super()
    this.state = {
      characters: [],
    }
  }

  async componentDidMount(){
    const request = await fetch("https://thronesapi.com/api/v2/Characters")
    const response = await request.json()

    this.setState({
      characters: response,
    })
  }

	render() {
		return(
      <div className='Container'>
        <h1>Game of thrones</h1>
        <div className=''>
          {this.state.characters.map((character) => {
            return(
              <Character
                name = {character.fullName}
                title = {character.title}
                image= {character.imageUrl}
              />
            )
          })}

        </div>
      </div>
		)
	}
}

export default App