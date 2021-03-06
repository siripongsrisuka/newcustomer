

import React, {useEffect,useRef} from 'react'
import {View, Text, StyleSheet, Dimensions, Animated, FlatList} from 'react-native'
import CarouselItem from './CarouselItem'

const {width, height} = Dimensions.get('window')

const Carousel = ({data}) => {
    const flatListRef = useRef(null)
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX ,width)

    useEffect(() => {
        const numberOfData = data.length
        let scrollValue = 0, scrolled = 0

        const infiniteScroll= setInterval(function(){  // this function do and return ifself instant to 'infiniteScroll'
            scrolled ++
            if(scrolled < numberOfData)
                scrollValue = scrollValue + width
            else {
                scrollValue = 0
                scrolled = 0
            }

            flatListRef.current.scrollToOffset({animated: true, offset: scrollValue})
        },3000)

        // useEffect cleanup function,unsubscribe value eg. setInterval() to stop this command work when change stack
        //(it'll can't find flatlist component.So,error occur when user logout this app), avoid memory leakage to retain performance and prevent hacking
        return ()=>{
            clearInterval(infiniteScroll);
            flatListRef.current = null
        }

    },[])
    
    if(data && data.length){
        return(
            <View style={{height:200}} >
                <FlatList
                    ref={flatListRef}
                    data={data}
                    keyExtractor = {(item, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment = 'center'
                    scrollEventThrottle = {16}
                    decelerationRate = {'fast'}    
                    showsHorizontalScrollIndicator = {false}
                    renderItem = {({item}) => {
                        return <CarouselItem item={item} />
                    }}
                    onScroll = {Animated.event(
                        [{ nativeEvent: {contentOffset: { x: scrollX}}}], 
                        {useNativeDriver: false}
                    )}
                />
              
                <View style={styles.dotView}  >
                    {data.map((a, i) => {
                        let opacity = position.interpolate({
                                inputRange: [i-3,i-2,i-1,i,i+1,i+2,i+3],
                                outputRange: [0.1,0.3,0.5,1,0.5,0.3,0.1],
                                extrapolate: 'clamp'
                        })
                        return(
                            <Animated.View
                                key = {i}
                                style= {{opacity, height:7, width:7,backgroundColor: '#ff6900', margin: 8,borderRadius:5}}
                            />
                        )
                        })}
                </View>
          
            </View>
        )
    }else{
        console.log('nodata')
        return <Text>why nodata</Text>
    }
    

}

const styles = StyleSheet.create({
    dotView:{
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
        marginTop:width/2.2,
        alignSelf:'center',
        zIndex:99
    }
})

export default Carousel;



































/* 
import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, Animated, FlatList} from 'react-native'
import CarouselItem from './CarouselItem'

const {width, height} = Dimensions.get('window')

let flatList
function infiniteScroll(dataList){
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0

    setInterval(function(){
        scrolled ++
        if(scrolled < numberOfData)
            scrollValue = scrollValue + width
         else {
            scrollValue = 0
            scrolled = 0
        }

        this.flatList.scrollToOffset({animated: true, offset: scrollValue})
    },3000)
}

const Carousel = ({data}) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX ,width)

    const [dataList, setDataList ] = useState(data)
    useEffect(() => {
        setDataList(data)
        infiniteScroll(dataList)
    },[])
    if(data && data.length){
        return(
            <View style={{height:200}} >
                <FlatList
                ref = {(flatList) => {this.flatList = flatList}}
                data={data}
                keyExtractor = {(item, index) => index.toString()}
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment = 'center'
                scrollEventThrottle = {16}
                decelerationRate = {'fast'}    
                showsHorizontalScrollIndicator = {false}
                renderItem = {({item}) => {
                    return <CarouselItem item={item} />
                }}
                onScroll = {Animated.event(
                    [{ nativeEvent: {contentOffset: { x: scrollX}}}], 
                    {useNativeDriver: false}
                )}
                
                />
              
                <View style={styles.dotView}  >
                    {data.map((a, i) => {
                        let opacity = position.interpolate({
                                inputRange: [i-2,i-1,i,i+1,i+2],
                                outputRange: [0.1,0.3,1,0.3,0.1],
                                extrapolate: 'clamp'
                        })
                        return(
                            <Animated.View
                                key = {i}
                                style= {{opacity, height:7, width:7,backgroundColor: '#ff6900', margin: 8,borderRadius:5}}
                            />
                        )
                        })}
                </View>
          
            </View>
        )
    }
    console.log('nodata')
    return <Text>why nodata</Text>
}

const styles = StyleSheet.create({
    dotView:{
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
        marginTop:width/2.2,
        alignSelf:'center',
        zIndex:99
    }
})

export default Carousel;
*/