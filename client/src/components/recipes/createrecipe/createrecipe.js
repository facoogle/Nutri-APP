import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { getRecipes, postRecipe } from "../../../redux/actions/recipeactions";
import { getDiets } from "../../../redux/actions/dietsactions";
import { NavBar } from '../../utils/nav/nav';
import subimg1 from "./subimg1.jpg" 
import "./createrecipe.css"




export const CreateRecipe = () => {
    //const {recipes} = useSelector(state => state.recipes);
    const state = useSelector(state => state);
    console.log(state, 'state')
    //console.log(recipes, 'recipes')
    const { diets } = useSelector(state => state.diets);
    // const db = recipes.filter(e => e.createdInDB === true);
    const dispacth = useDispatch()
    const [input, setInput] = useState({
        name: "",
        healthScore: 0,
        image: "",
        summary: "",
        diets: [],
    })

    const [error, setError] = useState({})
    const validate = (input) => {
        let error = {}

        if(!input.name.trim()) {
            error.name = "Name is required";
        }

        // let search = db.find(e => e.name.toLowerCase() === input.name.toLowerCase())  //me fijo si el nombre de la receta ya existe en la db
        // if(search){
        //     error.name = "That recipe already exists";
        // }

        if(!input.summary.trim()) {
            error.summary = "Summary is required";
        }

        if(!input.healthScore || input.healthScore < 0 || input.healthScore > 101) {
            error.healthScore = "Health Score is required and must be between 0 and 100";
        }

        if(input.diets.length === 0 || !input.diets) {
            error.diets = "At least one Diet Type is required";
        }

        if(!input.image.trim()) {
            error.image = "Image URL is required";
        }

        return error;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispacth(postRecipe(input))
            setInput({
                name: "",
                healthScore: 0,
                image: "",
                summary: "",
                diets: [],
            })
        alert('The Recipe was created successfully')
    }


    const checkDiets = (e) => {
        setInput({
            ...input,
            diets: input.diets.includes(e.target.value) ?
            input.diets :
            [...input.diets, e.target.value]
        })
        setError(validate({
            ...input,
            diets: input.diets.includes(e.target.value) ?
            input.diets :
            [...input.diets, e.target.value]
        }))
    }

    const handlleChange = (e) => {
        console.log(input)
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    // const filterDiets = (e) => {
    //     let newDiets = input.diets.filter(i => i !== e.target.value)
    //     setInput({
    //         ...input,
    //         diets: newDiets
    //     })
    //     setError(validate({
    //         ...input,
    //         diets: newDiets
    //     }))
    // }


    useEffect(() => {
        dispacth(getDiets())
        dispacth(getRecipes())
    }, [])



    return (
    <div className='formConteiner'>
        <NavBar />
        <div className='wrapper1'>
            <form onSubmit={(e) => handleSubmit(e)} action="">
                <h1 className="tittle1">Create Recipe</h1>
        <p>
                <div className='namerecipe'>
                    <label>Name: </label>
                    <input autoComplete="off" type="text" placeholder="Name your recipe..." name="name" value={input.name} onChange={(e) => handlleChange(e)}></input>
                    {
                    error.name && <p className='error'>{error.name}</p>
                    }
                </div>
        </p>

        <p>
                <div className='diets'>
                    <label>Diets: </label>
                    <select defaultinput="Diets" id="diets" name="diets" onChange={(e) => checkDiets(e)}>
                    <option disabled={true}>Diets</option>

            {
                diets.map(e => 
                    <option key={e.name} value={e.name}>
                {e.name}
                    </option>
                )
            }
                </select>
                {
                        error.diets && <p className='error'>{error.diets}</p>
                }
                </div>
        </p>

        <p>

                <div className='healthScore'>
                    <label>Health Score: </label>
                    <input type="number" placeholder="Rate your recipe" name="healthScore" value={input.healthScore} onChange={(e) => handlleChange(e)}></input>
                    {
                        error.healthScore && <p className='error'>{error.healthScore}</p>
                    }
                </div>
        </p>

        <p>
                <div className='imgCreate'>
                    <label>Image: </label>
                    <input autoComplete="off" type="text" name="image" placeholder="Copy/Paste your image URL" value={input.image} onChange={(e) => handlleChange(e)}></input>
                </div>
        </p>

        <p>
                <div className='summary'>
                    <label>Summary: </label>
                    <input autoComplete="off" type="text" placeholder="Describe your recipe..." name="summary" value={input.summary} onChange={(e) => handlleChange(e)}></input>
                    {
                        error.summary && <p className='error'>{error.summary}</p>
                    }
                </div>
        </p>

        {console.log(error, 'error')}
                <button className='btn1' type="submit" disabled={!input.name || Object.keys(error).length > 0}>Create</button>
        

        <p class="input-file-wrapper">
            <img className="image1"src={subimg1} alt="img" width="500" height="350"/>
        </p>

        </form>
        </div>

        {/* <div className='conteinerDiets'>
        <div className='selectedDiets'>Selected Diets</div>
        <div className='diets'>
        {
            input.genres?.map(e => {
                let dietsSelected = diets.find(i => i.name === Number(e))
                return (
                    <button key={e} className='btn2' value={e} type="button" onClick={(e) => filterDiets(e)}>{e}</button>
                )    
            })
        }
        </div>
        </div> */}
    </div>
    )
}



