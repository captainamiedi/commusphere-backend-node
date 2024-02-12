'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LeadActivity extends Model {
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

  LeadActivity.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('meeting', 'call', 'email')
    },
    note: {
      type: DataTypes.TEXT
    },
    meeting_date: {
      type: DataTypes.DATE
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
    modelName: 'LeadActivity',
  });

  return LeadActivity;
};
