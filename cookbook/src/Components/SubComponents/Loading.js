import React, { Component } from "react";

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: true,
            colors: ["#bcc9d2", "#de6a5a", "#fed092", "#343e5a", "#f5e9df"],
            ellipses: '...'
        };
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState({ animate: false })
            this.shuffleColors();
            setTimeout(() => {
                this.setState({ animate: true })
            }, 100)
        }, 2900)
    }

    shuffleColors = () => {
        let colorsCopy = this.state.colors;

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
          
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
          
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
          
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
          
            return array;
        }

        colorsCopy = shuffle(colorsCopy);
        this.setState({ colors: colorsCopy });
    }

    render () {
        return (
            <div className="loading-container">

                <div class={this.state.animate ? "color-container is-animated" : "color-container"}>

                    <svg id="transition-container" xmlns="http://www.w3.org/2000/svg" >
                        <g fill="none" fillRule="evenodd">
                            <path fill={this.state.colors[0]} d="M0 0h2000v450H0z" />
                            <path fill={this.state.colors[1]} d="M0 0h2000v450H0z" />
                            <path fill={this.state.colors[2]} d="M0 0h2000v450H0z" />
                            <path fill={this.state.colors[3]} d="M0 0h2000v450H0z" />
                            <path fill={this.state.colors[4]} d="M0 0h2000v450H0z" />
                            <path fill="#ffffff" d="M0 0h2000v450H0z" />
                        </g>
                    </svg>
                    
                </div>

                <span className='text'>{`loading${this.state.ellipses}`}</span>

            </div>
        );
    }
};

export default Loading;