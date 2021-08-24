import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import truncate from "../../../functions/truncate";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
export const ProductItem = ({product}) => {
    let title = truncate(product.item.title, 35);
    return (
        <View style={styles.item}>
            <Image source={{uri: product.item.image}} style={styles.avatar}/>
            <Text style={styles.itemText}>{title}</Text>
        </View>
    )
}
