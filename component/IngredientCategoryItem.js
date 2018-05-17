import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IngredientList from './IngredientList';

const STYLES = StyleSheet.create({
  main: {
    marginBottom: 10,
  },
  categoryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c0c0c0',
  },
  image: {
    width: 50,
    height: 50,
  },  
  title: {
    flexGrow: 1,
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: 'bold'
  },  
  arrow: {
    paddingLeft: 10,
    paddingRight: 20
  },  
});

class IngredientCategoryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: true, // temporarily force open all categories
    }
  }

  _renderIngredientList(ingredients) {
    return (
      <IngredientList ingredients={ingredients} onPress={(itemId) => this.props.onPress(itemId, this.props.catId)} />
    );
  }

  _handleClick() {
    // temporarily disabled
    /* this.setState({
      isOpened: !this.state.isOpened,
    }); */
  }

  render() {
    const ingredientList = this.props.ingredientList;
    const imageURL = Config.ENV_SERVER_ROOT + ingredientList.image;
    
    return (
      <View style={STYLES.main}>
        <TouchableOpacity style={STYLES.categoryItem} activeOpacity={1} onPress={() => this._handleClick()}>
          <Image style={STYLES.image} source={{uri: `${imageURL}`}} />
          <Text style={STYLES.title}>{ingredientList.category.toUpperCase()}</Text>
          {/* <Ionicons style={STYLES.arrow} name={this.state.isOpened ? 'ios-arrow-down' : 'ios-arrow-forward'} size={24} /> */}
        </TouchableOpacity>
        { this.state.isOpened ? this._renderIngredientList(ingredientList.items) : null }
      </View>
    );
  }
}

export default IngredientCategoryItem;