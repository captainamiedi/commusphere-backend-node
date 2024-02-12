'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Recipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Recipient.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING
    },
    first_name: {
      type: DataTypes.STRING
    },
    phone_number: { type: DataTypes.STRING }
  }, {
    sequelize,
    modelName: 'Recipient',
  });

  return Recipient;
};
