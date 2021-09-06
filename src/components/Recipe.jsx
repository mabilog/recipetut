import React,{ useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Recipe = ({recipeId, addFavorite}) => {
  // const recipeData = recipe;
  const [recipe, setRecipe] = useState([]);
  // const recipeId = match.params.id;
  const API_KEY = process.env.REACT_APP_API_KEY;
  // console.log(recipeData)
  // console.log(recipeId);

  // console.log(props)
  const history = useHistory();
  console.log(history)
  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`)
    .then(res => res.json())
    .then(res => {
      setRecipe(res)
      console.log(res)
    })
    .catch(err => console.log("Something went wrong while fetching recipe info " + err))
  }, [])

  
  return (
    <RecipeWrapper>
      { recipe !== 0 && 
        <>
        {/* {console.log('this is the recipes component')} */}
          <Title>{recipe.title}</Title>
          <Image src={recipe.image} alt={recipe.title}/>
          <Summary>Summary</Summary>
          <p dangerouslySetInnerHTML={{ __html: recipe.summary}}></p>
          <FavoriteBtn onClick={() => addFavorite(recipe)}>Add to favorite</FavoriteBtn>
          {/* <HomeBtn to='/'>Go Home</HomeBtn> */}
          <button onClick={() => history.goBack()}>Go back</button>
        </>
      }
      
    </RecipeWrapper>
  )
}

const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 70%;
  min-width: 480px;
  font-family: sans-serif;
  position: relative;
  height: 100vh;
  /* top: 80px; */
`;

const Title = styled.h3`
  padding: 10px;
  font-size: 36px;
`;

const Image = styled.img`
  margin-bottom: 60px;
  border-radius: 5px;
  box-shadow: 10px 10px 10px;
`;

const Summary = styled.h4`
  font-size: 28px; 
  margin-bottom: 20px;
`;

const FavoriteBtn = styled.button`
  padding: 3px 6px;
  background: none;
  border: 1px solid orange;
`;

const HomeBtn = styled(Link)`
  padding: 3px 6px;
  background: none;
  border: 1px solid orange;
`;
export default Recipe
