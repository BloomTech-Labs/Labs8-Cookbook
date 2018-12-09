import React, { Component } from "react";

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: true,
        };
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState({ animate: !this.state.animate })
        }, 1500)
    }

    render () {
        return (
            <div class={this.state.animate ? "container is-animated" : "container"}>
            
                <svg id="transition-container" xmlns="http://www.w3.org/2000/svg" >
                    <g fill="none" fillRule="evenodd">
                        <path fill="#bcc9d2" d="M0 0h800v450H0z" />
                        <path fill="#de6a5a" d="M0 0h800v450H0z" />
                        <path fill="#fed092" d="M0 0h800v450H0z" />
                        <path fill="#343e5a" d="M0 0h800v450H0z" />
                        <path fill="#f5e9df" d="M0 0h800v450H0z" />
                        <path fill="#ffffff" d="M0 0h800v450H0z" />
                    </g>
                </svg>
                
            </div>
        );
    }
};

export default Loading;