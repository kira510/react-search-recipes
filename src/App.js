import React, { Component } from 'react';
import './App.css';
//import { recipes } from './tempList';
import RecipeList from './Components/RecipeList';
import RecipeDetails from './Components/RecipeDetails';

class App extends Component {
  state = {
    recipes: [],
    url: "https://www.food2fork.com/api/search?key=317c9cf13d5015cf8ea0a3cf0917eabd",
    details_id: 35382,
    pageIndex: 1,
    search: "",
    query: "&q=",
    baseUrl: "https://www.food2fork.com/api/search?key=317c9cf13d5015cf8ea0a3cf0917eabd",
    error: ""
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit");
    const {baseUrl, query, search} = this.state;

    this.setState({
      url: `${baseUrl}${query}${search}`,
      search: ""
    }, () => {
      this.getRecipes();
    })
  }

  async getRecipes () {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      if (jsonData.recipes.length === 0) {
        this.setState({
          error: "sorry no recipe found for the search you made"
        });
      } else {
        this.setState({
          recipes: jsonData.recipes,
          error: ""
        });
      }
      
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount () {
    this.getRecipes();
  }

  togglePage = (index) => {
    this.setState({
      pageIndex: index
    });
  }

  handleDetails = (index, id) => {
    this.setState({
      details_id: id,
      pageIndex: index
    });
  }

  displayPage = (index) => {
    switch(index) {
      default: 
      case(1): { 
        return <RecipeList recipes={this.state.recipes} 
                  handleDetails={this.handleDetails}
                  value={this.state.search}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  error={this.state.error}
                />
      }
      case(0): { return <RecipeDetails id={this.state.details_id} toggle={this.togglePage}/> } 
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.displayPage(this.state.pageIndex)}
      </React.Fragment>
    );
  }
}

export default App;
