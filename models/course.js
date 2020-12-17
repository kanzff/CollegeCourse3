'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.User, {
        through: models.StudentCourse,
        foreignKey: 'courseId',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  Course.init({
    course_name: DataTypes.STRING,
    lecturer_name: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};