import mongoose, { Schema, Document } from 'mongoose'


interface IUser extends  Document {
  name: string,
  email: string,
  age: number,
  createdAt: Date
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model<IUser>('User', UserSchema)

export { User }
export type { IUser }