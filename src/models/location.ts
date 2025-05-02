import mongoose, { Schema, Types } from "mongoose";

interface ILocation {
  title: string;
  description?: string;
  parent?: Types.ObjectId;
  owner: Types.ObjectId;
}

const locationSchema = new Schema<ILocation>({
  title: { type: String, required: true },
  description: { type: String },
  parent: { type: Schema.Types.ObjectId, ref: "Location" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Location = mongoose.model<ILocation>("Location", locationSchema);
