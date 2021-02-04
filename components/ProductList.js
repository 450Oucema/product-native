import React from "react";
import {FlatList, Text, View, StyleSheet, StatusBar, TextInput, Dimensions, TouchableOpacity, Image} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";

const windowWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        backgroundColor: '#f8f8f8',
        padding: 20,
        marginVertical: 8,
        justifyContent: 'space-between',
        flex: 1,
        shadowColor: '#2f2f2f',
        borderRadius: 5,
        shadowRadius: 2,
        shadowOpacity: 0.03,
        width: windowWidth / 1.1,
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    avatar: {
        width: 40,
        height: 40,
        justifyContent: 'flex-end',
        borderRadius: 50,
        margin: 5
    },
    itemText: {
        justifyContent: 'flex-start'
    }
});

const ProductItem = ({product}) => {
    let title = product.item.title;
    if (title.length > 35) {
        title = `${title.substring(0,34)}...`
    }
    return (
        <View style={styles.item}>
            <Image source={{uri: product.item.image}} style={styles.avatar}/>
            <Text style={styles.itemText}>{title}</Text>
        </View>
    )
}

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
