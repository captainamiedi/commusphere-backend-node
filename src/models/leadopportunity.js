'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LeadOpportunity extends Model {
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

  LeadOpportunity.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    product: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.STRING
    },
    probability: {
      type: DataTypes.STRING
    },
    status_id: {
      type: DataTypes.UUID
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
    modelName: 'LeadOpportunity',
  });

  return LeadOpportunity;
};
