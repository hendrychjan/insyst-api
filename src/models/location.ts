import mongoose, { Schema, Types } from "mongoose";

interface ILocation {
  title: string;
  description?: string;
  parentLocation?: Types.ObjectId;
}

const locationSchema = new Schema<ILocation>({
  title: { type: String, required: true },
  description: { type: String },
  parentLocation: { type: Schema.Types.ObjectId, ref: "Location" },
});

export const Location = mongoose.model<ILocation>("Location", locationSchema);
