import React, {useState} from "react";
import {View, StyleSheet, Image, ScrollView} from "react-native";
import {Avatar, Button, Card, List} from 'react-native-paper';
import CartContext from "../contexts/CartContext";
import {Ionicons} from "@expo/vector-icons";
import {Dimensions} from "react-native";

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})

export default function Cart() {
    const heroUrl = 'https://image.freepik.com/vecteurs-libre/panier-achat-roue-client-masculin-caisse-enregistreuse_74855-14102.jpg';
    const [screenHeight, setScreenHeight] = useState(0);
    const [scrollEnabled, setScrollEnabled] = useState(height);
        return (
            <CartContext.Consumer>
                {context => (
                    <View style={styles.container}>
                        <Card>
                            <Card.Cover source={{ uri: heroUrl }} />
                            <Card.Title title="Cart" subtitle={`You have ${context.cartItems.length} product in your cart`}/>
                            <Card.Content>
                                <ScrollView scrollEnabled={scrollEnabled} onContentSizeChange={(contentWidth, contentHeight) => {
                                    setScreenHeight(contentHeight)
                                }}>
                                    <List.Section>
                                        {context.cartItems.map(
                                            (product, index) => {
                                                let title = product.title;
                                                if (title.length > 20) {
                                                    title = `${title.substring(0,19)}...`
                                                }
                                                return(
                                                <List.Item
                                                    key={index}
                                                    title={`${title} (${product.count})`}
                                                    left={() => <Avatar.Image size={50} source={{uri: product.image}} />}
                                                    right={() =>
                                                        <Button icon={() => <Ionicons color={'red'} name={"trash-bin-outline"} size={15}/>}
                                                                mode="filled"
                                                                style={{justifyContent: 'center'}}
                                                                compact={true}
                                                                onPress={() => context.removeProduct(product.id)}
                                                        />
                                                    }
                                                />
                                            )}
                                        )}
                                    </List.Section>
                                </ScrollView>
                            </Card.Content>
                        </Card>
                    </View>
                )}
            </CartContext.Consumer>
        )
}
