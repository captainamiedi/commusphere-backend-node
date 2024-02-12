'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Newsletters extends Model {
    static associate(models) {
      this.belongsTo(models.Organisation, {
        foreignKey: 'org_id',
        as: 'Organization'
      });
    }
  }

  Newsletters.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    isTracking: {
      type: DataTypes.BOOLEAN
    },
    sendNow: {
      type: DataTypes.BOOLEAN
    },
    sendTime: {
      type: DataTypes.DATE
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_sent: {
      type: DataTypes.BOOLEAN
    },
    read_count: {
      type: DataTypes.INTEGER
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Newsletters',
  });

  return Newsletters;
};
