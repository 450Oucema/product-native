import React from "react";
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ActivityIndicator
} from "react-native";
import {ProductItem} from "./ProductItem";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        this.handleNavigate = this.handleNavigate.bind(this)
        this.renderItem = this.renderItem.bind(this)
    }

    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(`products-${this.state.category}`, jsonValue)
        } catch (e) {
            // saving error
        }
    }

    getProducts = async () => {
        try {
            const stored = await AsyncStorage.getItem(`products-${this.state.category}`)
            if (stored !== null) {
                this.setState({products: JSON.parse(stored)})
            } else {
                fetch(apiUrl + this.state.category.replace(" ", "%20"))
                    .then(res => res.json())
                    .then((data) => {
                        this.setState({products: data});
                        this.storeData(data);
                    })
            }
        } catch (e) {
            console.log(e)
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({title: capitalizeFirstLetter(this.state.category)})
        this.getProducts();
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
            {this.state.products.length === 0 ? <ActivityIndicator size="large" style={{flex: 1, alignItems: "center"}}/> : null}
            <FlatList data={this.state.products} renderItem={this.renderItem} keyExtractor={product => product.id.toString()} />
        </View>
    }

}
