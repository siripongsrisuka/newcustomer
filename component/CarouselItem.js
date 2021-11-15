import React from 'react'
import {View, StyleSheet, Text, Image, Dimensions,TouchableOpacity,Linking} from 'react-native'

const {width, height} = Dimensions.get('window')

const CarouselItem = ({item}) => {

    function link(){
        if(item.link !== ''){
            Linking.openURL(item.link)
        } 
    }
    return(
        <TouchableOpacity style={styles.cardView} onPress={link} >
            <Image style={styles.image} source = {{uri:item.uri}} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardView : {
        flex:1,
        width: width,
        height: 310,
        backgroundColor:'white',
    },

    textView: {
        position:'absolute',
        bottom:10,
        margin:10,
        left:5
    },

    image: {
        width: width,
        height:width/1.9,
    },
    ItemTitle: {
        color:'white',
        fontSize:22,
        shadowColor:'#000',
        shadowOffset:{width:0.8,height:0.8},
        shadowOpacity:1,
        marginBottom:5,
        fontWeight:'bold',
        elevation:5
    },

})

export default CarouselItem;