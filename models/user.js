'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Course, {
        through: models.StudentCourse,
        foreignKey: 'studentId'
      })
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    full_name: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(userInstance, options) {
        const salt = bcrypt.genSaltSync(5)
        const hash = bcrypt.hashSync(userInstance.password, salt)
        userInstance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};