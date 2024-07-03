'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class OrganizationMessagingTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Organisation, {
        foreignKey: 'org_id',
        as: 'Organization'
      });
      // this.belongsTo(models.OrganizationMessagingTemplate, {
      //   foreignKey: 'stage_probability_template_id',
      //   as: 'OrganizationMessagingTemplate'
      // });
    }
  }

  OrganizationMessagingTemplate.init({
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
    subject: {
      type: DataTypes.STRING,
      allowNull: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sender_name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM('email', 'sms', 'mms', 'others'),
      defaultValue: 'email'
    },
    sender_email: {
      type: DataTypes.STRING
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'OrganizationMessagingTemplate',
  });

  return OrganizationMessagingTemplate;
};
