const express = require("express");

const {
    createReport,
    getAllReports,
    getReportById,
    getReportsByTarget,
    updateReportStatus,
    deleteReport,
    getReportsCountByStatus
} = require("../controller/reports.controller.js");

const router = express.Router();

// Create a new report
router.post("/", createReport);

// Get all reports
router.get("/", getAllReports);

router.get("/stats/status", getReportsCountByStatus);


// Get reports for a specific target
router.get("/target/:targetType/:targetId", getReportsByTarget);


// Get report by ID
router.get("/:reportId", getReportById);

// Update report
router.put("/:reportId", updateReportStatus);

// Delete report
router.delete("/:reportId", deleteReport);

module.exports = {
    reportRouter: router
};