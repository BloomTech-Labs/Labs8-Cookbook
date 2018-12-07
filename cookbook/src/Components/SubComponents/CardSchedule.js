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
    else return -1;
}

class CardSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedEvents: null,
            currentEventIndex: -1
        }
    }

    componentDidMount() {
        let sortedEvents = sortEvents(this.props.events)
        this.setState({ sortedEvents });
        this.setState({ currentEventIndex: findSoonestEvent(sortedEvents) });
    }

    handleEventScroll = (amount) => {
        if (amount > 0 && this.state.currentEventIndex < this.state.sortedEvents.length-1) {
            this.setState({ currentEventIndex: this.state.currentEventIndex + amount })
        } else if (amount < 0 && this.state.currentEventIndex > 0) {
            this.setState({ currentEventIndex: this.state.currentEventIndex + amount })
        }
    }

    handleScrollClass = (direction) => {
        if (this.state.currentEventIndex < 0) return 'scroll-hidden';
        if (direction === 'right') {
            if (this.state.currentEventIndex < this.state.sortedEvents.length-1) return 'scroll-right';
            else return 'scroll-hidden';
        }
        if (direction === 'left') {
            if (this.state.currentEventIndex > 0) return 'scroll-left';
            else return `scroll-hidden`;
        }
    }

    render() {
        return (
            <React.Fragment>

                <span>scheduled for</span>

                <div className='event-scroller'>
                    <div className={this.handleScrollClass('left')} onClick={() => this.handleEventScroll(-1)}>&lt;</div>

                    <div className='event'>
                        <div className="meal">{this.state.currentEventIndex >= 0 ? this.state.sortedEvents[this.state.currentEventIndex].mealType : 'no events'}</div>
                        <div className="date">{this.state.currentEventIndex >= 0 ? new Date(this.state.sortedEvents[this.state.currentEventIndex].date).toLocaleDateString() : 'scheduled'}</div>
                    </div>

                    <div className={this.handleScrollClass('right')} onClick={() => this.handleEventScroll(1)}>&gt;</div>

                </div>
                
            </React.Fragment>
        )
    }
}

export default CardSchedule;