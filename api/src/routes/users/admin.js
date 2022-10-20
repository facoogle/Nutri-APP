const { Router } = require("express");
const { User } = require("../../db");
const {
  adminLogin,
  adminSingIn,
  usersList,
  userByName,
  userByid,
  userBanned,
  recipeBanned,
} = require("../../controllers/usersControllers/admin.controllers");

//Middleware

const auth = require("../../middlewares/auth");

// Importar todos los routers;

const router = Router();
// le saque el auth
router.post("/singin",  async (req, res) => {
  let { email, username, password } = req.body;
  const usernameCreate = await User.findOne({ where: { username: username } });
  const emailCreate = await User.findOne({ where: { email: email } });
  if (usernameCreate) {
    res.status(400).send({ message: "Username already exits" });
  } else if (emailCreate) {
    res.status(400).send({ message: "Email already exits" });
  } else if (!usernameCreate && !emailCreate) {
    let admin = await adminSingIn(email, username, password);
    res.json({
      admin: admin.user.username,
      token: admin.token,
    });
  }
});

router.get("/search", auth, async (req, res) => {
  let { username } = req.query;
  try {
    if (!username) {
      let users = await usersList();

      res.json(users);
    } else {
      let users = await userByName(username);
      res.json(users);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/search/:id", auth, async(req, res) => {
    let { id } = req.params;
    try {
      let user = await userByid(id);
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  })

  
router.post('/search/:id', auth, async(req,res)=>{
    let { id } = req.params;
    let {banned} = req.body
    try {
        let user = await userBanned(id,banned)
        let message = ''
        if(user.banned){message ='ban'}
        else{ message = 'unban'}   
        res.json({
            user: user,
            msg:`User: ${user.username} was ${message}`})
    } catch (error) {
        console.log(error);
    }
})


router.post("/ban/:id",auth, async (req, res) => {
  let { id } = req.params;
  let {banned} = req.body
  console.log(banned, "soy banned")
  try {
    let recipe = await recipeBanned(id,banned)
   
    res.send(`Recipe ${id} banned or unbanned SUCCESS`);
  
 
  } catch (e) {
    res.send(e.message);
  }
});


module.exports = router;
