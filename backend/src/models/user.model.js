import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
      {
            fullname: {
                  type: String,
                  required: true
            },
            email: {
                  type: String,
                  required: true,
                  unique: true
            },
            password: {
                  type: String,
                  required: true
            }
      },
      { timestamps: true }
);

userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) {
            return next();
      }
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
      return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
