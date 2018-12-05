import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class RecipeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instructions: []
        }
    }

    // Adds sorted data for instructions to the components state.
    componentDidMount() {
        let instructions = this.props.location.state.instructions;
        instructions.sort(this.compare);
        this.setState({instructions})
    }

    // helper function: re-orders instructions based on stepNum
    compare(a, b) {
        let comparison = 0;
        let instA = a.stepNum;
        let instB = b.stepNum;
        if (instA > instB) {
            comparison = 1;
        } else if (instA < instB) {
            comparison = -1;
        }
        return comparison;
    }

    toggleCheckBox = e => {
        // filter through instuction state to find matching instruction by id
        let inst = this.state.instructions.filter(inst => {
            return inst.stepNum == e.target.name
        })
        // make a copy of the state
        let copyArr = this.state.instructions;
        // toggle specified instruction's isCompleted field in copy array
        copyArr[inst[0].stepNum - 1].isCompleted = !copyArr[inst[0].stepNum - 1].isCompleted;
        // re-set state with toggled checkmark
        this.setState({instructions: copyArr});
    }

    // check if ingredient is zero & prevent it from displaying
    errCheckIngredients(qty) {
        if (qty == 0) {
            return null;
        }
        return qty;
    }

    render() {
        // Styling to allow for instructions to grey out when checked.
        let checkedStyle = {
            backgroundColor: '#bcc9d2'
        }

        return (
            <div className='recipe-page'>
                <div className='header'>
                    <span className='title'>{this.props.location.state.title}</span>
                    <div className='icon-container'>
                        <a  className='link' href={'' + this.props.location.state.url} rel="noopener noreferrer" target="_blank"><FontAwesomeIcon icon="link" /></a>
                        <FontAwesomeIcon icon='trash-alt' className='delete'/>
                    </div>
                </div>
                <div className='left-container'>
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
                                <span className='qty'>{this.errCheckIngredients(ing.quantity)}</span>
                                <span className='name'>{ing.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='right-container'>
                    <div className='title'>Instructions</div>
                    <div className='instructions'>
                        {this.state.instructions.map(inst => (
                            <div className='instruction' style={(this.state.instructions[inst.stepNum - 1].isCompleted ? checkedStyle : null)}>
                                <input
                                    type='checkbox'
                                    className='checkbox'
                                    onClick={this.toggleCheckBox}
                                    name={inst.stepNum}
                                />
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