'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Meta, {
        foreignKey: 'user_id',
        as: 'meta'
      });
      this.hasMany(models.Invitation, {
        foreignKey: 'inviterUserId',
        as: 'invitation'
      });
      this.belongsTo(models.Organisation, {
        foreignKey: 'org_id',
        as: 'Organization'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    },
    scopes: {
      withPassword: {
        attributes: { },
      }
    },
    sequelize,
    modelName: 'User',
  });

  return User;
};