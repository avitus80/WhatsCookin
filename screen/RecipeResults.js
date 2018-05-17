import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Text, Button } from 'react-native';
import Config from 'react-native-config';
import LoadingIndicator from '../component/LoadingIndicator';

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
    padding: 15,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#c0c0c0',
  },
  image: {
    width: 100,
    height: 120
  },
  info: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  smallText: {
    marginBottom: 5,
    fontSize: 12,
    color: '#000',
  },
  text: {
    fontSize: 14,
  },
  msgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btn: {
    width: '40%',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  }
});

class RecipeResults extends Component {
  static navigationOptions = {
    title: 'RECIPES',
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      recipeList: [],
    }
  }

  componentDidMount() {
    const ingredients = this.props.navigation.getParam('ingredients', []);

    if (ingredients.length > 0) {
      const URL = Config.ENV_SERVER_ROOT + "getMatchingRecipes.php";

      fetch(URL, {
        method: 'POST',
        body: JSON.stringify(ingredients),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(response => response.json())
      .then(result => this._setRecipeList(result))
      .catch(error => this._handleError(error.message));
    } else {
      //console.log("No ingredient selected!");
      this._setRecipeList([]);
    }
  }

  _setRecipeList(result) {
    //console.log(result);
    this.setState({
      isLoading: false,
      recipeList: result,
    });
  }

  _handleError(errorMessage) {
    this.setState({
      isLoading: false,
    });
    alert("Server Error: " + errorMessage);
  }

  _renderRecipes(recipe) {
    const imageURL = Config.ENV_SERVER_ROOT + recipe.recipe_image_small;

    return (
      <TouchableOpacity style={STYLES.list} activeOpacity={1} onPress={() => this.props.navigation.navigate('Recipe', {recipeInfo: recipe})}>
        <Image style={STYLES.image} source={{uri: `${imageURL}`}} />
        <View style={STYLES.info}>
          <Text style={STYLES.title}>{recipe.recipe_name}</Text>
          <Text style={STYLES.smallText}>by {recipe.recipe_creator}</Text>
          <Text style={STYLES.text}>{recipe.recipe_description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {    
    return (
      <View style={STYLES.main}>
        { this.state.isLoading ?
          (<LoadingIndicator />)
          :      
          ( this.state.recipeList.length > 0 ?
            (<FlatList data={this.state.recipeList} renderItem={ ({item}) => this._renderRecipes(item) } keyExtractor={ (item, index) => item.recipe_id.toString()} />)
            :
            (<View style={STYLES.msgContainer}>
              <Text style={STYLES.msg}>NO RECIPE FOUND</Text>
              <Text style={STYLES.msg}>please select more ingredients</Text>
              <View style={STYLES.btn}>
                <Button title="Back" color="#c60000" onPress={() => this.props.navigation.goBack()} />
              </View>
            </View>)
          )
        }
      </View>
    );
  }
}

export default RecipeResults;