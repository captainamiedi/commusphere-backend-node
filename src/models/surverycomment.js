'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';

export default (sequelize) => {
  class SurveryComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User'
      });
      this.belongsTo(models.Surveries, {
        foreignKey: 'survey_id',
        as: 'survey'
      });
    }
  }

  SurveryComments.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    metadata: {
      type: DataTypes.JSON
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    survey_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  }, {
    sequelize,
    modelName: 'SurveryComments',
  });

  return SurveryComments;
};
