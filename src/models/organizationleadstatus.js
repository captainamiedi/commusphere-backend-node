import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class OrganizationLeadStatus extends Model {
    static associate(models) {
      // define association here
    }
  }
  
  OrganizationLeadStatus.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrganizationLeadStatus',
  });

  return OrganizationLeadStatus;
};
