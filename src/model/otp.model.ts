import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';
import { Otp } from '../interfaces/otp.interface';

const otpSchema: Schema = new Schema(
  {
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 5 * 60 });


const Otp = mongoose.model('Otp',otpSchema)


export default Otp