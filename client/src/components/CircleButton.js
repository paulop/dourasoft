import React, {Component} from 'react';
import "../assets/components/CircleButton.css";

class CircleButton extends Component {
    render() {
        const style = this.props.style || {};
        const imgStyle = {};
        imgStyle.height = (this.props.imgStyle && this.props.imgStyle.height) || style.height || 24;
        imgStyle.width = (this.props.imgStyle && this.props.imgStyle.width) || style.width || 24;
        return (
            <div className="circle-button" title={this.props.title} style={style} onClick={this.props.onClick}>
                <img style={imgStyle} alt="" src={this.props.icon}/>
            </div>
        );
    }
}

export default CircleButton;