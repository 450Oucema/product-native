import React from "react";
import {FlatList, Text, View, StyleSheet, StatusBar, TextInput, Dimensions, TouchableOpacity, Image} from "react-native";
import {ProductItem} from "./ProductItem";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
    },
    search: {
        height: 40,
        borderColor: '#e9e9e9',
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 10,
        width: windowWidth / 1.5,
    }
});



export class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            search: '',
            isSearching: props.isSearching
        }
        this.getProducts = this.getProducts.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.onChangeText = this.onChangeText.bind(this)
        this.searchProducts = this.searchProducts.bind(this)
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then((data) => {
                this.setState({products: data})
            })
    }

    renderItem(product) {
        return (
            <TouchableOpacity onPress={() => this.props.handleNavigate(product.item.id)}>
                <ProductItem product={product}/>
            </TouchableOpacity>
        )
    }

    onChangeText(text) {
        this.setState({search: text})
    }

    searchProducts() {
        return this.state.products.filter((product) => {
            return product.title.indexOf(this.state.search) !== -1
        })
    }

    render() {
        return <View style={styles.container}>
            {this.props.isSearching ?
                <TextInput
                    style={styles.search}
                    onChangeText={text => this.onChangeText(text)}
                    value={this.state.search}
                    textAlign={'center'}
                /> : null
            }
            <FlatList data={this.searchProducts()} renderItem={this.renderItem} keyExtractor={product => product.id.toString()} />
        </View>
    }
}
