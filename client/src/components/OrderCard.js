import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import "../assets/components/OrderCard.css";
import CircleButton from "./CircleButton";
import deleteIcon from "../assets/icons/delete.svg";
import editIcon from "../assets/icons/edit.svg";
import saveIcon from "../assets/icons/save.svg";
import expandIcon from "../assets/icons/expand.svg";
import addClientIcon from "../assets/icons/addClient.svg";
import addProductIcon from "../assets/icons/addProduct.svg";
import clientIcon from "../assets/icons/client.svg";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {isNumber} from "./ProductCard";
import InputAdornment from "@material-ui/core/InputAdornment";


class OrderCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status || "Aberto",
            selectedClient: this.props.client || null,
            total: this.props.total || "",
            nome: this.props.nome || "",
            telefone: this.props.telefone || "",
            endereco: this.props.endereco || "",
            id: this.props.id,
            isExpanded: false,
            createClient: false,
            products: [],
            addProduct: {
                nome: "",
                quantidade: "",
                valor: ""
            }
        }
        this.setProduct = this.setProduct.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.makeProductElement = this.makeProductElement.bind(this);
        this.makeAllProductElements = this.makeAllProductElements.bind(this);
        this.makeRemoveElements = this.makeRemoveElements.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.getOrder = this.getOrder.bind(this);
        this.loadProducts = this.loadProducts.bind(this);
    }

    loadProducts() {
        let products = this.state.products;
        if (products && products.length === 0 && this.props.products && this.props.products.length > 0)
            products = [...this.props.products];
        if (!this.props.loadProducts)
            return this.setState({
                isExpanded: !this.state.isExpanded,
                isProductsLoaded: true,
                products
            });
        else if (this.state.isExpanded)
            return this.setState({isExpanded: false, products});
        this.props.loadProducts().then(() => this.setState({
            products: [...this.props.products],
            isExpanded: true,
            isProductsLoaded: true
        }));
    }

    getOrder() {
        const produtos = [];
        const clienteId = this.state.selectedClient && parseInt(this.state.selectedClient.id);
        const cliente = {nome: this.state.nome, endereco: this.state.endereco, telefone: this.state.telefone};
        const status = this.state.status;
        for (let index = -1; index < this.state.products.length; index++) {
            const product = this.getProduct(index);
            if (product.info)
                produtos.push({
                    produtoId: parseInt(product.info.id),
                    quantidade: parseInt(product.quantidade),
                    valorUnitario: parseFloat(product.valor)
                });
        }
        const order = {status}
        if (this.state.isProductsLoaded)
            order.produtos = produtos;
        if (this.props.id || this.props.id === 0)
            order.id = this.props.id;
        if (this.state.createClient)
            order.cliente = cliente
        else
            order.clienteId = clienteId;
        return order;
    }

    setProduct(id, values) {
        if (id === -1)
            this.setState({addProduct: {...this.state.addProduct, ...values}});
        else if (id < this.state.products.length && id >= 0) {
            const products = this.state.products;
            products[id] = {...products[id], ...values};
            this.setState({products});
        }
    }

    getProduct(id) {
        if (id === -1)
            return this.state.addProduct;
        else if (id < this.state.products.length && id >= 0)
            return this.state.products[id];
        else
            return {};
    }

    getTotal() {
        let total = 0;
        for (let index = -1; index < this.state.products.length; index++) {
            const product = this.getProduct(index);
            const quantity = parseInt(product.quantidade);
            const value = parseFloat(product.valor);
            if (value && quantity)
                total += value * quantity;
        }
        return total && total.toFixed(2);
    }

    addProduct() {
        if (!(this.state.addProduct && this.state.addProduct.info))
            return;
        const products = this.state.products;
        const addProduct = {
            nome: "",
            quantidade: "",
            valor: ""
        };
        products.unshift(this.state.addProduct);
        this.setState({products, addProduct});
    }

    removeProduct(id) {
        const products = this.state.products;
        if (id < products.length && id >= 0) {
            products.splice(id, 1);
            this.setState({products})
        }
    }

    makeRemoveElements() {
        const elements = [];
        const style = {
            width: 30,
            height: 30,
            backgroundColor: "rgb(244, 117, 96)"
        };
        for (let index = 0; index < this.state.products.length; index++)
            elements.push(
                <React.Fragment key={index}>
                    <div style={{height: 34}}/>
                    <CircleButton style={style} icon={deleteIcon} onClick={() => this.removeProduct(index)}/>
                </React.Fragment>
            );
        return elements;
    }

    makeAllProductElements() {
        const elements = [];
        for (let index = -1; index < this.state.products.length; index++)
            elements.push(this.makeProductElement(index, index === -1 ? "secondary" : "primary"));
        return elements
    }

    makeProductElement(id, color) {
        const productOptions = this.props.productOptions || [];
        const product = this.getProduct(id);
        return (
            <div key={this.state.products.length - id} className="products-attributes">
                <div>
                    <Autocomplete
                        id={"auto_product_name" + this.props.id + "" + id}
                        options={productOptions}
                        getOptionLabel={(option) => option.nome}
                        disableClearable
                        value={product.info ? product.info : null}
                        onChange={(e, newValue) => this.setProduct(id, {
                            valor: newValue && newValue.preco ? newValue.preco : "",
                            quantidade: "" + (parseInt(product.quantidade) || 1),
                            info: newValue
                        })}
                        style={{width: 200}}
                        renderInput={(params) => (
                            <TextField {...params} color={color}
                                       variant="filled"
                                       label="Produto"/>)}/>
                </div>
                <div style={{width: 200}}>
                    <TextField color={color}
                               variant="filled"
                               id={"product_quantity" + this.props.id + "" + id}
                               label="Quantidade"
                               type="number"
                               value={product.quantidade}
                               onChange={e => parseInt(e.target.value) > 0 && this.setProduct(id, {quantidade: "" + parseInt(e.target.value)})
                               }/>
                </div>
                <div style={{width: 200}}>
                    <TextField color={color}
                               variant="filled"
                               id={"value" + this.props.id + "" + id}
                               label="Valor Unitário"
                               value={product.valor}
                               InputProps={{
                                   startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                               }}
                               onChange={e => isNumber(e.target.value) && e.target.value >= 0 && this.setProduct(id, {valor: e.target.value})}/>
                </div>
            </div>
        );
    }

    render() {
        let dateString = "";
        const date = this.props.data && new Date(this.props.data);
        if (date) {
            let day = date.getUTCDate().toString();
            let hours = date.getHours().toString();
            let minutes = date.getMinutes().toString();
            hours = hours.length === 1 ? "0" + hours : hours;
            minutes = minutes.length === 1 ? "0" + minutes : minutes;
            day = day.length === 1 ? "0" + day : day
            dateString = `${day}/${date.getMonth() + 1}/${date.getFullYear()} - ${hours}:${minutes}`
        }
        const clientOptions = this.props.clientOptions || [];
        let sizeAdjust = 0;
        if (this.props.failure) {
            if (this.props.failure.clienteId)
                sizeAdjust = 22;
            else if (this.props.failure.cliente)
                if (this.props.failure.cliente.endereco || this.props.failure.cliente.nome)
                    sizeAdjust = 22;
        }
        const color = this.props.variant === "create" ? "secondary" : "primary";
        const cardStyle = {};
        const leftStyle = {backgroundColor: "rgb(242, 205, 141)"};
        const rightStyle = {
            height: 30,
            width: 30,
            backgroundColor: "rgb(245, 234, 138)"
        };
        const addStyle = {
            width: 30,
            height: 30,
            backgroundColor: "rgb(247, 152, 136)"
        };
        const expandStyle = {
            width: 30,
            height: 30,
            backgroundColor: "rgb(247, 152, 136)"
        };
        const contractStyle = {
            width: 30,
            height: 30,
            backgroundColor: "rgb(244, 117, 96)",
            transform: "rotate(180deg)"
        }
        let leftIcon = editIcon;
        if (this.props.variant === "create") {
            leftIcon = saveIcon;
            leftStyle.backgroundColor = "rgb(97, 205, 187)";
            cardStyle.borderTop = "6px solid rgb(244, 117, 96)";
        } else {
            switch (this.state.status) {
                case "Aberto":
                    cardStyle.borderTop = "6px solid rgb(241, 225, 91)";
                    break;
                case "Entregue":
                    cardStyle.borderTop = "6px solid rgb(97, 205, 187)";
                    break;
                case "Cancelado":
                    cardStyle.borderTop = "6px solid rgb(232, 168, 56)";
                    break;
                default:
            }
        }

        const specificsAttributes = (
            <div className="order-specifics" style={{width: this.props.data ? 446 : 266}}>
                <div>
                    <Autocomplete
                        id={"auto_status" + this.props.id}
                        options={["Aberto", "Entregue", "Cancelado"]}
                        disableClearable
                        value={this.state.status}
                        onChange={(e, newValue) => this.setState({status: newValue})}
                        style={{width: 133}}
                        renderInput={(params) => (
                            <TextField {...params} color={color}
                                       variant="filled"
                                       fullWidth
                                       id={"status" + this.props.id}
                                       label="Status"/>
                        )}/>
                </div>
                <div style={{width: 103}}>
                    <TextField color={color}
                               variant="filled"
                               id={"total" + this.props.id}
                               label="Total"
                               fullWidth
                               disabled
                               InputProps={{
                                   startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                               }}
                               value={this.state.isProductsLoaded ? this.getTotal() : this.state.total}/>
                </div>
                {this.props.data &&
                < div style={{width: 162}}>
                    <TextField color={color}
                               variant="filled"
                               id={"date" + this.props.id}
                               label="Data"
                               fullWidth
                               disabled
                               value={dateString}/>
                </div>}
            </div>
        );
        const clientNameField = this.state.createClient ? (
            <TextField color={color}
                       variant="filled"
                       fullWidth
                       id={"client_name" + this.props.id}
                       label="Nome"
                       error={Boolean(this.props.failure && this.props.failure.cliente && this.props.failure.cliente.nome)}
                       helperText={this.props.failure && this.props.failure.cliente && this.props.failure.cliente.nome}
                       value={this.state.nome}
                       onChange={e => this.setState({nome: e.target.value})}/>) : (
            <Autocomplete
                id={"auto_client_name" + this.props.id}
                options={clientOptions}
                getOptionLabel={(option) => option.nome}
                disableClearable
                value={this.state.selectedClient}
                onChange={(e, newValue) => this.setState({selectedClient: newValue})}
                style={{width: 200}}
                renderInput={(params) => (
                    <TextField {...params} color={color}
                               variant="filled"
                               fullWidth
                               error={Boolean(this.props.failure && this.props.failure.clienteId)}
                               helperText={this.props.failure && this.props.failure.clienteId}
                               id={"client_name" + this.props.id}
                               label="Nome"/>)}/>
        );
        const clientAttributes = (
            <div className="client-attributes">
                <div style={{width: 200}}>
                    {clientNameField}
                </div>
                <div style={{width: 200}}>
                    <TextField color={color}
                               variant="filled"
                               fullWidth
                               id={"address" + this.props.id}
                               disabled={!this.state.createClient}
                               error={Boolean(this.props.failure && this.props.failure.cliente && this.props.failure.cliente.endereco)}
                               helperText={this.props.failure && this.props.failure.cliente && this.props.failure.cliente.endereco}
                               label="Endereço"
                               value={this.state.createClient ? this.state.endereco : this.state.selectedClient ? this.state.selectedClient.endereco ? this.state.selectedClient.endereco : "" : ""}
                               onChange={e => this.setState({endereco: e.target.value})}/>
                </div>
                <div style={{width: 200}}>
                    <TextField color={color}
                               variant="filled"
                               fullWidth
                               id={"phone" + this.props.id}
                               disabled={!this.state.createClient}
                               label="Telefone"
                               value={
                                   this.state.createClient ? this.state.telefone :
                                       this.state.selectedClient ? this.state.selectedClient.telefone ?
                                           this.state.selectedClient.telefone : "" : ""
                               }
                               onChange={e => this.setState({telefone: e.target.value})}/>
                </div>
            </div>
        );

        return (
            <div className="order-card" style={cardStyle}>
                <div style={{height: this.state.isExpanded ? 240 : 120}} className="order-buttons-left">
                    <CircleButton icon={leftIcon}
                                  style={leftStyle}
                                  onClick={() => this.props.onLeftClick && this.props.onLeftClick(this.getOrder())}/>
                    <div style={{height: 57}}/>
                    <CircleButton style={addStyle}
                                  imgStyle={{height: 24, width: 24}}
                                  icon={this.state.createClient ? clientIcon : addClientIcon}
                                  title={this.state.createClient ? "Utilizar lista de Clientes" : "Criar Cliente"}
                                  onClick={() => this.setState({
                                      createClient: !this.state.createClient
                                  })}/>
                    <div style={{height: 47 + sizeAdjust}}/>
                    <CircleButton style={addStyle}
                                  imgStyle={{height: 24, width: 24}}
                                  icon={addProductIcon}
                                  onClick={this.addProduct}/>
                </div>
                <div className="order-attributes">
                    {specificsAttributes}
                    {clientAttributes}
                    <div style={{height: this.state.isExpanded ? 64 * (this.state.products.length + 1) : 0}}
                         className="products-list">
                        {this.makeAllProductElements()}
                    </div>
                </div>
                <div style={{height: this.state.isExpanded ? 240 + sizeAdjust + this.state.products.length * 64 : 120}}
                     className="order-buttons-right">
                    <CircleButton icon={deleteIcon}
                                  style={rightStyle}
                                  onClick={this.props.onRightClick}/>
                    <div style={{height: 57}}/>
                    <CircleButton style={this.state.isExpanded ? expandStyle : contractStyle}
                                  icon={expandIcon}
                                  onClick={this.loadProducts}/>
                    {this.state.isExpanded &&
                    <React.Fragment>
                        <div style={{height: 74 + sizeAdjust}}/>
                        {this.makeRemoveElements()}
                    </React.Fragment>
                    }
                </div>
            </div>
        );
    }
}

export default OrderCard;