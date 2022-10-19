const { Router } = require("express");
const { listFavorite, createList, addingRecipe, listById, deleteList, updateList, removingRecipe } = require("../../controllers/usersControllers/favorites.controllers");
const auth = require('../../middlewares/auth');
const router = Router()

router.post('/newlist',auth ,async (req, res) =>{
    try {
        let {userId, listName} = req.body;
        let newList = await createList( userId, listName)
        res.json(newList)
        
    } catch (error) {
        console.log('err',error)
        
    }
})

router.get('/allfavlist/:id', auth, async (req, res)=>{
    let {id} = req.params
    let fav = await listFavorite(id)
    res.json(fav)
})

router.post('/lists/:listId', auth, async (req, res)=>{
    let {listId} = req.params
    let {recipeId} = req.body
    console.log('listId',listId,'recipeId',recipeId)
    let favRecipe = await addingRecipe(listId , recipeId)
    res.json(favRecipe)
})

router.patch('/lists/recipes/:listId', auth, async (req, res)=>{
    let {listId} = req.params
    let {recipeId} = req.body
    console.log('listId',listId,'recipeId',recipeId)
    let favRecipe = await removingRecipe(listId , recipeId)
    console.log('favRecipe',favRecipe)
    res.json(favRecipe)
})

router.get('/lists/:id', auth, async (req, res)=>{
    let {id} = req.params
    let list = await listById(id)
    res.json(list)
})

router.delete('/lists', auth, async (req, res)=>{
    let {listId} = req.body
    let list = await deleteList(listId)
    res.json(list)
})

router.patch('/lists/listName/:listId', auth, async (req, res)=>{
    let {listId} = req.params
    let { listName} = req.body
    try {
        let list =  await updateList(listId, listName)
        res.json(list)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;