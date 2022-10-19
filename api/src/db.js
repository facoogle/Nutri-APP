require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;



let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME || "nutri-u",
        dialect: "postgres",
        host: DB_HOST,
        port: DB_PORT || 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME||"nutri-u"}`, //DB NAME countries
        { logging: false, native: false }
      );

// const sequelize = new Sequelize(`postgres://${process.env.DB_USER || DB_USER}:${process.env.DB_PASSWORD || DB_PASSWORD}@${process.env.DB_HOST || DB_HOST}/${process.env.DB_NAME || "nutri-u"}`, {
//   logging: false,
//   native: false, 
// });
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { User,  Diet, Recipe, Ingredient, Payment, Favorites, Post, Ranking, Profile} = sequelize.models;

// hay que corregir estas relaciones
User.hasMany(Diet, {as: "fav_diet", foreignKey: "userId"})
User.hasMany(Recipe, {as: "new_recipe", foreignKey: "userId"})
User.hasMany(Favorites, { foreignKey: "userId"})
User.hasMany(Post, { foreignKey: "userId"})
User.hasMany(Ranking, { foreignKey: "userId"})
User.hasMany(Payment, { foreignKey: 'userId'})
Payment.belongsTo(User)
Favorites.belongsTo(User)
Post.belongsTo(User)
Post.belongsTo(Recipe)
// Post.hasMany(Post,{as:'subPost'})
// Post.hasOne(Ranking, {foreignKey:'postId'})
Ranking.belongsTo(User)
Ranking.belongsTo(Recipe)
Recipe.belongsTo(User,{ as: "author", foreignKey: "userId"})
Diet.belongsToMany( Recipe,{ through: "diets_recipes"})
Recipe.hasMany(Post,{ foreignKey: "recipeId"})
Recipe.hasMany(Ranking,{ foreignKey: "recipeId"})
Recipe.belongsToMany(Diet,{ through: "diets_recipes"})
Recipe.belongsToMany(Ingredient,{ through: "recipes_ingredients"})
Recipe.belongsToMany(Favorites,{ through: "recipes_favorites"})
Favorites.belongsToMany(Recipe,{ through: "recipes_favorites"})
Ingredient.belongsToMany(Recipe,{ through: "recipes_ingredients"})
Diet.belongsToMany(Ingredient,{ through: "diets_ingredients"})
Ingredient.belongsToMany(Diet,{ through: "diets_ingredients"})
User.hasOne(Profile)
Profile.belongsTo(User)



module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};