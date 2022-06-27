import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {
  TapGestureHandler,
  useAnimatedGestureHandler,
} from 'react-native-gesture-handler';

export default function TapGestureHandlerExample() {
  const pressed = useSharedValue(0);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = 1;
    },
    onEnd: (event, ctx) => {
      pressed.value = 0;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = withSpring(
      interpolateColor(pressed.value, [0, 1], ['yellow', 'red']),
    );

    return {
      backgroundColor,
      transform: [{scale: withTiming(pressed.value ? 3 : 1, {duration: 700})}],
    };
  });

  return (
    <View style={styles.wrapper}>
      <TapGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[animatedStyle, styles.ball]} />
      </TapGestureHandler>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    width: 100,
    height: 100,
    backgroundColor: '#631d94',
  },
});
