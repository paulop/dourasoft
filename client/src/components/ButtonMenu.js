import React, {Component} from 'react';
import "../assets/components/ButtonMenu.css";
import {Link} from "react-router-dom";

class ButtonMenu extends Component {
    render() {
        return (
            <div className="button-menu">
                <Link to={this.props.to}>{this.props.text}</Link>
            </div>
        );
    }
}

export default ButtonMenu;