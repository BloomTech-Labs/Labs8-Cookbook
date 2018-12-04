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

    //return the first date on or after today.
    //if there are none, return the closest date in the past
    if (futureEvents.length > 0) {
        return futureEvents[0];
    } 
    else if (pastEvents.length > 0) {
        return pastEvents[pastEvents.length-1];
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
        this.setState({ sortedEvents: sortEvents(this.props.events) });
        setTimeout(() => {
            this.setState({ currentEvent: findSoonestEvent(this.state.sortedEvents) });
        }, 1000)
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