import React, { Component } from "react";

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: false,
        };
    }

    componentDidMount() {
        setInterval(function() {
            this.setState({ animate: !this.state.animate })
        }, 2000)
    }

    render () {
        return (
            <div class={this.state.animated ? "container is-animated" : "container"}>
            
                <svg id="transition-container" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
                    <g fill="none" fill-rule="evenodd">
                        <path fill="#F4F4F4" d="M0 0h800v450H0z"/>
                        <path fill="#D0021B" d="M0 0h800v450H0z"/>
                        <path fill="#F8E71C" d="M0 0h800v450H0z"/>
                        <path fill="#9013FE" d="M0 0h800v450H0z"/>
                        <path fill="#50E3C2" d="M0 0h800v450H0z"/>
                        <path fill="#F4F4F4" d="M0 0h800v450H0z"/>
                    </g>
                </svg>
                
            </div>
        );
    }
};

export default Loading;