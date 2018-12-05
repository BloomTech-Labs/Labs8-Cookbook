import React, { Component } from 'react';

//sort the events in ascending order by date
let sortEvents = (events) => {
    let sortedEvents = events;
    sortedEvents.sort(function(a,b) {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);

        if (dateA < dateB) return -1;
        else if (dateA == dateB) return 0;
        else return 1;
    })
    return sortedEvents;
}

let findSoonestEvent = (sortedEvents) => {
    //get today's date and set the time to the start of the day
    let now = new Date();
    now.setHours(0,0,0,0);

    //all the events that are scheduled for today or after
    let futureEvents = sortedEvents.filter(function(event) {
        return new Date(event.date) - now >= 0;
    })

    //all the events that are scheduled for before today
    let pastEvents = sortedEvents.filter(function(event) {
        return new Date(event.date) - now < 0;
    })

    //return the index of the first event with date on or after today.
    //if there are none, return the index of event with closest date in the past
    if (futureEvents.length > 0) {
        let index = sortedEvents.indexOf(futureEvents[0]);
        return index;
    } 
    else if (pastEvents.length > 0) {
        let index = sortedEvents.indexOf(pastEvents[pastEvents.length-1]);
        return index;
    }
    else return null;
}

class CardSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedEvents: null,
            currentEventIndex: null
        }
    }

    componentDidMount() {
        let sortedEvents = sortEvents(this.props.events)
        this.setState({ sortedEvents });
        this.setState({ currentEventIndex: findSoonestEvent(sortedEvents) });
    }

    render() {
        return (
            <div className='card-schedule'>
                <span>scheduled for</span>
                    {this.props.events.map(event => 
                    <div className='event'>
                        <div className="meal">{event.mealType}</div>
                        <div className="date">{new Date(event.date).toLocaleDateString()}</div>
                    </div>
                    )}
            </div>
        )
    }
}

export default CardSchedule;