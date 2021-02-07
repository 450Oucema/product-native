import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import {ProductList} from "./components/ProductList";
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
const CartContext = React.createContext('light');
const {height, width} = Dimensions.get('window')
const heroSize = () => {
    let source = resolveAssetSource(require('./assets/hero-feed.jpg'))
    const screenWidth = width
    const scaleFactor = (source.width / screenWidth)
    const imageHeight = (source.height / scaleFactor)
    return {screenWidth, imageHeight}
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    baseText: {
        color: "white",
        fontSize: 30,
        textAlign: 'center',
    },
    titleText: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: 'center',
    },
    hero: {
        width: heroSize().screenWidth,
        height: heroSize().imageHeight,
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        position: 'relative',
        bottom: 0, //Here is the trick
    },
    banner: {
        flex: 0.3,
        justifyContent: 'center',
        color: "white",
        fontSize: 42,
        backgroundColor: "#000000a0",
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    category: {
        width: width / 2.2,
        height: 100,
        margin: 5,
        overflow: 'hidden',
        borderRadius: 5
    },
    categoryBackground: {
        width: '100%',
        height: '100%',
        resizeMode: "center"
    },
    categoryTitle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#00000054',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 2
    }
});


export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
        }
        this.handleTap = this.handleTap.bind(this);
        this.handleNavigate = this.handleNavigate.bind(this);
        this.handleNavigateToCategory = this.handleNavigateToCategory.bind(this);
    }

    static contextType = CartContext;

    handleTap() {
        let searching = this.state.isSearching;
        this.setState({isSearching: !searching})
    }

    handleNavigate(id) {
        this.props.navigation.navigate('Product', {id: id})
    }

    handleNavigateToCategory(category) {
        this.props.navigation.navigate('Category', {category: category})
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <ImageBackground source={require('./assets/hero-feed.jpg')} style={styles.hero}>
                            <View style={styles.banner}>
                                <Text style={styles.titleText}>Nouveautés</Text>
                                <Text style={styles.baseText}>Découvrez les dernières tendances</Text>
                            </View>
                        </ImageBackground>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => this.handleNavigateToCategory('men clothing')}>
                                <View style={styles.category}>
                                    <ImageBackground style={styles.categoryBackground} source={require('./assets/men.jpg')}>
                                        <Text style={styles.categoryTitle}>Homme</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleNavigateToCategory('women clothing')}>
                                <View style={styles.category}>
                                    <ImageBackground style={styles.categoryBackground} source={require('./assets/women.jpg')}>
                                        <Text style={styles.categoryTitle}>Femme</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => this.handleNavigateToCategory('electronics')}>
                                <View style={styles.category}>
                                    <ImageBackground style={styles.categoryBackground} source={require('./assets/electronic.jpg')}>
                                        <Text style={styles.categoryTitle}>High tech</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleNavigateToCategory('jewelery')}>
                                <View style={styles.category}>
                                    <ImageBackground style={styles.categoryBackground} source={require('./assets/jewelry.jpg')}>
                                        <Text style={styles.categoryTitle}>Bijoux</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
        </View>
        )
    }

}
