import React, { Component } from 'react';


class RecipeView extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
        }
    }

    // When testing is done, ensure that ALL DATA is properly referenced (especially the prep time and cook time).
    render() {
        return (
            <div className='recipe-page'>
                <div className='left-container'>
                    <div className='recipe-img' style={{backgroundImage: `url(${this.props.location.state.image})`}}></div>
                    <div className='scheduled-for'>
                        <span>scheduled for</span>
                        <span>{this.props.location.state.meal}</span>
                        <span>{this.props.location.state.scheduledFor}</span>
                    </div>
                    <div className='recipe-info'>
                        <span className='title'>Info</span>
                        <div className='cook-time'>
                            <span>Cook Time</span>
                            <span>{this.props.location.state.readyInMinutes}</span>
                        </div>
                        <div className='servings'>
                            <span>Servings</span>
                            <span>{this.props.location.state.servings}</span>
                        </div>
                    </div>
                    <div className='ingredients'>
                        <div className='title'>Ingredients</div>
                        {this.props.location.state.ingredients.map(ing => (
                            <div className='ingredient'>
                                <span className='amount'>{ing.amount}</span>
                                <span className='name'>{ing.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='right-container'>
                    <div className='title'>Instructions</div>
                    <div className='instructions'>
                        {this.props.location.state.instructions.map(inst => (
                            <div className='description'>{inst.description}</div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeView;