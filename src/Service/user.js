import bcrypt from 'bcryptjs'
import models from '../models/index.js'

const { User, Organisation } = models

const {compareSync} = bcrypt


export const createUser = async (userObj) => {
    try {
        return await User.create(userObj)
    } catch (error) {
        throw error
    }
}

export const findUserByEmail = async (email) => {
    try {
        return await User.scope('withPassword').findOne({where: {email}, include:             {
            model: Organisation,
            as: 'Organization'
        }})
    } catch (error) {
        throw error
    }
}
export const findUserById = async (id) => {
    try {
        return await User.findOne({where: {id}})
    } catch (error) {
        throw error
    }
}

export const updatePassword = async (hash, id) => {
    try {
      return await User.update(hash, { where: { id } });
    } catch (err) {
      throw err;
    }
};

export const comparePassword = (password, hashedPassword) => compareSync(password, hashedPassword);