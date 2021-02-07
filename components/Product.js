import React, {useRef} from "react"
import {View, Text, StyleSheet, Dimensions, Image} from "react-native";
import {Button} from "react-native-paper";
import { ThemeProvider } from 'styled-components/native'
import {ToastProvider, ToastContext } from 'react-native-styled-toast'
import CartContext from "../contexts/CartContext";
import Select from "./forms/select/Select";
import {ImageHeaderScrollView, TriggeringView} from "react-native-image-header-scroll-view";

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "white",
        height: height / 2
    },
    cover: {
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 100,
        position: 'absolute',
        bottom: 0,
        height: '100%'
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "left",
        margin: 20
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginLeft: 30
    },
    size: {
        fontSize: 20,
        textAlign: "left",
        marginTop: 30,
        marginLeft: 30
    }
})

const toastStyle =  {
    space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
    colors: {
        text: '#0A0A0A',
        background: '#FFF',
        border: '#E2E8F0',
        muted: '#F0F1F3',
        success: '#7DBE31',
        error: '#FC0021',
        info: '#00FFFF'
    }
}

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            product: {},
            size: '',
        }

        this.selectRef = React.createRef();
        this.sizeAvailables = [
            { label: 'XS', value: 'XS' },
            { label: 'S', value: 'S' },
            { label: 'M', value: 'M' },
            { label: 'L', value: 'L' },
            { label: 'XL', value: 'XL' },
            { label: 'XXL', value: 'XXL' },
        ];

        this.getProduct = this.getProduct.bind(this)
        this.selectedSize = this.selectedSize.bind(this)
    }

    componentDidMount() {
        this.getProduct();
    }

    getProduct() {
        fetch('https://fakestoreapi.com/products/' + this.props.route.params.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({product: data})
            })
    }

    selectedSize(value) {
        this.setState({
            size: value
        });
    }

    handleAddToCart(toast) {
        if (this.isSizeSelected()) {
            toast({
                message: 'Product added to the cart.'
            })
        }
    }

    isSizeSelected() {
        return this.state.size.length > 0;
    }

    handleHidden = () => {
        this.selectRef.current.handleClose();
    }

    render() {

        return (
            <ThemeProvider theme={toastStyle}>
                <CartContext.Consumer>
                    {(context) => {
                        return (
                        <ToastProvider>
                            <ImageHeaderScrollView
                                maxHeight={500}
                                minHeight={100}
                                headerImage={{uri: this.state.product.image}}
                            >
                            <View style={styles.container}>
                                <TriggeringView>
                                    <Text style={styles.title}>{this.state.product.title}</Text>
                                    <Text style={styles.price}>{this.state.product.price} €</Text>
                                    <Text>{this.state.product.description} €</Text>
                                    <Select choices={this.sizeAvailables} ref={this.selectRef} title={`Sizes.. ${this.state.size}`} iconName="shirt-outline" handleSelect={this.selectedSize}/>
                                    <ToastContext.Consumer>
                                        {({ toast }) => { return (
                                            <Button disabled={!this.isSizeSelected()} color="#FF453A" icon="cart" mode="flat" onPress={() => {
                                                this.handleAddToCart(toast);
                                                context.addProduct(this.state.product)
                                            }}>
                                                Add to cart
                                            </Button>)}}
                                    </ToastContext.Consumer>
                                </TriggeringView>
                            </View>
                            </ImageHeaderScrollView>
                        </ToastProvider>
                    )}}
                </CartContext.Consumer>
            </ThemeProvider>
        );
    }

}
