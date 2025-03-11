import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addThoughtReaction, removeThoughtReaction } from '../../controllers/thoughtController.js';

router.route('/').get(getThoughts).post(createThought);

router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions').post(addThoughtReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

export default router;