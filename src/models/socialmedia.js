'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class socialMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  socialMedia.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    org_id: {
      type:DataTypes.UUID,
      allowNull: false
    },
    social_metadata: {
      type:DataTypes.JSON
    },
  }, {
    sequelize,
    modelName: 'socialMedia',
  });
  return socialMedia;
};