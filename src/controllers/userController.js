
import { 
    createUserService, 
    loginUserService, 
    getDetailsUserService, 
    searchUserService, 
    updateUserService,
    deleteUserService,
    getAllUserService,
    deleteAllUserService,
    refreshTokenService
} from '../services/UserService.js'

export const userController = (req, res) => {
    res.send('user page')
}

export const detailsUserController = async (req, res) => {
    try{
        const { userId } = req.params
        if(userId) {
            const response = await getDetailsUserService(userId)
            return res.json(response)
        }
        return res.json({
            status: 'err',
            message: 'The id is required'
        })
    }catch(e){
        console.log(e)
        return res.json({
            status: 'err',
        })
    }
}

export const searchUserController = async (req, res) => {
    try{
        const { name } = req.query
        if(name){
            const response = await searchUserService(name)
            return res.json(response)
        }else {
            return res.json({
                status: 'err',
                message: 'The name is required'
            })
        }
    }catch(err){
        console.log(err)
        return res.json({
            status: 'err',
            message: err
        })
    }
}

export const userRefreshTokenController = async(req, res) => {
    try{
        const refreshTolken = req.headers.token.split(' ')[1]
        if(refreshTolken){
            const response = await refreshTokenService(refreshTolken)
            return res.json(response)
        }else {
            return res.json({
                message: 'The refreshTolken is not valid'
            })
        }
    }catch(err){
        return res.json({
            status: 'err',
            message: err
        })
    }
}

//1.minh phai lay duoc thong tin phia client gui len server
//2.xac dinh xem co nhan duoc thong tin hay ch
//truoc khi luu vao db thi minh se check xem no co phai email khong hoac da ton tai trong db ch
//3.neu nhan duoc se luu vao db
//4 se tra slient user da tao

export const createUserController = async (req, res) => {
    const { email, password, name } = req.body
    if(email && password && name){
        const response = await createUserService({ email, password, name })
        return res.json(response)
    }else {
        return res.json({
            status: 'err',
            messgae: "The email, password and name is required"
        })
    }
}

export const loginUserController = async (req, res) => {
    const { email, password } = req.body
    if(email && password){
        const response = await loginUserService({ email, password })
        return res.json(response)
    }else {
        return res.json({
            status: 'err',
            messgae: "The email and password is required"
        })
    }
}

export const updateUserController = async (req, res) => {
    try{
        const { id } = req.params
        const data = req.body
        if(id) {
            const response = await updateUserService(id, data)
            if(response){
                return res.json(response)
            }else {
                return res.json({
                    status: 'err',
                    messgae: 'The server is problem'
                })
            }
        }else {
            return res.json({
                status: 'err',
                messgae: 'The id of user is required'
            })
        }
    }catch(e){
        console.log(e)
        return res.json({
            message: e,
            status: 'err'
        })
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const _id = req.params.id
        if(_id){
            const response = await deleteUserService(_id)
            return res.status(200).json(response)
        }else {
            return res.status(404).json({
                status: 'err',
                message: 'The userId is required'
            })
        }
    } catch (error) {
        return res.status(404).json({
            status: 'err',
            message: error
        })
    }
}

export const getAllUserController = async (req, res) => {
    try{
        const response = await getAllUserService()
        return res.status(200).json({
            data: response,
            status: 'OK'
        })
    }catch(e){
        return res.status(400).json({
            message: e,
            status: 'err'
        })
    }
}

export const deleteAllUserController = async(req, res) => {
    const { id } = req.query
    try {
        const response = await deleteAllUserService(id)
        return res.status(200).json({
            data: response,
            status: 'OK'
        })
    } catch (error) {
        return res.status(400).json({
            message: e,
            status: 'err'
        })
    }
}