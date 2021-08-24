import React, {useState} from "react";
import {View, StyleSheet, Image, ScrollView, Modal, TouchableHighlight, Text} from "react-native";
import {Avatar, Button, Card, Divider, List, Paragraph, Title} from 'react-native-paper';
import CartContext from "../../contexts/CartContext";
import {Ionicons} from "@expo/vector-icons";
import {Dimensions} from "react-native";
import UserContext from "../../contexts/UserContext";

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
    console.log(props)
    const heroUrl = 'https://image.freepik.com/vecteurs-libre/panier-achat-roue-client-masculin-caisse-enregistreuse_74855-14102.jpg';
    const [screenHeight, setScreenHeight] = useState(0);
    const [scrollEnabled, setScrollEnabled] = useState(height);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalProduct, setModalProduct] = useState({});
    const openModal = (value, product) => {
        setModalProduct(product);
        setModalVisible(value)
    }

    return (
        <UserContext.Consumer>
            {userContext => (
                <CartContext.Consumer>
                    {context => (
                        <View style={styles.container}>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        {modalProduct.image ?
                                            <Avatar.Image size={160} source={{uri: modalProduct.image}} />
                                            : null
                                        }
                                        <List.Section>
                                            <List.Subheader>{modalProduct.title}</List.Subheader>
                                            <List.Item title={`Size ${modalProduct.size}`} left={() => <Ionicons name="shirt-outline" />} />
                                            <List.Item title={`Price ${modalProduct.price}`} left={() => <Ionicons style={{justifyContent: 'center', alignItems: 'center'}} name="pricetag-outline" />} />
                                            <List.Item onPress={() => {setModalVisible(!modalVisible);}} title="Close" left={() => <Ionicons style={{justifyContent: 'center', alignItems: 'center'}} name="close-outline" />} />
                                        </List.Section>
                                    </View>
                                </View>
                            </Modal>
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
                                                            onPress={() => props.navigation.navigate('ProductView', {id: product.id})}
                                                        />)})}
                                        </List.Section>
                                    </ScrollView>
                                    <Divider />
                                    <View style={{justifyContent: 'center'}}>
                                        <Title>{context.cartAmount} € TCC</Title>
                                        <Paragraph>{context.cartAmount - (context.cartAmount / 100) * 20} € HT</Paragraph>
                                    </View>
                                    <Button disabled={context.cartItems.length === 0 || userContext.user === null}
                                            color="#FF453A"
                                            icon="cart"
                                            mode="flat"
                                            style={{fontWeight: 'bold'}}
                                            onPress={() => props.navigation.navigate('Order')}>
                                        Order
                                    </Button>
                                </Card.Content>
                            </Card>
                        </View>
                    )}
                </CartContext.Consumer>
            )}
        </UserContext.Consumer>
    )
}
