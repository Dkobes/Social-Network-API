import {mongoose} from 'mongoose';

const reactionSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    thoughts: [
      {
        content: { type: String, required: true }, 
        timestamp: { type: Date, default: Date.now }, 
        reactions: [
          {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
            type: { type: String, enum: ['like', 'love', 'laugh', 'angry', 'sad'], default: 'like' }, 
            timestamp: { type: Date, default: Date.now }, 
          },
        ],
      },
    ],
    friendsList: [
      {
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        addedAt: { type: Date, default: Date.now }, 
      },
    ],
  });

  const Reaction = mongoose.model('Reaction', reactionSchema);

  export default Reaction;