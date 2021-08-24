import React, {useState} from "react";
import {View, StyleSheet, Image, ScrollView, Modal, TouchableHighlight, Text, FlatList} from "react-native";
import {Avatar, Button, Card, Divider, List, Paragraph, Title} from 'react-native-paper';
import CartContext from "../../contexts/CartContext";
import {Ionicons} from "@expo/vector-icons";
import {Dimensions} from "react-native";
import UserContext from "../../contexts/UserContext";
import truncate from "../../functions/truncate";

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        width: '90%',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 50
    }
})

export default function Cart(props) {
    const heroUrl = 'https://image.freepik.com/vecteurs-libre/panier-achat-roue-client-masculin-caisse-enregistreuse_74855-14102.jpg';
    const [screenHeight, setScreenHeight] = useState(0);
    const renderProduct = ({ product }) => (
        <Item title={item.title} />
    );

    return (
        <UserContext.Consumer>
            {userContext => (
                <CartContext.Consumer>
                    {context => (
                        <View style={styles.container}>
                            <Card>
                                <Card.Cover source={{ uri: heroUrl }} />
                                <Card.Title title={`${Number(context.cartAmount).toFixed(2)} € TCC`} subtitle={`You have ${context.cartItems.length} product in your cart`}/>
                                <Card.Content>
                                    <Button disabled={context.cartItems.length === 0 || userContext.user === null}
                                            color="#FF453A"
                                            icon="cart"
                                            mode="flat"
                                            style={{fontWeight: 'bold'}}
                                            onPress={() => props.navigation.navigate('Order')}>
                                        Order
                                    </Button>
                                    <List.Section>
                                        <FlatList
                                            data={context.cartItems}
                                            renderItem={({item, index, separators}) => {
                                                let title = item.title;
                                                if (title.length > 20) {
                                                    title = truncate(title, 19)
                                                }

                                                return(
                                                    <List.Item
                                                        key={index}
                                                        title={`${title} (${item.count})`}
                                                        left={() => <Avatar.Image size={50} source={{uri: item.image}} />}
                                                        right={() =>
                                                            <Button icon={() => <Ionicons color={'red'} name={"trash-bin-outline"} size={15}/>}
                                                                    mode="filled"
                                                                    style={{justifyContent: 'center'}}
                                                                    compact={true}
                                                                    onPress={() => context.removeProduct(item.id)}
                                                            />
                                                        }
                                                        onPress={() => props.navigation.navigate('ProductView', {id: item.id})}
                                                    />)
                                            }}
                                            keyExtractor={item => item.id}
                                        />
                                    </List.Section>
                                </Card.Content>
                            </Card>
                        </View>
                    )}
                </CartContext.Consumer>
            )}
        </UserContext.Consumer>
    )
}
