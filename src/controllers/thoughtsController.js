import Thought from '../models/Thoughts';
import User from '../models/User';

export const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find().populate('userId', 'username');
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findbyId(req.params.thoughtId).populate('userId', 'username');
        if (!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createThought = async (req, res) => {
    try {
      const { userId, content } = req.body;
      const newThought = await Thought.create({ userId, content });
      await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });
      res.status(201).json(newThought);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
export const updateThought = async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export const deleteThought = async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: req.params.thoughtId } });
      res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
 
export const addThoughtReaction = async (req, res) => {
    try {
      const { userId, type } = req.body;
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: { userId, type } } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export const removeThoughtReaction = async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };