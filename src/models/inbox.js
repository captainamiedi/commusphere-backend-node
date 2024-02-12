import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Inbox extends Model {
    static associate(models) {
      this.belongsTo(models.Organisation, {
        foreignKey: 'org_id',
        as: 'Organization'
      });
    }
  }

  Inbox.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    inbox_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Inbox',
  });

  return Inbox;
};
