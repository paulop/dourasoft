import React, {Component} from 'react';
import "../assets/components/ProductCard.css";
import editIcon from "../assets/icons/edit.svg";
import saveIcon from "../assets/icons/save.svg";
import CircleButton from "./CircleButton";
import TextField from "@material-ui/core/TextField";
import deleteIcon from "../assets/icons/delete.svg";
import InputAdornment from "@material-ui/core/InputAdornment";

const regex = /^\d+(\.?\d*)$/
export const isNumber = (text) => {
    return text.match(regex) || !text.trim();
};

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: this.props.nome || "",
            descricao: this.props.descricao || "",
            codigo: this.props.codigo || "",
            preco: this.props.preco ? this.props.preco + "" : "",
            id: this.props.id
        }
    }

    render() {
        const failure = this.props.failure || {};
        const cardStyle = {};
        const leftStyle = {backgroundColor: "rgb(242, 205, 141)"};
        const rightStyle = {
            height: 30,
            width: 30,
            backgroundColor: "rgb(245, 234, 138)"
        };
        const color = this.props.variant === "create" ? "secondary" : "primary";
        let leftIcon = editIcon;
        if (this.props.variant === "create") {
            leftIcon = saveIcon;
            leftStyle.backgroundColor = "rgb(97, 205, 187)";
            cardStyle.borderTop = "6px solid rgb(244, 117, 96)";
        }
        return (
            <div className="client-card" style={cardStyle}>
                <div style={{alignSelf: "flex-start", margin: "10px 0px 0px 10px"}}>
                    <CircleButton icon={leftIcon}
                                  style={leftStyle}
                                  onClick={() => this.props.onLeftClick && this.props.onLeftClick(this.state)}/>
                </div>
                <div className="attributes">
                    <div style={{width: 200}}>
                        <TextField color={color}
                                   id={"product_name" + this.props.id}
                                   variant="filled"
                                   fullWidth
                                   label="Nome"
                                   error={Boolean(failure.nome)}
                                   helperText={failure.nome}
                                   value={this.state.nome}
                                   onChange={e => this.setState({nome: e.target.value})}/>
                    </div>
                    <div style={{width: 200}}>
                        <TextField color={color}
                                   id={"code" + this.props.id}
                                   variant="filled"
                                   fullWidth
                                   error={Boolean(failure.codigo)}
                                   helperText={failure.codigo}
                                   label="Codigo"
                                   value={this.state.codigo}
                                   onChange={e => this.setState({codigo: e.target.value})}/>
                    </div>
                    <div style={{width: 200}}>
                        <TextField color={color}
                                   id={"price" + this.props.id}
                                   variant="filled"
                                   fullWidth
                                   error={Boolean(failure.preco)}
                                   helperText={failure.preco}
                                   InputProps={{
                                       startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                   }}
                                   label="Preço"
                                   value={this.state.preco}
                                   onChange={e => isNumber(e.target.value) && this.setState({preco: e.target.value})}/>
                    </div>
                    <div style={{width: 200}}>
                        <TextField color={color}
                                   id={"description" + this.props.id}
                                   variant="filled"
                                   multiline
                                   rows={4}
                                   label="Descrição"
                                   fullWidth
                                   value={this.state.descricao}
                                   onChange={e => this.setState({descricao: e.target.value})}/>
                    </div>
                </div>
                <div style={{alignSelf: "flex-start", margin: "10px 10px 0px 0px"}}>
                    <CircleButton icon={deleteIcon}
                                  style={rightStyle}
                                  onClick={this.props.onRightClick}/>
                </div>
            </div>
        );
    }
}

export default ProductCard;