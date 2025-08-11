import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isVarified: boolean;
    verifyCodeExpiry: Date;
    isActive: boolean;
    message: Message[]
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email addres']
    },
    password: {
        type: String,
        required: true,
    },
    verifyCode: {
        type: String,
        required: true
    },
    verifyCodeExpiry: {
        type: Date,
        required: true
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    message: [messageSchema]
})

const userModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);
export default userModel