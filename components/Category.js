import React from "react";
import {View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, StatusBar} from "react-native";
import {ProductList} from "./ProductList";
import {ProductItem} from "./ProductItem";

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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const apiUrl = 'https://fakestoreapi.com/products/category/';

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: props.route.params.category,
            products: []
        }
        props.navigation.setOptions({title: capitalizeFirstLetter(this.state.category)})
        this.handleNavigate = this.handleNavigate.bind(this)
        this.renderItem = this.renderItem.bind(this)
    }

    componentDidMount() {
        fetch(apiUrl + this.state.category.replace(" ", "%20"))
            .then(res => res.json())
            .then((data) => {
                this.setState({products: data})
            })
    }

    handleNavigate(id) {
        console.log(this.props)
        this.props.navigation.navigate('Product', {id: id})
    }

    renderItem(product) {
        return (
            <TouchableOpacity onPress={() => this.handleNavigate(product.item.id)}>
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
