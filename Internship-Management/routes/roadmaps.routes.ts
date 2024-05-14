import express from "express";
import { deleteRoadmapDetails, getAllRoadmapDetails, getRoadmapDetails, postRoadmapDetails, updateRoadmapDetails } from "../controllers/roadmaps.controller";
import { deleteTopicDetails, getAllTopics, getTopicDetails, postTopicDetails, updateTopicDetails } from "../controllers/topics.controller";

const router = express.Router();
router.route("/").get(getAllRoadmapDetails).post(postRoadmapDetails);
router.route("/:id").get(getRoadmapDetails).patch(updateRoadmapDetails).delete(deleteRoadmapDetails);
router.route("/:id/topics").get(getAllTopics).post(postTopicDetails);
router.route("/:id/topics/:topicId").get(getTopicDetails).patch(updateTopicDetails).delete(deleteTopicDetails);

export default router;
