'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LeadContact extends Model {
    static associate(models) {
      this.belongsTo(models.Organisation, {
        foreignKey: 'org_id',
        as: 'Organization'
      });
      this.belongsTo(models.Lead, {
        foreignKey: 'lead_id',
        as: 'lead'
      });
    }
  }

  LeadContact.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    lead_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'LeadContact',
  });

  return LeadContact;
};
