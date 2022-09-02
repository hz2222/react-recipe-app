import {useEffect, useState} from 'react';
import Recipe from "./Recipe";
import "./App.css";


function App() {

  const APP_ID = '94ea306e';
  const APP_KEY ='bbd9541dd81b5c6c29e05e033732f1bf';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    getRecipes();
  }, [query])
  const getRecipes = async () => {
    const response = await fetch
          (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    
  }
  
  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
      <h1 className='heading'>Recipe searcher</h1>
        <input className="search-bar" type="text" value={search}
             onChange={updateSearch} />
        <button className="search-button" type="submit" >
             Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
  
        ))}
      </div>
  
    </div>
  );
}
  
export default App;