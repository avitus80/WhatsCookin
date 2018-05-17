import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const STYLES = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 5,
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
  },
});

class IngredientItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
    }
  }

  _handleClick() {
    this.setState({
      isSelected: !this.state.isSelected,
    });
    
    this.props.onPress(this.props.itemId);
  }

  render() {
    return (
      <TouchableOpacity style={STYLES.main} activeOpacity={0.5} onPress={() => this._handleClick()}>
        <Ionicons style={STYLES.icon} name='ios-checkmark' size={28} color={this.state.isSelected ? '#fd974f' : '#c0c0c0'} />
        <Text style={STYLES.text}>{this.props.ingredientName}</Text>
      </TouchableOpacity>
    );
  }
}

export default IngredientItem;