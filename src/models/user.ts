import mongoose, { Types, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import _ from "lodash";

interface IUser {
  name: string;
  password: string;
  isAdmin: boolean;
  getToken: () => Promise<string>;
}

export interface IJWTUserPayload {
  _id: Types.ObjectId;
  name: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

/**
 * Hash the password field before saving to DB
 */
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.PASSWD_HASH_SALT_ROUNDS!)
    );
  }

  next();
});

/**
 * Check user's credentials and generate a token if valid
 * @returns A jwt api token containing user's name and the isAdmin flag
 * @throws A UserAuthError if
 */
userSchema.methods.getToken = async function (): Promise<string> {
  const userInDb = await User.findOne({ name: this.name });

  // If credentials are correct, generate an api token
  if (userInDb && (await bcrypt.compare(this.password, userInDb.password))) {
    const token = jwt.sign(
      _.pick(userInDb, ["_id", "name", "isAdmin"]) as IJWTUserPayload,
      process.env.JWT_SECRET!
    );
    return token;
  }

  // Fail with error
  const error = new Error("Wrong username or password");
  error.name = "UserAuthError";
  throw error;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
