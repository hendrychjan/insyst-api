import mongoose, { HydratedDocument, Schema } from "mongoose";

interface IUser {
  name: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

// Export the user type
export type User = HydratedDocument<IUser>;

export const UserModel = mongoose.model<IUser>("User", userSchema);
