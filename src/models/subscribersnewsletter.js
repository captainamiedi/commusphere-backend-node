'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SubscribersNewsletter extends Model {
    static associate(models) {
      this.belongsTo(models.Organisation, {
        foreignKey: 'org_id',
        as: 'Organization'
      });
    }
  }

  SubscribersNewsletter.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    subscriber_id: {
      type: DataTypes.UUID
    },
    newsletter_id: {
      type: DataTypes.UUID
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SubscribersNewsletter',
  });

  return SubscribersNewsletter;
};
