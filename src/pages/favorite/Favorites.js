import React, { useContext, useEffect, useState } from "react";
import { MYContext } from "../../context";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import RecipeCard from "../../componets/recipecard";

function Favorites() {
  const { user } = useContext(MYContext);
  const [favorite, setFavourite] = useState([]);
  useEffect(() => {
    if (user.favorite.length) {
      const requests = user.favorite.map((favorite) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favorite}`
        ).then((res) => res.json())
      );
      Promise.all(requests).then((res) => setFavourite(res));
    }
  }, [user]);
  if (!user.favorite.length) {
    return (
      <div>
        <h3>You don't have any Favorite recipies yet</h3>
        <LinkContainer to="/">
          <Button variant="secondary">Add Recipies to Favorites</Button>
        </LinkContainer>
      </div>
    );
  }
  return (
    <div>
    <LinkContainer to="/">
          <Button variant="warning">Please Add Recipies to Favorites</Button>
        </LinkContainer>
      <div className="recipe-container">
        {favorite.map(({ meals: r }) => (
          <div key={r[0].idMeal}>
            {" "}
            <RecipeCard {...r[0]} />
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Favorites;
