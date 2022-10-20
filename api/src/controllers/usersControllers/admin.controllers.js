const { User, Favorites, Recipe } = require("../../db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.js')
const {bannedUserNotification} = require('./notifications/notifications')

const adminSingIn = async (email, username, password) =>{

    try {
        let passwordCryp = bcrypt.hashSync(password, Number.parseInt(authConfig.rounds))

        let newAdmin = await User.create({
            username:username, 
            email:email, 
            password: passwordCryp,
            admin: true
        })
        defaultList(newAdmin)
        let token = jwt.sign({user:newAdmin}, authConfig.secret, {
            expiresIn: authConfig.expires}) 
            return({
                user:newAdmin,
                token:token
            })
    } catch (error) {
        console.log(error)
    }}

// const adminLogin = async (email, password) =>{
//    try {
//     let user = await User.findOne({
//         where:{
//             email:email
//         }})

//     if(!user){
//         throw new Error ('admin not found')
//     }else{
//         if(bcrypt.compareSync(password, user.password)){
//         let token = jwt.sign({user:user}, authConfig.secret, {
//             expiresIn: authConfig.expires})
//         return({
//             user:user,
//             token:token
//         })}else{
//             throw new Error('Incorrect password')
//         }}
//    } catch (error) {
//     console.log(error)
//    }
// }

const usersList = async () => {
    try {
        let users = User.findAll()
        return users
    } catch (error) {
       console.log(error) 
    }}

const userByid = async (id) =>{
    try {
        let user = await User.findByPk(id)
        return user
    } catch (error) {
       console.log(error) 
    }
}

const userByName = async(name) =>{
    try {
        let users = await User.findAll({where: {username:name}})
        return users
    } catch (error) {
       console.log(error) 
    }
}

const userBanned =async(id,banned) =>{
    try {
        let user = await User.findByPk(id)
        let email = user.dataValues.email
        console.log(email)
        await user.update({banned: banned})
        bannedUserNotification(email,banned)
        return user 
    } catch (error) {
        console.log(error)
    }
}

const recipeBanned =async(id,banned) =>{
    try {
        let recipe = await Recipe.findByPk(id)
        await recipe.update({banned: banned})
        return recipe 
    } catch (error) {
        console.log(error)
    }
  }

const defaultList = async (user) =>{
    let defList = await Favorites.create({
        userId: user.id
      })
      return await user.addFavorite(defList)
    }
  

module.exports = {
    //adminLogin,
    adminSingIn,
    usersList,
    userByid,
    userByName,
    userBanned,
    recipeBanned
}