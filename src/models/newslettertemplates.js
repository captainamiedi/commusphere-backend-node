'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class NewsletterTemplates extends Model {
    static associate(models) {
      this.belongsTo(models.Organisation, {
        foreignKey: 'org_id',
        as: 'Organization'
      });
    }
  }

  NewsletterTemplates.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    template_id: {
      type: DataTypes.UUID
    },
    newsletter_id: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'NewsletterTemplates',
  });

  return NewsletterTemplates;
};
