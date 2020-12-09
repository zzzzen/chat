import {Schema, model} from "mongoose";

const EquipmentSchema = new Schema({id: Schema.Types.ObjectId, name: String});

const SizeSchema = new Schema({width: Number, depth: Number, height: Number});

const PositionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  square: {
    type: Number,
    required: true
  },
  equipment: {
    type: [EquipmentSchema],
    required: true
  },
  size: {
    type: {width: Number, depth: Number, height: Number},
    required: true
  },
  category: {
    ref: "categories",
    type: Schema.Types.ObjectId
  },
  user: {
    ref: "users",
    type: Schema.Types.ObjectId
  }
});

export const Position = model("positions", PositionSchema);
