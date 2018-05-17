import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class LoadingIndicator extends Component {
  render() {
    return (
      <View style={STYLES.container}>
        <ActivityIndicator size={ this.props.size ? this.props.size : 80 } color="#c60000" />
      </View>
    );
  }
}

export default LoadingIndicator;