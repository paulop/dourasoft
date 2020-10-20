import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../assets/containers/index.css";
import ClientCard from "../components/ClientCard";
import CircleButton from "../components/CircleButton";
import addClientIcon from "../assets/icons/addClient.svg";
import {createClient, deleteClient, fetchClients, updateClient} from "../actions/clientActions";

export const errorsInClient = client => {
    const failure = {};
    let failed = false;
    if (!client)
        return failure;
    if (!client.nome || !client.nome.trim()) {
        failure.nome = "Nome Iválido";
        failed = true;
    }
    if (!client.endereco || !client.endereco.trim()) {
        failure.endereco = "Endereco Inválido";
        failed = true;
    }
    return failed ? failure : false;
}

const mapStateToProps = (state) => {
    return {clients: state.clients};
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchClients: () => dispatch(fetchClients(1)),
        createClient: client => dispatch(createClient(client)),
        updateClient: client => dispatch(updateClient(client)),
        deleteClient: id => dispatch(deleteClient(id))
    };
}

class ClientContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {isAddingClient: false, failureMap: {}};
        this.createClient = this.createClient.bind(this);
        this.updateClient = this.updateClient.bind(this);
        this.deleteClient = this.deleteClient.bind(this);
    }

    createClient(client) {
        const failure = errorsInClient(client);
        if (!failure) {
            this.props.createClient(client).then(this.setState({isAddingClient: false}));
            const failureMap = this.state.failureMap;
            failureMap[client.id || -1] = undefined;
            this.setState({failureMap});
        } else {
            const failureMap = this.state.failureMap;
            failureMap[client.id || -1] = failure;
            this.setState({failureMap});
        }
    }

    updateClient(client) {
        const failure = errorsInClient(client);
        if (!failure) {
            this.props.updateClient(client);
            const failureMap = this.state.failureMap;
            failureMap[client.id || -1] = undefined;
            this.setState({failureMap});
        } else {
            const failureMap = this.state.failureMap;
            failureMap[client.id || -1] = failure;
            this.setState({failureMap});
        }
    }

    deleteClient(id) {
        if (id)
            this.props.deleteClient(id);
    }

    componentDidMount() {
        this.props.fetchClients();
    }

    render() {
        const addStyle = {
            width: 40,
            height: 40,
            backgroundColor: "rgb(244, 117, 96)",
            boxShadow: "0 3px 6px rgba(0, 0, 0, .16), 0 1px 2px rgba(0, 0, 0, .23)"
        };
        return (
            <div className="container">
                <div className="container-actions">
                    {!this.state.isAddingClient &&
                    <CircleButton style={addStyle} imgStyle={{width: 32, height: 32}} icon={addClientIcon}
                                  onClick={() => this.setState({isAddingClient: true})}/>
                    }
                </div>
                <div className="card-list">
                    {this.state.isAddingClient &&
                    <ClientCard variant="create"
                                id="create_client"
                                failure={this.state.failureMap["create_client"]}
                                onLeftClick={this.createClient}
                                onRightClick={() => this.setState({isAddingClient: false})}/>
                    }
                    {this.props.clients.map(client => <ClientCard key={client.id}
                                                                  nome={client.nome}
                                                                  endereco={client.endereco}
                                                                  telefone={client.telefone}
                                                                  failure={this.state.failureMap[client.id]}
                                                                  id={client.id}
                                                                  onRightClick={() => this.deleteClient(client.id)}
                                                                  onLeftClick={this.updateClient}/>)}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientContainer);