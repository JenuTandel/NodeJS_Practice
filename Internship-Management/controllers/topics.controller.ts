import { Request, Response } from "express";
import pool from "../server/postgres.server";

const getAllTopics = (req: Request, res: Response) => {
    const id = req.params.id;
    const query = `Select * from topics where roadmap_id=$1`;
    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            return;
        }
        res.status(200).json(result.rows);
    });
}

const getTopicDetails = (req: Request, res: Response) => {
    const id = req.params.id;
    const query = `Select * from topics where id=$1`;
    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            return;
        }
        res.status(200).json(result.rows);
    });
}

const postTopicDetails = (req: Request, res: Response) => {
    try {
        const roadmapId = req.params.id;
        const { topicname, subtopic, day_id, duration } = req.body;
        const queryInsertTopic = `INSERT INTO topics (topicname, subtopic, day_id, duration, roadmap_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
        const valuesInsertTopic = [topicname, subtopic, day_id, duration, roadmapId];
        pool.query(queryInsertTopic, valuesInsertTopic, (err, result) => {
            if (err) {
                console.error("Error inserting topics:", err);
                return res.status(500).json({ message: "Error inserting topics" });
            }
            const topicId = result.rows[0].id;
            const queryUpdateRoadmap = `UPDATE roadmap SET topics = array_append(topics, $1) WHERE id = $2`;
            const valuesUpdateRoadmap = [topicId, roadmapId];
            pool.query(queryUpdateRoadmap, valuesUpdateRoadmap, (err, result) => {
                if (err) {
                    console.error("Error updating roadmap:", err);
                    return res.status(500).json({ message: "Error updating roadmap" });
                }
                res.status(201).json({ message: "Topic inserted successfully and roadmap updated" });
            });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateTopicDetails = (req: Request, res: Response) => {
    const id = req.params.id;
    const { topicname, subtopic, dayid, duration } = req.body;
    const query = `UPDATE topics SET "topicname"=COALESCE($1,"topicname"), "subtopic"=COALESCE($2,"subtopic"), "dayid"=COALESCE($3,"dayid"), "duration"=COALESCE($4,"duration") WHERE "id"=$5`;
    const values = [topicname, subtopic, dayid, duration, id]
    pool.query(query, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res
                .status(500)
                .json({ message: "Error updating topic details" });
        }
        res
            .status(200)
            .json({ message: "topic details updated successfully" });
    });
}

const deleteTopicDetails = (req: Request, res: Response) => {
    const id = req.params.id;
    const query = `DELETE FROM topics WHERE id=$1`;
    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            res.status(500).json({
                status: "error",
                message: "Error executing query",
            });
            return;
        }
        res.status(201).json({
            status: "success",
            message: "topic details deleted successfully",
        });
    });
};

export { getAllTopics, getTopicDetails, postTopicDetails, updateTopicDetails, deleteTopicDetails }