import React, {Component} from 'react';
import "../assets/components/Header.css";
import ButtonMenu from "./ButtonMenu";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    render() {
        const headerStyle = {};
        if(this.state.width <= 650)
            headerStyle.justifyContent = "center";
        return (
            <div className="header" style={headerStyle}>
                {this.state.width > 650 &&
                <div className="title">
                    <h2>Desafio Dourasoft</h2>
                </div>
                }
                <div className="menu">
                    <ButtonMenu to="/clientes" text="Clientes"/>
                    <ButtonMenu to="/produtos" text="Produtos"/>
                    <ButtonMenu to="/pedidos" text="Pedidos"/>
                </div>
            </div>
        );
    }
}

export default Header;