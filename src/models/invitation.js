'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Invitation extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'inviterUserId',
        as: 'user'
      })
    }
  }

  Invitation.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    inviterUserId: {
      type: DataTypes.UUID
    },
    inviteeEmail: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Accepted', 'Declined')
    }
  }, {
    sequelize,
    modelName: 'Invitation',
  });

  return Invitation;
};