import {Schema, model} from 'mongoose';
import {CategoryInterface} from '../interfaces/models';

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    default: ''
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
});

export const Category = model<CategoryInterface>('categories', CategorySchema);
