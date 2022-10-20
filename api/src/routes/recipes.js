const  { Router } = require("express")
const router = Router()
const { getAllInfo, getByName } = require("../controllers/recipescontrollers")


router.get("/", async (req, res) => {
    
        let {name} = req.query;
    try {

        if(name) {
            let searchName =await getByName(name)
            return res.status(200).json(searchName)

            } else {
            let allInfo =await getAllInfo()
            
            return res.status(201).json(allInfo)
            }

        } catch(error) {
            return res.status(400).json({error: "error getting the recipes"})
        }

})

module.exports = router;