import mongoose from "mongoose";
const { Schema } = mongoose

const studentSchema = new Schema({
    name: {
        type: String,
        require : true,
    },
    birthday: {
        type: Date,
        require : true,
    },
    mssv: {
        type: String,
        require : true,
        unique: true
    },
    classMate: {
        type: String,
        require : true,
    },
})

export const Student = mongoose.model('Student', studentSchema)