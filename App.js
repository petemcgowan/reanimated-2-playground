import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Animated, {
  withSequence,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';
// import TapGestureHandlerExample from './TapGestureHandlerExample';

const {width} = Dimensions.get('window');
const App: () => React$Node = () => {
  const animation1 = useSharedValue(0);
  const animation2 = useSharedValue(0);
  const animation3 = useSharedValue(1);

  const animationStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animation1.value,
        },
      ],
    };
  });
  const animationStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animation2.value,
        },
      ],
    };
  });
  const animationStyle3 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: animation3.value,
          // scaleY: animation3.value,
        },
      ],
    };
  });
  const startAnimation1 = () => {
    //animation.value = withTiming(width)
    animation1.value = withSequence(
      withTiming(width / 2, {duration: 1000}),
      withTiming(-(width / 2), {duration: 600}),
      withTiming(0, {duration: 1500}),
    );
  };
  const startAnimation2 = () => {
    animation2.value = withSequence(
      withTiming(-width / 2, {duration: 1000}),
      withTiming(width / 2, {duration: 600}),
      withTiming(0, {duration: 1500}),
    );
  };
  const startAnimation3 = () => {
    animation3.value = withSequence(
      withTiming(1, {duration: 1000}),
      withTiming(1.35, {duration: 600}),
      withTiming(1, {duration: 1500}),
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={startAnimation1}>
        <Animated.View style={[styles.box, animationStyle1]} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={startAnimation2}>
        <Animated.View style={[styles.box, animationStyle2]} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={startAnimation3}>
        <Animated.View style={[styles.box, animationStyle3]} />
      </TouchableWithoutFeedback>
      {/* <TapGestureHandlerExample /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    // transform: [{scaleX: 2}],
    backgroundColor: '#631d94',
  },
});

export default App;

// minDist={100}
// activeOffsetX={}
// failOffsetX={}
