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
    }

    componentDidMount() {
        this.props.products !== undefined ? this.setState({products: this.props.products}) : this.getProducts();
        console.log(this.state.products)
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


    render() {
        return <View style={styles.container}>
            <FlatList data={this.state.products} renderItem={this.renderItem} keyExtractor={product => product.id.toString()} />
        </View>
    }
}
