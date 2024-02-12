'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Templates extends Model {
    static associate(models) {
      this.belongsTo(models.Organisation, {
        foreignKey: 'org_id',
        as: 'Organization'
      });
    }
  }

  Templates.init({
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Templates',
  });

  return Templates;
};
