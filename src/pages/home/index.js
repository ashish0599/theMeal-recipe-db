import { useEffect, useContext } from "react";
import TopCover from "../../componets/topcover";
import RecipeContainer from "../../componets/recipecontainer";
import { MYContext } from "../../context";
import "./style.css";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Home() {
  const { recipes, setRecipes } = useContext(MYContext);
  const { user } = useContext(MYContext);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=b")
      .then((res) => res.json())
      .then((data) => setRecipes(data.meals))
      .catch((err) => console.log(err));
  },);

  return (
    <>
      {!user && (
        <div className="cover">
          <h1>Welcome to TheMealDB</h1> 
          <h2>An open, crowd-sourced database of Recipes from around the world.</h2>
          <h5> <LinkContainer to="/signup"><Nav.Link>Register for recepies u want 🤤</Nav.Link></LinkContainer></h5>
        </div>
      )}
      {user && <TopCover />}
      {user && <RecipeContainer recipes={recipes} />}
    </>
  );
}

export default Home;
