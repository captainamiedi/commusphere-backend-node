'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LeadStatus extends Model {
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

  LeadStatus.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    status: {
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
    modelName: 'LeadStatus',
  });

  return LeadStatus;
};
