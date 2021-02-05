import CartContext from "../contexts/CartContext";
import React, {Component} from "react";

export default class CartProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: []
        }
    }
    
    render() {
        return (
            <CartContext.Provider value={{
                cartItems: this.state.cartItems,
                addProduct: addedProduct => {
                    let existingProduct = this.state.cartItems.find(product => product.id === addedProduct.id)
                    let actualItems;

                    if (existingProduct) {
                        existingProduct.count++;
                        actualItems = {...this.state}.cartItems;
                        let index = actualItems.findIndex(product => product.id === existingProduct.id)
                        actualItems[index] = existingProduct;
                    } else {
                        addedProduct.count = 1;
                        actualItems = {...this.state}.cartItems.concat(addedProduct);
                    }
                    this.setState({
                        cartItems: actualItems
                    })
                },
                removeProduct: id => {
                    const actualItems = {...this.state}.cartItems.filter(product => product.id !== id);
                    this.setState({
                        cartItems: actualItems
                    })
                },
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}
