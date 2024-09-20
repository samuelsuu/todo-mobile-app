import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated, Easing, Image, SafeAreaView } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Set the timeout to navigate away from splash screen
    const timeout = setTimeout(onFinish, 3000);

    // Cleanup the timeout when component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Text style={styles.logoText}>Up Todo</Text>
        <Image source={require("../assets/icon.png")} style={styles.image} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1064AB',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 80,  // Change this to your desired width
    height: 80, // Change this to your desired height
    resizeMode: 'contain', // Ensures the image maintains aspect ratio
  },
});

export default SplashScreen;
