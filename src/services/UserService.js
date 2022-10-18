import { User } from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUserService = ({ email, name, password}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
            if(isEmail){
                const isCheckEmail = await User.find({email: email})
                const isCheckName = await User.find({name})
                if(isCheckEmail.length || isCheckName.length){
                    resolve({
                        status: 'err',
                        message: 'The name or user name is existed'
                    })
                }
                const hashPassword = bcrypt.hashSync(password, 10);
                const newUser = await User.create({
                    email,
                    name,
                    password : hashPassword
                })
                resolve({
                    status: 'OK',
                    data: {
                        email: newUser.email,
                        name: newUser.name
                    }
                })
            }else {
                resolve({
                    status: 'err',
                    message: 'user name is not a email'
                })
            }
        } catch (error) {
            reject({
                message: error,
                status: 'err'
            })
        }
    })
}

const generalAcessToken = (data) => {
    const access_token  = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
    return access_token
}

const generalRefreshToken = (data) => {
    const access_token  = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '365d'})
    return access_token
}

export const loginUserService = ({ email, password}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
            if(isEmail){
                const useDb = await User.find({email: email})
                if(useDb) {
                    const checkPassword = bcrypt.compareSync(password, useDb[0].password);
                    if(checkPassword){
                        const access_token = generalAcessToken({ isAdmin: useDb[0].isAdmin, _id: useDb[0]._id })
                        const refresh_token = generalRefreshToken({ isAdmin: useDb[0].isAdmin, _id: useDb[0]._id })
                        resolve({
                            status: 'OK',
                            data: {
                                access_token,
                                refresh_token
                            }
                        })
                    }
                    resolve({
                        status: 'err',
                        message: "The user name or password is wrong"
                    })
                }else {
                    resolve({
                        status: 'err',
                        message: 'the user name is not existed'
                    })
                }
            }else {
                resolve({
                    status: 'err',
                    message: 'user name is not a email'
                })
            }
        } catch (error) {
            reject({
                message: error,
                status: 'err'
            })
        }
    }).catch((e) => console.log(e))
}

export const refreshTokenService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, function(err, user) {
                if(err){
                    resolve(404).json({
                        message: 'The user is not authemtication'
                    })
                }
                if(user){
                    const newAcessToken = generalAcessToken({ isAdmin: user.isAdmin, _id: user._id })
                    resolve({
                        status: 'OK',
                        access_token : newAcessToken
                    })
                }else {
                    resolve({
                        message: 'The user is not authemtication'
                    })
                }
            });
        } catch (error) {
            reject(error)
        }
    })
}

export const getDetailsUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const findUser = await User.findById({_id: id})
            if(findUser){
                resolve({
                    status: 'OK', 
                    data: findUser
                })
            }
            resolve({
                status: 'OK',
                message: 'the user is not defined'
            })
        }catch(err){
            reject({
                message: err,
                status: 'err'
            })
        }
    }).catch(e => e)
}

export const searchUserService = (name) => {
    return new Promise(async (resolve, reject) => {
        try{
            const findName = await User.find({name})
            if(findName){
                resolve({
                    status: 'OK', 
                    data: findName
                })
            }
            resolve({
                status: 'OK',
                message: 'the user is not defined'
            })
        }catch(e){
            console.log(e)
            reject({
                message: e,
                status: 'err'
            })
        }
    }).catch(e => e)
}

export const updateUserService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try{
            const checkUser = await User.findOne(data)
            if(checkUser){
                resolve({
                    status: 'err',
                    message: 'The info of user is duplicate'
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, {new : true})
            // const findUser = await User.findById(id)
            // findUser.name = data.name
            // findUser.password = data.password
            await findUser.save()
            if(findUser) {
                const getUserNew = await getDetailsUserService(id)
                resolve({
                    status: 'OK',
                    data: findUser
                })
            }else {
                resolve({
                    status: 'err',
                    message: 'The user is not define'
                })
            }
        }catch(e){
            console.log(e)
            reject({
                status: 'err',
                message: e
            })
        }
    })
}

export const deleteUserService = (_id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const deleteUser = await User.findByIdAndDelete(_id)
            if(deleteUser){
                resolve({
                    status: 'OK',
                    data: deleteUser
                })
            }else {
                resolve({
                    status: 'err',
                    message: 'the user is not defied'
                })
            }
        }catch(e){
            reject({
                status: 'err',
                message: e
            })
        }
    })
}

export const getAllUserService = () => {
    return new Promise(async (resolve, reject) => {
        try{
            const allUser = await User.find()
            resolve({
                status: 'Ok',
                data: allUser
            })
        }catch(e){
            console.log(e)
            reject({
                status:'err',
                message:e
            })
        }
    })
}

export const deleteAllUserService = (ids) => {
    return new Promise(async (resolve, reject) => {
        try{
            const deleteUsers = await User.deleteMany({_id: ids})
            resolve({
                status: 'Ok',
                data: deleteUsers
            })
        }catch(e){
            console.log(e)
            reject({
                status:'err',
                message:e
            })
        }
    })
}