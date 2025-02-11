import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema(
      {
            title: {
                  type: String,
                  required: true
            },
            content: {
                  type: String,
                  required: true
            },
            userId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'User', 
                  required: true
            },
            tags: {
                  type: [String],
                  required: true,
                  default: []
            },
            isPinned: {
                  type: Boolean,
                  required: true,
                  default: false
            }
      },
      { timestamps: true } 
);

export const Note = mongoose.model('Note', noteSchema);