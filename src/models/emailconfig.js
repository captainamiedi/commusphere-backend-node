'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class EmailConfig extends Model {
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
    }
  }

  EmailConfig.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recordValue: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    recordTxt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    selector: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    private_key: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    public_key: {
      type: DataTypes.TEXT,
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EmailConfig',
  });

  return EmailConfig;
};
