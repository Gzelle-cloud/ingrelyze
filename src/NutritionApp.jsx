import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoaderPage from "./assets/Loader/LoaderPage";
import MyRecipesComponent from "./MyRecipesComponent";

function NutritionApp() {

  const MY_ID = "4612d2d7";
  const MY_KEY = "3a044359cf6ffa1717a6b9b6b590ca2b";
  const MY_URL = "https://api.edamam.com/api/nutrition-details";

  const [mySearch, setMySearch] = useState();
  const [myRecipes, setMyRecipes] = useState();
  const [wordSubmitted, setWordSubmitted] = useState("");
  const [stateLoader, setStateLoader] = useState(false);

  const getRecipe = async (ingr) => {
    setStateLoader(true);
    const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingr: ingr, 
      }),
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyRecipes(data);
    } 
    else {
      setStateLoader(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Seems like you typed something other than recipe's ingredients. Try again!"
      });
    }
  }
  
  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      getRecipe(ingr);
    }
  }, [wordSubmitted])
  
  return(
    <div className="App">
      <div>
        {
          stateLoader && <LoaderPage/>
        }
      </div>

      <div className="container">
        <h1>Nutrition Analysis</h1>
      </div>

      <div className="container">
        <p>Type your recipe ingredients</p>
      </div>

      <div className="container">
        <form onSubmit={finalSearch}>
          <input 
            className="search" 
            placeholder="Search..." 
            onChange={myRecipeSearch} 
          />
          <div className="container">
            <button type="submit">Reveal nutrition info</button>
          </div>
        </form>
      </div>
 
      <div>
        {
          myRecipes && Object.values(myRecipes.totalNutrients).map(({ label, quantity, unit }) =>
              <div className="results">
                <MyRecipesComponent 
                label={label}
                quantity={quantity}
                unit={unit}
                />
              </div>
              
          )}
      </div>

    </div>
  )

}

export default NutritionApp;