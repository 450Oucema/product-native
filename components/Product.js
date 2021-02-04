import React from "react"
import {View, Text, StyleSheet, Image, Dimensions, ScrollView, ImageBackground} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import {Button} from "react-native-paper";

const deviceHeight = Dimensions.get('window').height
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

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            size: '',
            pickerStyle: pickerSelectStyles
        }
        console.log(props.route.params.id)
        this.getProducts = this.getProducts.bind(this)
        this.selectedSize = this.selectedSize.bind(this)
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
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
        console.log(value)
    }

    render() {
        return (
            <React.Fragment>
                <ImageBackground source={{uri: this.state.product.image}} style={styles.heroImage} blurRadius={1}>
                </ImageBackground>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.state.product.title}</Text>
                    <Text style={styles.price}>{this.state.product.price} €</Text>
                    <RNPickerSelect
                        placeholder={{label: "Select a size.."}}
                        items={[
                            { label: 'XS', value: 'XS' },
                            { label: 'S', value: 'S' },
                            { label: 'M', value: 'M' },
                            { label: 'L', value: 'L' },
                            { label: 'XL', value: 'XL' },
                            { label: 'XXL', value: 'XXL' },
                        ]}
                        onValueChange={value => {
                            this.selectedSize(value)
                        }}
                        style={pickerSelectStyles}
                        value={this.state.size}
                        useNativeAndroidPickerStyle={false}
                    />
                    <Button icon="cart" style={{backgroundColor: 'rgb(255, 69, 58)'}} mode="contained" onPress={() => console.log('Pressed')}>
                        Add to cart
                    </Button>
                </View>
            </React.Fragment>

        );
    }

}
