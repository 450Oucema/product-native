import {storeData} from "../AsyncStorage/DataStorer";
import {retrieveData} from "../AsyncStorage/DataRetriever";

export function addProduct(product) {
    retrieveData('cart').then(
        (result) => {
            let cart = JSON.parse(result);
            cart.cartItems.push(product);
            storeData('cart', JSON.stringify(cart))
        }
    );
}

export function initializeCart() {
    let cart = {cartItems: []};
    storeData('cart', JSON.stringify(cart)).then(() => {
        return true;
    });
}

export function cartInitialized() {
    let cartInit = false;

    retrieveData('cart').then((result) => {
        if (JSON.parse(result).cartItems.length > 0) {
            console.log(result)
            cartInit = true;
        }
    })

    return cartInit;
}

export function getCartContent() {
    let cart =  retrieveData('cart')

    return cart;
}
