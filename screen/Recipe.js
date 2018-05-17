import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import Config from 'react-native-config';
import LoadingIndicator from '../component/LoadingIndicator';

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
  },
  image: {
    width: 360,
    height: 240,
  },
  info: {
    height: 100,
    marginTop: -100,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  creator: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#fff',
  },
  desc: {
    fontSize: 14,
    color: '#fff',
  },
  details: {
    padding: 10,
  },
  subTitle: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  ingredientDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  ingredientText: {
    flexBasis: '50%',
    fontSize: 16,
    paddingRight: 5,
    paddingBottom: 5,
  },
  methodDetails: {
    marginBottom: 10,
  },
  methodText: {
    marginBottom: 5,
    fontSize: 16,
  },
});

class Recipe extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const recipeInfo = this.props.navigation.getParam('recipeInfo', {});
    const recipeId = {
      recipeId: recipeInfo.recipe_id,
    };
    const URL = Config.ENV_SERVER_ROOT + "getRecipeDetails.php";

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(recipeId),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
    .then(response => response.json())
    .then(result => this._setRecipeDetails(result))
    .catch(error => this._handleError(error.message));
  }

  _setRecipeDetails(result) {
    this.setState({
      isLoading: false,
      recipeDetails: result,
    });
  }

  _handleError(errorMessage) {
    this.setState({
      isLoading: false,
    });
    alert("Server Error: " + errorMessage);
  }

  _renderIngredient(ingredient, index) {
    return <Text key={index} style={STYLES.ingredientText}>{ingredient.amount} {ingredient.measurement_unit} {ingredient.ingredient_name}</Text>;
  }

  _renderMethod(method, index) {
    return <Text key={index} style={STYLES.methodText}>{method.method_step}. {method.method}</Text>;
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    const recipeInfo = this.props.navigation.getParam('recipeInfo', {});
    const imageURL = Config.ENV_SERVER_ROOT + recipeInfo.recipe_image_full;

    return (
      <ScrollView style={STYLES.main}>
        <Image style={STYLES.image} source={{uri: `${imageURL}`}} />

        <View style={STYLES.info}>
          <Text style={STYLES.title}>{recipeInfo.recipe_name} <Text style={STYLES.creator}> by {recipeInfo.recipe_creator}</Text></Text>
          <Text style={STYLES.desc}>{recipeInfo.recipe_description}</Text>
        </View>

        <View style={STYLES.details}>
          <Text style={STYLES.subTitle}>INGREDIENTS</Text>
          <View style={STYLES.ingredientDetails}>
            { this.state.recipeDetails.ingredients.map((ingredient, index) => this._renderIngredient(ingredient, index)) }
          </View>

          <Text style={STYLES.subTitle}>METHODS</Text>
          <View style={STYLES.methodDetails}>
          { this.state.recipeDetails.methods.map((method, index) => this._renderMethod(method, index)) }
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Recipe;