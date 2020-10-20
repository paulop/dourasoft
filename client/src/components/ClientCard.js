import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import "../assets/components/ClientCard.css";
import CircleButton from "./CircleButton";
import deleteIcon from "../assets/icons/delete.svg";
import editIcon from "../assets/icons/edit.svg";
import saveIcon from "../assets/icons/save.svg";

class ClientCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: this.props.nome || "",
            telefone: this.props.telefone || "",
            endereco: this.props.endereco || "",
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
                    <div style={{width:200}}>
                        <TextField color={color}
                                   variant="filled"
                                   id={"client_name" + this.props.id}
                                   label="Nome"
                                   fullWidth
                                   error={Boolean(failure.nome)}
                                   helperText={failure.nome}
                                   value={this.state.nome}
                                   onChange={e => this.setState({nome: e.target.value})}/>
                    </div>
                    <div style={{width:200}}>
                        <TextField color={color}
                                   variant="filled"
                                   id={"address" + this.props.id}
                                   label="Endereço"
                                   fullWidth
                                   error={Boolean(failure.endereco)}
                                   helperText={failure.endereco}
                                   value={this.state.endereco}
                                   onChange={e => this.setState({endereco: e.target.value})}/>
                    </div>
                    <div style={{width:200}}>
                        <TextField color={color}
                                   variant="filled"
                                   fullWidth
                                   id={"phone" + this.props.id}
                                   label="Telefone"
                                   value={this.state.telefone}
                                   onChange={e => this.setState({telefone: e.target.value})}/>
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

export default ClientCard;