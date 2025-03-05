import mongoose, { Schema, Types } from "mongoose";

interface IItem {
  title: string;
  description?: string;
  location: Types.ObjectId;
}

const itemSchema = new Schema<IItem>({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
});

export const Item = mongoose.model<IItem>("Item", itemSchema);
