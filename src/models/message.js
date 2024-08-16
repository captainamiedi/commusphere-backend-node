'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.Organisation, {
        foreignKey: 'org_id',
        as: 'Organization'
      });
    }
  }

  Message.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    sender: {
      type: DataTypes.STRING
    },
    subject: {
      type: DataTypes.STRING
    },
    body: {
      type: DataTypes.TEXT
    },
    channel: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('New', 'Draft', 'Seen', 'Answered', 'Closed'),
      defaultValue: 'New'
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'Medium'
    },
    org_id: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'Message',
  });

  return Message;
};
