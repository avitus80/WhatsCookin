import React, { Component } from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 100,
  },
  imageContainer: {
    position: 'absolute',
    top: 100,
    left: 25,
  },
  image: {
    width: 300,
    height: 235,
  },
  fridgeButton: {
    position: 'relative',
    top: 110,
    left: 180,
    width: '30%',
  }
});

class Home extends Component {
  render() {
    return (
      <View style={STYLES.main}>
        <View style={STYLES.imageContainer}>
          <Image style={STYLES.image} source={require('../images/kitchen.jpg')} />
        </View>
        <View style={STYLES.fridgeButton}>
          <Button title="My Fridge" color='#c60000' onPress={() => this.props.navigation.navigate('Menu')} />
        </View>
      </View>
    );
  }
}

export default Home;