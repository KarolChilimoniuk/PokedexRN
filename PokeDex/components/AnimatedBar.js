import React, {useRef, useEffect} from "react";
import {Animated, View} from "react-native";

const AnimatedBar = ({value, index}) => {
   const width = useRef(new Animated.Value(0)).current;

   const animate = () => {
       Animated.timing(width, {
           toValue: value,
           delay: index*150,
           useNativeDriver: false,
       }).start();
   }

   const interpolatedValue = width.interpolate(
       {
           inputRange: [0, 255],
           outputRange: [0, 100],
       }
   )

   useEffect(() => {
     animate();
   }, [value]);

   return (<Animated.View style={[styles.bar, {width}]}></Animated.View>);
}

const styles = {
    bar: {
        height: 8,
        backgroundColor: `#516AAC`,
    }
}
export default AnimatedBar;