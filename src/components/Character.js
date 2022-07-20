import React from 'react'

class Character extends React.Component {
	render() {
		return(
            <div className='card col-3 m-4 p-4'>
                <img src={this.props.image} alt={this.props.name} />
                <h2 className='mt-2 text-center'>{this.props.name}</h2>
                <h3 className='fst-italic text-center mt-2'>{this.props.title}</h3>
                <button onClick={this.props.favorite} type="button" class="btn btn-dark">Add to favorite</button>
            </div>
		)
	}
}

export default Character