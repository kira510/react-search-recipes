import React, { Component } from 'react';
//import {recipe} from '../tempDetails';

export default class RecipeDetails extends Component {
  constructor (props) {
      super(props);

      this.state = {
          recipe: [],
          url: `https://www.food2fork.com/api/get?key=317c9cf13d5015cf8ea0a3cf0917eabd&rId=${this.props.id}`
      }
  }

  async componentWillMount () {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      this.setState({
          recipe: jsonData.recipe
      });
    } catch (e) {
        console.log(e)
    }
  }

  render() {
    const {image_url, title, publisher, publisher_url, source_url, ingredients} = this.state.recipe;
    const {toggle} = this.props;
    let uiContent = "";

    if (this.state.recipe.length !== 0) {
        uiContent = <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
            <button type="button" className="btn btn-warning mb-5 text-capitalize" onClick={() => toggle(1)}>back to recipe list</button>
            <img src={image_url} className="d-block w-100" alt="recipe" />
          </div>
          <div className="col-10 mx-auto col-md-6 my-3">
            <h6 className="text-uppercase">{title}</h6>
            <h6 className="text-warning text-capitalize text-slanted">provided by {publisher}</h6>
            <a href={publisher_url} className="btn btn-primary text-capitalize mt-2" target="_blank" rel="noopener noreferrer">publisher webpage</a>
            <a href={source_url} className="btn btn-success text-capitalize mt-2 mx-3" target="_blank" rel="noopener noreferrer">recipe url</a>
            <ul className="list-group mt-4">
              <h2 className="mt-3 mb-4">Ingredients</h2>
              {ingredients.map((ingredient, index) => {
                  return <li className="list-group-item text-slanted" key={index}>{ingredient}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    }
    return (
      <React.Fragment>
        {uiContent}
      </React.Fragment>
    )
  }
}
