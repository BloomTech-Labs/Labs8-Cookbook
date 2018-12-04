import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fraction from 'fraction.js';


class RecipeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    decToFrac(num) {
        let frac = new Fraction(num);
        return frac.toFraction(true);
    }

    render() {
        return (
            <div className='recipe-page'>
                <div className='left-container'>
                    <div className='header'>
                        <span className='title'>{this.props.location.state.title}</span>
                        <a  className='link' href={'' + this.props.location.state.url} rel="noopener noreferrer" target="_blank"><FontAwesomeIcon icon="link" /></a>
                    </div>
                    <div className='left-content'>
                        <div className='recipe-img' style={{backgroundImage: `url(${this.props.location.state.image})`}}></div>
                        <div className='info-bar'>
                            <div className='scheduled-for'>
                                <span className='text'>scheduled for:</span>
                                {this.props.location.state.events.map(event => 
                                <div className='event'>
                                    <div className="meal">{event.mealType}</div>
                                    <div className="date">{new Date(event.date).toLocaleDateString()}</div>
                                </div>
                                )}
                            </div>
                            <div className='recipe-info'>
                                <div className='cook-time'>
                                    <span className='title'>Cook Time:</span>
                                    <span className='time'>{this.props.location.state.prepTime}</span>
                                </div>
                                <div className='servings'>
                                    <span className='title'>Servings:</span>
                                    <span className='size'>{this.props.location.state.servings}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='ingredients'>
                        <div className='title'>Ingredients</div>
                        {this.props.location.state.ingredients.map(ing => (
                            <div className='ingredient'>
                                <span className='qty'>{this.decToFrac(ing.quantity)}</span>
                                <span className='name'>{ing.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='right-container'>
                    <div className='header'>
                        <div className='title'>Instructions</div>
                        <div className='icon-container'>
                                <FontAwesomeIcon icon='edit' className='edit'/>
                                <FontAwesomeIcon icon='trash-alt' className='delete'/>
                        </div>
                    </div>
                    <div className='instructions'>
                        {this.props.location.state.instructions.map(inst => (
                            <div className='instruction'>
                                <input type='checkbox' className='checkbox'/>
                                <div className='description'>{inst.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeView;