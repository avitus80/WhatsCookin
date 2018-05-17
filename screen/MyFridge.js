import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import Config from 'react-native-config';
import LoadingIndicator from '../component/LoadingIndicator';
import IngredientList from '../component/IngredientList';
import IngredientCategoryItem from '../component/IngredientCategoryItem';

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
  },
  subTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedList: {
    width: '100%',
    minHeight: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#c0c0c0',
  },
  selectedItem: {
    padding: 5,
  },
  selectionList: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    alignSelf: 'center',
    width: '40%',
    borderRadius: 10,
    overflow: 'hidden',
  }
});

class MyFridge extends Component {
  static navigationOptions = {
    title: 'MY FRIDGE',
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      selectedIngredients: [],
    }
  }

  componentDidMount() {
    const URL = Config.ENV_SERVER_ROOT + "getIngredientSelectionList.php";

    fetch(URL)
    .then(response => response.json())
    .then(result => this._setIngredientList(result))
    .catch(error => this._handleError(error.message));
  }

  _setIngredientList(result) {
    if ("errorMessage" in result) {
      this._handleError(result.errorMessage);
    } else {
      this.setState({
        isLoading: false,
        ingredientList: result,
      });
    }
  }

  _handleError(errorMessage) {
    this.setState({
      isLoading: false,
    });
    alert("Server Error: " + errorMessage);
  }

  _handleClick(itemId, catId) {
    let selectedIngredientName = this.state.ingredientList[catId - 1].items[itemId];

    let selectedIngredients = this.state.selectedIngredients;
    let ingredientIndex = selectedIngredients.indexOf(selectedIngredientName);
    if (ingredientIndex === -1) { 
      selectedIngredients.push(selectedIngredientName);
    } else {
      selectedIngredients.splice(ingredientIndex, 1);
    }

    this.setState({
      selectedIngredients: selectedIngredients,
    });
  }

  _renderSelectedIngredients(ingredientName, index) {
    return (
      <Text style={STYLES.selectedItem} key={index}>{ingredientName},</Text>
    );
  }

  _renderIngredientCategoryItem(ingredients) {
    return (
      <IngredientCategoryItem catId={ingredients.id} ingredientList={ingredients} onPress={(itemId, catId) => this._handleClick(itemId, catId)} />
    );
  }

  render() {
    return (
      <View style={STYLES.main}>
        <Text style={STYLES.subTitle}>SELECTED INGREDIENTS</Text>
        <View style={STYLES.selectedList}>
          { this.state.selectedIngredients.map((ingredientName, index) => this._renderSelectedIngredients(ingredientName, index)) }  
        </View>

        <Text style={STYLES.subTitle}>SELECTION</Text>
        { this.state.isLoading ?
          (<LoadingIndicator />)
          :
          (<FlatList style={STYLES.selectionList} data={this.state.ingredientList} renderItem={ ({item}) => this._renderIngredientCategoryItem(item) } keyExtractor={ (item, index) => item.id.toString()} />)
        }
        
        <View style={STYLES.button}>
          <Button title="Search" color='#c60000' onPress={() => this.props.navigation.navigate('RecipeResults', {ingredients: this.state.selectedIngredients})} disabled={this.state.selectedIngredients.length > 0 ? false : true}/>
        </View>
      </View>
    );
  }
}

export default MyFridge;