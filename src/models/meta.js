'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Meta extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }

  Meta.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    long_lived_token: {
      type: DataTypes.STRING
    },
    page_id: {
      type: DataTypes.STRING
    },
    page_name: {
      type: DataTypes.STRING
    },
    instagram_professional_account_id: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Meta',
  });

  return Meta;
};
