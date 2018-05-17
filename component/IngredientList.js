import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import IngredientItem from './IngredientItem';

const STYLES = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#c0c0c0',
  },
});

class IngredientList extends Component {
  _renderIngredient(ingredient, index) {
    return (
      <IngredientItem key={index} itemId={index} ingredientName={ingredient} onPress={(itemId) => this.props.onPress(itemId)} />
    );
  }
  
  render() {
    return (
      <View style={STYLES.main}>
        { this.props.ingredients.map((ingredient, index) => this._renderIngredient(ingredient, index)) }
      </View>
    );
  }
}

export default IngredientList;