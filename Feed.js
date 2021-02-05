import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions, ImageBackground, ScrollView} from 'react-native';
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
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
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
        console.log(this.context)
    }

    static contextType = CartContext;

    handleTap() {
        let searching = this.state.isSearching;
        this.setState({isSearching: !searching})
    }

    handleNavigate(id) {
        this.props.navigation.navigate('Product', {id: id})
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
                            <View style={{width: width / 2.2, height: 100, backgroundColor: 'powderblue'}} />
                            <View style={{width: width / 2.2, height: 100, backgroundColor: 'skyblue'}} />
                        </View>
                        <View style={styles.row}>
                            <View style={{width: width / 2.2, height: 100, backgroundColor: 'red'}} />
                            <View style={{width: width / 2.2, height: 100, backgroundColor: 'pink'}} />
                        </View>
                        <ProductList handleNavigate={this.handleNavigate} isSearching={this.state.isSearching}/>
                    </View>
                </ScrollView>
        </View>
        )
    }

}
