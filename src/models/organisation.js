'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Organisation extends Model {
    static associate(models) {
      this.hasMany(models.Inbox, {
        foreignKey: 'org_id',
        as: 'inbox'
      });
      this.hasMany(models.Message, {
        foreignKey: 'org_id',
        as: 'message'
      });
      this.hasMany(models.Lead, {
        foreignKey: 'org_id',
        as: 'lead'
      });
      this.hasMany(models.LeadActivity, {
        foreignKey: 'org_id',
        as: 'lead_activity'
      });
    }
  }

  Organisation.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    org_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    org_email: {
      type: DataTypes.STRING
    },
    org_size: {
      type: DataTypes.STRING
    },
    org_logo: {
      type: DataTypes.STRING
    },
    org_phone_number: {
      type: DataTypes.STRING
    },
    org_address: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Organisation',
  });

  return Organisation;
};
