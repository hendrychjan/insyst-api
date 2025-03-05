import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", userSchema);
