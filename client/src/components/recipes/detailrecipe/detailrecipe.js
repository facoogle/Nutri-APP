import React, { useState } from "react";
//import {spinner} from '../../utils/spinner/spinner.js';
import { useDispatch, useSelector } from "react-redux";
import {
  useEffect, //useState
} from "react";
import {
  getRecipeDetail,
  getRecipePost,
  getTotalRanking,
} from "../../../redux/actions/recipeactions";
import { Navigate, useParams } from "react-router-dom";
import { NavBar } from "../../utils/nav/nav";

//import {check} from "./check.png"

import style from "./detail.css";
import SelectFavList from "../../utils/SelectFavList/SelectFavList";
import { useModal } from "../../../hooks/useModal";
import Modal from "../../utils/Modal/Modal";
import Post from "./helper/Post";
import useUser from "../../../hooks/useUser";
import {
  createPost,
  deletePost,
  updatePost,
} from "../../../redux/actions/postAction";
import NewPost from "./helper/NewPost";
import RankingPost from "./helper/RankingPost";

const RecipeDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isOpen, openModal, closeModal] = useModal();
  const { isLogged, logout } = useUser();
  const recipe = useSelector((state) => state.recipes.detail);
  const { detailPost } = useSelector((state) => state.recipes);
  const rankingTotal = useSelector((state) => state.recipes.ranking);
  //setRecipeDetail(recipe)

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    dispatch(getRecipePost(id));
    dispatch(getTotalRanking(id));
  }, []);
  useEffect(() => {
    dispatch(getTotalRanking(id));
  }, [rankingTotal]);
  function handleUpdate(postId, value) {
    try {
      dispatch(updatePost(postId, value));
      setTimeout(() => {
        dispatch(getRecipePost(id));
      }, 100);
    } catch (error) {
      console.log(error);
    }
  }
  function handleDelete(postId) {
    try {
      alert("Do you wanna delete this list?");
      dispatch(deletePost(postId));
      setTimeout(() => {
        dispatch(getRecipePost(id));
      }, 100);
    } catch (error) {
      console.log(error);
    }
  }
  function handleCreate(content) {
    dispatch(createPost(content, id));
    setTimeout(() => {
      dispatch(getRecipePost(id));
    }, 100);
  }

  return (
    <div className="detalles">
      <NavBar />

      <div className="detailcontainer">
        
        <div className="detailname">
          <h1>{recipe.name}</h1>
        </div>


          <div className="detaildietsfavourite">

            <div className="detaildiets">
              <h4 className="detaildietstittle">Diet/s</h4>
              {recipe.diets? recipe.diets.map(r=>{
                return<p>{r.name}</p>
              }
                
              ) : null}

              <h5 className="detaildietstittle">Health Score</h5>
              <li>{recipe.healthScore}</li>
            </div>

          </div>

            <div className="detailfavourite">
              {isLogged? (<>
              <button className="favouritebtn" onClick={openModal}>
                Favorite
              </button>
              <Modal isOpen={isOpen} closeModal={closeModal}>
                <SelectFavList recipeId={recipe.id} />
              </Modal>
              </>):null}
            </div>


            <div className="detailranking">
              <h3 className="detaildietstittle">Users calification</h3>
              {<h5>{rankingTotal ? rankingTotal : "No ranking"}</h5>}
              <div className="rankingValue">
                {isLogged ? <RankingPost recipeId={id} /> : null}
              </div>
            </div>
            
          <div className="detailimagen">
            <img
              className="fontimg"
              src={recipe.image}
              alt="recipe"
              width={900}
            />
          </div>

        <div className="detailsummary">
          <h5 className="detaildietstittle">Summary</h5>
          {recipe.createdInDB ? (
            <p className="detailsummarytext">{recipe.summary}</p>
          ) : (
            <p className="detailsummarytext" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          )}
        </div>

        <div className="detailcoments">
          <h2>coments</h2>
          {isLogged ? <NewPost onCreate={handleCreate} /> : null}
          {detailPost
            ? detailPost.map((post) => {
                return (
                  <Post
                    isLogged={isLogged}
                    post={post}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                );
              })
            : null}
        </div>

      </div>
    </div>
  );
};

export default RecipeDetail;
