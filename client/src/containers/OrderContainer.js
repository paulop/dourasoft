import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../assets/containers/index.css";
import OrderCard from "../components/OrderCard";
import {createClient, fetchClients} from "../actions/clientActions";
import {fetchProducts} from "../actions/productActions";
import CircleButton from "../components/CircleButton";
import addOrderIcon from "../assets/icons/addOrder.svg";
import {errorsInClient} from "./ClientContainer";
import {createOrder, deleteOrder, fetchOrders, loadOrderProducts, updateOrder} from "../actions/orderActions";

const errorsInOrder = order => {
    const failure = errorsInOrderUpdate(order) || {};
    let failed = false;
    if (!order.produtos || order.produtos.length < 1) {
        failed = true;
        failure.produtos = "Produtos Inválidos";
    }
    return failed ? failure : false;
}

const errorsInOrderUpdate = order => {
    const failure = {};
    let failed = false;
    if (!order)
        return failure;
    if (order.cliente) {
        const clientFailure = errorsInClient(order.cliente);
        if (clientFailure) {
            failed = true;
            failure.cliente = clientFailure;
        }
    } else if (!order.clienteId && order.clienteId !== 0) {
        failed = true;
        failure.clienteId = "Cliente Inválido";
    }
    return failed ? failure : false;
}

const mapStateToProps = (state) => {
    return {
        clients: state.clients,
        products: state.products,
        orders: state.orders
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: () => dispatch(fetchProducts(1)),
        fetchClients: () => dispatch(fetchClients(1)),
        fetchOrders: () => dispatch(fetchOrders(1)),
        loadOrderProducts: id => dispatch(loadOrderProducts(id)),
        createClient: client => dispatch(createClient(client)),
        createOrder: order => dispatch(createOrder(order)),
        updateOrder: order => dispatch(updateOrder(order)),
        deleteOrder: id => dispatch(deleteOrder(id))
    };
}

class OrderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddingOrder: false,
            failureMap: {},
            isClientsLoaded: false,
            isProductsLoaded: false
        }
        this.createOrder = this.createOrder.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.makeOrders = this.makeOrders.bind(this);
    }

    createOrder(order) {
        const failure = errorsInOrder(order);
        if (!failure) {
            if (order.cliente) {
                this.props.createClient(order.cliente).then((client) => {
                    if (client && client.id) {
                        order.clienteId = client.id;
                        this.props.createOrder(order).then(() => this.setState({isAddingOrder: false}));
                    }
                });
            } else
                this.props.createOrder(order).then(() => this.setState({isAddingOrder: false}));
            const failureMap = this.state.failureMap;
            failureMap[order.id || -1] = undefined;
            this.setState({failureMap});
        } else {
            const failureMap = this.state.failureMap;
            failureMap[order.id || -1] = failure;
            this.setState({failureMap});
        }
    }

    updateOrder(order) {
        const failure = errorsInOrderUpdate(order);
        if (!failure) {
            if (order.cliente) {
                this.props.createClient(order.cliente).then((client) => {
                    if (client && client.id) {
                        order.clienteId = client.id;
                        this.props.updateOrder(order);
                    }
                });
            } else
                this.props.updateOrder(order);
            const failureMap = this.state.failureMap;
            failureMap[order.id || -1] = undefined;
            this.setState({failureMap});
        } else {
            const failureMap = this.state.failureMap;
            failureMap[order.id || -1] = failure;
            this.setState({failureMap});
        }
    }

    deleteOrder(id) {
        if (id || id === 0)
            this.props.deleteOrder(id);
    }


    componentDidMount() {
        this.props.fetchProducts().then(() => this.setState({isProductsLoaded: true}));
        this.props.fetchClients().then(() => this.setState({isClientsLoaded: true}));
        this.props.fetchOrders();
    }

    makeOrders() {
        const orderElements = [];
        for (let order of this.props.orders) {
            const client = order.cliente ? this.props.clients.find((cliente) => cliente.id === order.cliente.id) : {};
            const products = [];
            if (order.produtos)
                for (let product of order.produtos) {
                    if (product.produto) {
                        const info = product.produto ? this.props.products.find(item => item.id === product.produto.id) : null;
                        if (info)
                            products.push({
                                nome: product.nome,
                                quantidade: product.quantidade,
                                valor: product.valorUnitario,
                                info
                            })
                    }
                }
            orderElements.push(<OrderCard key={order.id}
                                          id={order.id}
                                          nome={client && client.nome}
                                          endereco={client && client.endereco}
                                          telefone={client && client.telefone}
                                          total={order.valorTotal}
                                          client={client && client.nome ? client : null}
                                          data={order.data}
                                          status={order.status}
                                          failure={this.state.failureMap[order.id]}
                                          loadProducts={order.produtos ? undefined : () => this.props.loadOrderProducts(order.id)}
                                          onLeftClick={this.updateOrder}
                                          onRightClick={() => this.deleteOrder(order.id)}
                                          products={products}
                                          clientOptions={this.props.clients}
                                          productOptions={this.props.products}/>)
        }
        return orderElements;
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
                    {!this.state.isAddingOrder &&
                    <CircleButton style={addStyle} imgStyle={{height: 28, width: 28}} icon={addOrderIcon}
                                  onClick={() => this.setState({isAddingOrder: true})}/>
                    }
                </div>
                {this.state.isClientsLoaded && this.state.isProductsLoaded &&
                <div className="card-list">
                    {this.state.isAddingOrder &&
                    <OrderCard variant="create"
                               id="create_order"
                               clientOptions={this.props.clients}
                               productOptions={this.props.products}
                               failure={this.state.failureMap["create_order"]}
                               onLeftClick={this.createOrder}
                               onRightClick={() => this.setState({isAddingOrder: false})}/>
                    }
                    {this.makeOrders()}
                </div>}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderContainer);