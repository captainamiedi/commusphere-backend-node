'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Lead extends Model {
    static associate(models) {
      this.belongsTo(models.Organisation, {
        foreignKey: 'org_id',
        as: 'Organization'
      });
      this.hasMany(models.LeadStatus, {
        foreignKey: 'lead_id',
        as: 'leadStatus'
      });
      this.hasMany(models.LeadActivity, {
        foreignKey: 'lead_id',
        as: 'leadActivities'
      });
      this.hasMany(models.LeadContact, {
        foreignKey: 'lead_id',
        as: 'leadContact'
      });
      this.hasMany(models.LeadOpportunity, {
        foreignKey: 'lead_id',
        as: 'leadOpportunity'
      });
    }
  }

  Lead.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    source: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Lead',
  });

  return Lead;
};
