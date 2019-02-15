import React, { Component } from 'react'
import Recipe from "./Recipe";
import RecipSearch from './RecipeSearch';

export default class RecipeList extends Component {
  render() {
    const {recipes, handleDetails, handleSubmit, handleChange, value, error} = this.props;

    return (
      <React.Fragment>
        <RecipSearch handleChange={handleChange} handleSubmit={handleSubmit} value={value}/>
          <div className="container my-5">
            {/* title */}
            <div className="row">
              <div className="col-10 mx-auto col-md-6 text-center text-uppercase mb-3">
                <h1 className="text-slanted">recipe list</h1>
              </div>
            </div>
            {/* end title */}
            <div className="row">
            {error ? (
                <h1 className="text-danger text-center text-capitalize">{error}</h1>
            ) : 
                recipes.map(recipe => {
                    return <Recipe key={recipe.recipe_id} recipe={recipe} handleDetails={handleDetails}/>
                })
            }
            </div>
          </div>
      </React.Fragment>
    )
  }
}
