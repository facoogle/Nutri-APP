import React, { useState,useEffect } from "react";
import { Card } from "./card/card";
import "./cards.css"
import Paginado from "./paginado/paginado";
import { getRecipes, orderForRating, getRecipesName, filterDiet } from "../../../redux/actions/recipeactions";
import { getDiets } from '../../../redux/actions/dietsactions'
import { useDispatch, useSelector } from "react-redux";


export const Cards = () => {
    const dispatch = useDispatch();
    const {recipes} = useSelector((state) => state.recipes);
    const { diets } = useSelector((state) => state.diets)
    // console.log('diets', diets)



    function handleSortRecipes(e) {
      e.preventDefault();
      dispatch(orderForRating(e.target.value));
      setCurrentPage(1);                                            //  1-2 2-1
      setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSortByDiet(e){
      e.preventDefault();
      setCurrentPage(1);
      dispatch(filterDiet(e.target.value))
    }


    const [inputSearchBar, setInputSearchBar] = useState('')

    function onSubmitSearchbar(e){
      e.preventDefault();
      setCurrentPage(1);
      dispatch(getRecipesName(inputSearchBar))
      setInputSearchBar('')
    }
    
    
    function onInputChangeSearchbar(e){
        e.preventDefault();
        setInputSearchBar(e.target.value)
    }




    //--------/PAGINADO/--------------------//
const [currentPage, setCurrentPage] = useState(1);  //act
const [recipesPerPage] = useState(6)
const lastCountry = currentPage * recipesPerPage ;  // 1 10
const firstCountry = lastCountry - recipesPerPage; // 10 - 10 .. 0
const currentRecipe = recipes.slice(firstCountry, lastCountry);   
const [, setOrden] = useState("");

const paginado = (pageNumber) => {
  setCurrentPage(pageNumber)
};
//---------------------------------------//


    useEffect(() => {
        dispatch(getRecipes())
        dispatch(getDiets())
    }, []);
    // console.log('recipes',recipes)


    return (
        <div className="CardsRecipes">
            <h1>RECIPES</h1>


            <div className="Search">
    <p>Search Recipes</p>
      <form onSubmit={onSubmitSearchbar}>
            <input 
   list="listframe" type="text" onChange={onInputChangeSearchbar} value={inputSearchBar}/>
            <input className="" type="submit" value="Search"/>
        </form>
    </div>


            <div className="OrdenRankingRecipes">
        <p>Ranking Recipes</p>
    <select className=''
          onChange={(e) => {
            handleSortRecipes(e);
          }}
        >
          <option hidden={true}>Select Ranking</option>
          <option value={"MENOR"}>TOP</option>
          <option value={"MAYOR"}>BOTTOM</option>
          
        </select>
        <p>Sort by Diet</p>  
        <select  onChange={(e) => {
          handleSortByDiet(e)
        }}>
          <option hidden={true}value='all'>Select Diet</option>
          {
            diets.map(e => {
              return(
                <option key={e.id} value={e.name}>{e.name}</option>
              )
            })
          }
        </select>
        </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                
                {currentRecipe.map((el)=>{
                
                  return(
                    <div id={el.id}>
                      <a href={"/detail/" + el.id}  className="Links" >
                    <Card
                    id={el.id}
                    image={el.image}
                    name={el.name}
                    healthScore={el.healthScore}
                  />
                  </a>
                  </div>
                  )})}
                  
            </div>
            <Paginado
        
        recipesPerPage={recipesPerPage}
        recipes={recipes.length}
        paginado={paginado}
        currentPage = {currentPage}
        currentRecipe = {currentRecipe}
      />
        </div>

    )
}