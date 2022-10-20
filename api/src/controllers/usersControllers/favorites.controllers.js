const { User, Favorites, Recipe } = require("../../db");

const createList = async (userId, listName) => {
  let user = await User.findByPk(userId);
  let userList = await Favorites.findOne({
    where: {
      userId: userId,
      name: listName
    }});
  try {
    if (userList) {
        throw new Error("A list with thie name already exist");
      } else {
        let newList = await Favorites.create({
          name: listName,
          userId: user.dataValues.id
        });
        await user.addFavorites(newList);
        return {
          user,
          newList,
        };
      }
  } catch (error) {
    console.log(error);
  }
};
const listFavorite = async (userId) => {
  try {
    let fav = await Favorites.findAll({
      where: {
        userId:userId
      },
      include:{model: Recipe}
    });
    return fav;
  } catch (error) {
    console.log( error);
  }
};

const addingRecipe = async ( listId , recipeId) => {
  try {
    if (recipeId.length>15) {
      let list = await Favorites.findByPk(listId)
      let recipe = await Recipe.findByPk(recipeId)
      await list.addRecipe(recipe)
      return list
    } else {
      let list = await Favorites.findByPk(listId)
      let recipe = await Recipe.findOne({
        where:{
          apiId:recipeId}})

      await list.addRecipe(recipe)
      return list
    }
  } catch (error) {
    console.log(error);
  }
};

const listById = async (listId) => {
  try {
    if (!listId) {
      return {}
    } else {
      let list = await Favorites.findByPk(listId, { include: Recipe } )
      return list
    }
  } catch (error) {
    console.log( error);
  }
};

const listByName = async () => {};

const deleteList = async (listId) => {
  try {
    let list = await Favorites.findByPk(listId, { include: Recipe } ) 
    let listName = list.name
    await list.destroy()
    return(`the list ${listName} has being delete`)
  } catch (error) {
    console.log(error)
  }
};

const updateList = async (listId, listName) => {
  let list = await Favorites.findByPk(listId)
  await list.update({name:listName})
  return list
};

const removingRecipe = async ( listId , recipeId) => {
  try {
    if (recipeId.length>15) {
      let list = await Favorites.findByPk(listId)
      let recipe = await Recipe.findByPk(recipeId)
      await list.removeRecipe(recipe)
      return list
    } else {
      let list = await Favorites.findByPk(listId)
      let recipe = await Recipe.findOne({
        where:{
          apiId:recipeId}})
      await list.removeRecipe(recipe)
      return list
    }
  } catch (error) {
    console.log( error);
  }
};

module.exports = {
  listFavorite,
  createList,
  addingRecipe,
  listById,
  listByName,
  deleteList,
  updateList,
  removingRecipe
};
