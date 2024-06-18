'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class OrganizationLeadSetting extends Model {
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
      this.belongsTo(models.OrganizationMessagingTemplate, {
        foreignKey: 'stage_probability_template_id',
        as: 'OrganizationMessagingTemplate'
      });
      this.belongsTo(models.LeadOpportunity, {
        foreignKey: 'opportunity_id',
        as: 'LeadOpportunity'
      });
    }
  }
  OrganizationLeadSetting.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    stage_probability: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stage_probability_template_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    message_sent: {
      type: DataTypes.BOOLEAN
    },
    message_sent_at: {
      type: DataTypes.DATE
    },
    message_receiver: {
      type: DataTypes.STRING
    },
    opportunity_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'OrganizationLeadSetting',
  });
  return OrganizationLeadSetting;
};