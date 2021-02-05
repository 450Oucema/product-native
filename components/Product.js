import React from "react"
import {View, Text, StyleSheet, Dimensions, ImageBackground, AsyncStorage } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import {Button} from "react-native-paper";
import { ThemeProvider } from 'styled-components/native'
import {ToastProvider, ToastContext } from 'react-native-styled-toast'
import CartProvider from "../providers/CartProvider";
import CartContext from "../contexts/CartContext";

const deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex: 1,
        bottom: 0,
        position: 'absolute',
        width: deviceWidth,
        backgroundColor: "white",
    },
    heroImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        opacity: 0.6
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

let pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        backgroundColor: 'white',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        margin: 20,
        textAlign: 'center'
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon,
        margin: 20,
        textAlign: 'center',
        backgroundColor: 'white'
    }
});

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
        this.state = {
            product: {},
            size: '',
            pickerStyle: pickerSelectStyles
        }

        this.sizeAvailables = [
            { label: 'XS', value: 'XS' },
            { label: 'S', value: 'S' },
            { label: 'M', value: 'M' },
            { label: 'L', value: 'L' },
            { label: 'XL', value: 'XL' },
            { label: 'XXL', value: 'XXL' },
        ];

        console.log(props.route.params.id)
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

    render() {
        return (
            <ThemeProvider theme={toastStyle}>
                <CartContext.Consumer>
                    {(context) => {
                        //console.log(context)
                        return (
                        <ToastProvider>
                            <ImageBackground source={{uri: this.state.product.image}} style={styles.heroImage} blurRadius={1}>
                            </ImageBackground>
                            <View style={styles.container}>
                                <Text style={styles.title}>{this.state.product.title}</Text>
                                <Text style={styles.price}>{this.state.product.price} €</Text>
                                <RNPickerSelect
                                    placeholder={{label: "Select a size.."}}
                                    items={this.sizeAvailables}
                                    onValueChange={value => {
                                        this.selectedSize(value)
                                    }}
                                    style={pickerSelectStyles}
                                    value={this.state.size}
                                    useNativeAndroidPickerStyle={false}
                                />
                                <ToastContext.Consumer>
                                    {({ toast }) => { return (
                                        <Button disabled={!this.isSizeSelected()} color="#FF453A" icon="cart" mode="flat" onPress={() => {
                                            this.handleAddToCart(toast);
                                            context.addProduct(this.state.product)
                                        }}>
                                            Add to cart
                                        </Button>)}}
                                </ToastContext.Consumer>
                            </View>
                        </ToastProvider>
                    )}}
                </CartContext.Consumer>
            </ThemeProvider>
        );
    }

}
