const { Router } = require("express");
const router = Router();
const Recipe = require("../db");
const { getApiRecipeByID, createRecipe, deleteRecipe, updateRecipe, createdRecipes, nutricionistInfo, getAuthorName } = require("../controllers/recipecontrollers");
const { recipeBanned } = require ("../controllers/usersControllers/admin.controllers")

const auth = require('../middlewares/auth');
const { countRanking, getRecipePost } = require("../controllers/usersControllers/PostRanking.controllers");

router.get("/:id", async (req, res) => {
  let { id } = req.params;

  try {

    return res.status(200).json(await getApiRecipeByID(id));
  } catch (error) {
    return res
      .status(400)
      .json({ error: "error getting that specific recipe" });
  }
});
router.get('/author/:authorId', async (req,res)=>{
  let {authorId} = req.params
  console.log('authorId',authorId)
  let author = await getAuthorName(authorId)
  console.log('author',author)
  return  res.status(200).json(author?author.username:null)
})
router.get('/reciperank/:recipeId', async (req,res)=>{
  let {recipeId} = req.params
  let rank = await countRanking(recipeId)
  res.json(Math.round(rank))
})
router.get('/post/:recipeId', async (req,res)=>{
  let {recipeId} = req.params
  let post = await getRecipePost(recipeId)
  res.json(post)
})
router.post("/new/:userId", auth,async (req, res) => {
  const {userId} =req.params
  const {
    name,
    healthScore,
    image,
    summary,
    diets,
    // cuisines,
    // dishTypes,
  } = req.body;
  try {
    if (
      !(
        name &&
        summary &&
        diets
      )
    )
      throw new Error("We dont recive all the necessary info");

    let recipe = await createRecipe(
      userId,
      name,
      healthScore,
      image,
      summary,
      // cuisines,
      // dishTypes,
      diets
    );

    res.send(recipe);
  } catch (e) {
    res.send(e.message);
  }
});


router.delete("/:id",auth, async (req, res) => {
  let { id } = req.params;

  try {
    deleteRecipe(id);
    res.send(`Recipe ${id} deleted successfully`);
  } catch (e) {
    res.send(e.message);
  }
});

router.put("/:id",auth, async (req, res) => {
  let { id } = req.params;

  try {
    updateRecipe(id);
    res.send(`Recipe ${id} updated successfully`);
  } catch (e) {
    res.send(e.message);
  }
});
router.get('/nutri/:id', auth,async (req, res) =>{
  let { id } = req.params;
  try {
    let nutricionist = await nutricionistInfo(id)
    res.send(nutricionist)
  } catch (e) {
    res.send(e.message);
  }
})

router.get('/createdby/:authorId' ,auth, async (req, res) =>{
  let { authorId } = req.params
  try {
    let recipes = await createdRecipes(authorId)
    res.send(recipes)
  } catch (e) {
    res.send(e.message);
  }
})





module.exports = router;