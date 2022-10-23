const axios = require("axios");
const { API_KEY } = process.env;
const { User, Recipe, Diet, Post, Profile } = require("../db");

const getApiRecipeByID = async (id) => {
  if (id.length > 15) {
    try {
      const recipeDb = await Recipe.findByPk(id, { include: Diet });

      return recipeDb.dataValues;
    } catch (error) {
      throw new Error("That recipe does not exist");
    }
  } else {
    const url = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
    const recipeApi = await axios.get(url);
    const recipeData = {
      id:recipeApi.data.id,
      apiId:recipeApi.data.id,
      name: recipeApi.data.title,
      healthScore: recipeApi.data.healthScore,
      image: recipeApi.data.image,
      summary: recipeApi.data.summary,
      // cuisines: recipeApi.data.cuisines?.map((ele) => ele),
      // dishTypes: recipeApi.data.dishTypes?.map((ele) => ele),
      diets: recipeApi.data.diets?.map((ele) => ele),
      //ingredients: recipeApi.analyzedInstructions[0].steps?.map(ele => ele.ingredients.name): "does not have any ingredient"
    };
    return recipeData;
  }
};
const getAuthorName =async(id) =>{
  try {
      let author = await User.findByPk(id)
  return author
  } catch (error) {
    console.log(error)
  }
}

const createRecipe = async (
  userId,
  name,
  healthScore,
  image,
  summary,
  // cuisines,
  // dishTypes,
  diets
) => {
    try{ 
    const findRecipe = await Recipe.findAll({ where: { name: name } });
  if (findRecipe.length !== 0) throw new Error("This recipe already exist");

  const newRecipe = await Recipe.create({
    userId,
    name,
    healthScore: healthScore ? healthScore : 0,
    image: image ? image : "",
    summary,
    // cuisines: cuisines ? cuisines : "no cuisines available",
    // dishTypes: dishTypes ? dishTypes : "no dish type available",
  });

  const dietType = await Diet.findAll({
      where: { name: diets },
    });
    await newRecipe.addDiet(dietType);
    return newRecipe
}catch(e){
    console.log(e)
}
};

const deleteRecipe = async (id) => {
  
  try{
    const findRecipe = await Recipe.findByPk({where: {id: id}});
    if(findRecipe.length !== 0) throw new Error('This recipe does not exist')
    await findRecipe.destroy()
  }catch(e){
    console.log(e.message)
  }
}

const updateRecipe = async (id) => {
  try {
    const findRecipe = await Recipe.findByPk({ where: { id: id } });
    if (findRecipe.length !== 0) throw new Error("This recipe does not exist");
    await findRecipe.update();
  } catch (e) {
    console.log(e.message);
  }
}
const nutricionistInfo = async (id) =>{
try {
  let nutri = await User.findByPk(id)
  let nutriProfile = await Profile.findOne({
    where: {
      userId: nutri.dataValues.id,
    }})
    let nu ={ 
      username:nutri.dataValues.username,
      email:nutri.dataValues.email,
      id:nutri.dataValues.id,
      admin:nutri.dataValues.admin,
      premium:nutri.dataValues.premium,
      image:nutriProfile?nutriProfile.dataValues.imgperfil:"https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"}
  return nu
} catch (error) {
  console.log(error);
}
}

const createdRecipes = async (id) =>{
try {
  let author = await Recipe.findAll({
    where:{ userId:id },
    //include:{ model: Post},
    include:[{ model:  Post },{ model: Diet }]
  })
 return author

} catch (error) {
  console.log(error);
}
}
module.exports = {
  getApiRecipeByID,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  createdRecipes,
  nutricionistInfo,
  getAuthorName
};
