import { Student } from "../models/StudentModel.js"

export const studentController = (req, res) => {
    res.send('Student page')
}

export const detailsStudentController =  (req, res) => {
    res.send('Student details page')
}
