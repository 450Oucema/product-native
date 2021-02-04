import React from "react";
import {Dimensions, Image, StyleSheet, View} from "react-native";

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Frog_Design_logo.svg/1200px-Frog_Design_logo.svg.png',
            imgWidth: 0,
            imgHeight: 0
        }
    }

    componentDidMount() {
        Image.getSize(this.state.imageUrl, (width, height) => {
            const screenWidth = Dimensions.get('window').width / 3
            const scaleFactor = (width / screenWidth)
            const imageHeight = (height / scaleFactor) / 3
            this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
        })
    }

    getLogoStyles() {
        let styles = {
            logo: {
                width: this.state.imgWidth,
                height: this.state.imgHeight,
                justifyContent: 'center',
                resizeMode: 'contain',
                margin: 0
            }
        }

        return StyleSheet.create(styles);
    }

    render() {
        return (
            <View>
                <Image source={{uri: this.state.imageUrl}} style={this.getLogoStyles().logo}/>
            </View>
        );
    }
}
