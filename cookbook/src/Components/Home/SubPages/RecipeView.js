import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class RecipeView extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
        }
    }


    render() {
        return (
            <div className='recipe-page'>
                <div className='left-container'>
                    <div className='header'>
                        <span className='title'>{this.props.location.state.title}</span>
                        <a href={'' + this.props.location.state.url}><FontAwesomeIcon icon="link" /></a>
                    </div>
                    <div className='recipe-img' style={{backgroundImage: `url(${this.props.location.state.image})`}}></div>
                    <div className='scheduled-for'>
                        <span>scheduled for</span>
                        {this.props.location.state.events.map(event => 
                        <div className='event'>
                            <div className="meal">{event.mealType}</div>
                            <div className="date">{event.date}</div>
                        </div>
                        )}
                    </div>
                    <div className='recipe-info'>
                        <span className='title'>Info</span>
                        <div className='cook-time'>
                            <span>Cook Time</span>
                            <span>{this.props.location.state.prepTime}</span>
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
                                <span className='amount'>{ing.quantity}</span>
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