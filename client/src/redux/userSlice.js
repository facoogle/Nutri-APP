import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    favList: [],
    list: {},
    userPost: [],
    post:{},
    ranking:0,
    profile:[],
    recipesN:[],
    nutri:{},
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getUserById: (state, action) => {
      state.user = action.payload;
    },
    getAllList: (state, action) => {
      state.favList = action.payload;
    },
    getListById: (state, action) => {
      state.list = action.payload;
    },
    addFavRecipe: (state, action) => {
      state.list = action.payload;
    },
    removeFavRecipe: (state, action) => {
      state.list = action.payload;
    },
    updateNameList: (state, action) => {
      state.favList = action.payload;
      state.list = action.payload;
    },
    deleteListById: (state, action) => {
      state.favList = action.payload;
    },
    getUserPosts:(state, action) => {
      state.userPost = action.payload;
    },
    getUserPost:(state, action) => {
      state.post = action.payload;
    },
    getRanking:(state, action) => {
      state.ranking = action.payload;
    },
    getProfile:(state, action) => {
      state.profile = action.payload;
    },
    getNutriRecipes:(state, action) => {
      state.recipesN = action.payload;
    },
    getNutri:(state, action) => {
      state.nutri = action.payload;
    },
    // getUserStatus: (state, action)=>{
    //     state.logged = action.payload
    // },
    // createUser: (state, action)=>{
    //     state.user = [...state.user, action.payload]
    // },
    // deleteUser: (state, action)=>{
    //     state.user = action.payload
    // },
  },
});

export const {
  getUser,
  getUserById,
  getAllList,
  getListById,
  addFavRecipe,
  removeFavRecipe,
  updateNameList,
  deleteListById,
  getUserPosts,
  getUserPost,
  getUserStatus,
  createUser,
  deleteUser,
  getRanking,
  getProfile,
  getNutriRecipes,
  getNutri,
  getNutriP
} = userSlice.actions;

export default userSlice.reducer;
