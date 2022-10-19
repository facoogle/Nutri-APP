const { User , Favorites,Profile } = require("../../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.js");
const nodemailer = require("nodemailer");
const {changePasswordNotification} = require("./notifications/notifications")
const { HOST_EMAIL, PORT_EMAIL, EMAIL, EMAIL_PASS, DB_HOST, DB_PORT, CLIENT_PORT, URL_FRONT } =
  process.env;

const userSingIn = async (req, res, next) => {
  //crear un registro
  const { username, email, password } = req.body;

  let passwordCryp = bcrypt.hashSync(
    password,
    Number.parseInt(authConfig.rounds)
  );

  try {
    const usernameCreate = await User.findOne({
      where: { username: username },
    });
    const emailCreate = await User.findOne({ where: { email: email } });

    if (usernameCreate) {
      res.status(400).send({ message: "Username already exits" });
    } else if (emailCreate) {
      res.status(400).send({ message: "Email already exits" });
    } else if (!usernameCreate && !emailCreate) {
      User.create({
        username: username,
        email: email,
        password: passwordCryp,
      }) 
        .then((user) => defaultList(user))
        .then((user) => defaultProfile(user))
        .then((user) => sendConfirmationEmail(user))
      res.send({ message: "User Created, verify your email to confirm" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const userLogin = async (email, password) => {
  try {
    let user = await User.findOne({
      where: {
        email: email,
      },
    });
    // console.log(user)
    if (!user) {
      throw new Error("user not found");
    } else {
      if (user.banned) {
        throw new Error("This user was ban");
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires,
          });
          user.update({ logged: true });
          // console.log('1',user.logged)
          setTimeout(function () {
            user.update({ logged: false });
          }, 5000); // a los 5 minutos se pone el status del logged en false
          // console.log('user y token', user, token)
          return {
            user: user.dataValues,
            token: token,
          };
        } else {
          throw new Error("Incorrect password");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const userLogOut = async (user, token) => {
  try {
    const actualUser = await User.findByPk(user.id);
    if (!actualUser) {
      throw new Error("user not found");
    } else {
      const newToken = jwt.sign({ user: actualUser }, authConfig.secret, {
        expiresIn: 30,
      });
      if (actualUser.logged) {
        setTimeout(function () {
          actualUser.update({ logged: false });
        }, 10000);}
      return {
        user: actualUser.dataValues,
        token: newToken,
      };}
  } catch (error) {
    console.log(error);
  }
};

const userInfo = async (id) =>{
  try {
    return await User.findByPk(id)
  } catch (error) {
    console.log(error);
  }
}

// send Email confirmation
function sendConfirmationEmail(user) {
  let transporter = nodemailer.createTransport({
    host: `${HOST_EMAIL}`,
    port: `${PORT_EMAIL}`,
    secure: false,
    auth: {
      user: `${EMAIL}`,
      pass: `${EMAIL_PASS}`,
    },
  });
  var token = jwt.sign({ email: user.email }, authConfig.secret);
  const urlConfirm = `http://${URL_FRONT}/confirm-account/${token}`;

  return transporter
    .sendMail({
      from: "nutri.u.contact@gmail.com",
      to: user.email,
      subject: "Please confirm your email Nutri-U",
      html: `<p>Confirm your email <a href="${urlConfirm}">Confirm</a></p>`,
    })
    .then(() => user);
}

const confirmAccount = async (req, res) => {
  // confirmar cuenta controller
  try {
    confirmAccount2(req.params.token)
      .then(() => {
        res
          .status(200)
          .send({ succes: true, message: "user confirmed succesfully" });
      })
      .catch((err) =>
        res.status(400).send({ succes: false, message: err.message })
      );
  } catch (err) {
    console.log(err);
  }
};

async function confirmAccount2(token) {
  var email = null;
  try {
    const payload = jwt.verify(token, authConfig.secret);
    email = payload.email;
  } catch (err) {
    throw new Error("Ups!, token is invalid");
  }

  User.update(
    { emailVerified: true },
    {
      where: {
        email: email,
      },
    }
  );
}

const forgotPassword = async (req, res)=>{
  const {email} = req.body
  try {
    if(!email){
      res.send({message:"Insert email"})

    } else if(email){

    const oldUser = await User.findOne({where:{email:email}})
    
    
    if(!oldUser){
      res.status(400).send({message:"Email no exist"})
    }
    else if(oldUser){
      var token = jwt.sign({ email: oldUser.email }, authConfig.secret, {expiresIn:"5m"});
      changePasswordNotification(email,token)
      res.send({message:"An email to recover password was sent successfully, check your email"})
    }
  }
  } catch (error) {
    console.log(error)
  }
}

const newPassword = async (req, res) => {
  let {token} = req.params
  let {password} = req.body
  

  let passwordCryp = bcrypt.hashSync(
    password,
    Number.parseInt(authConfig.rounds)
  );
   
  try {
    const payload = jwt.verify(token, authConfig.secret);
    let email = payload.email;
    User.update(
      { password: passwordCryp },
      {
        where: {
          email: email,
        },
      })

    res.send({message:"Your password was successfully modified"})
  } catch (error) {
    res.status(400).send({message:"Your session expired, or token is invalid"})
  }
}

const defaultList = async (user) =>{
  let defList = await Favorites.create({
      userId: user.id
    })
    return await user.addFavorite(defList)
  }
  const defaultProfile = async (user) =>{
    let defProfile = await Profile.create({
        userId: user.id
      })
      return await user.addProfile(defProfile)
    }

module.exports = {
  userSingIn,
  userLogin,
  userLogOut,
  userInfo,
  confirmAccount,
  forgotPassword,
  newPassword,
};
