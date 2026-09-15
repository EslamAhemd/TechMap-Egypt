const reportsService = require("../services/reports.service");

// Create a new report
const createReport = async (req, res) => {
    try {
        const report = await reportsService.createReport(req.body);

        res.status(201).json({
            success: true,
            message: "Report created successfully",
            data: report
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get all reports
const getAllReports = async (req, res) => {
    try {
        const reports = await reportsService.getAllReports();

        res.status(200).json({
            success: true,
            data: reports
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get report by ID
const getReportById = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await reportsService.getReportById(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        res.status(200).json({
            success: true,
            data: report
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get reports for a specific target
const getReportsByTarget = async (req, res) => {
    try {
        const { targetType, targetId } = req.params;

        const reports = await reportsService.getReportsByTarget(
            targetType,
            targetId
        );

        res.status(200).json({
            success: true,
            data: reports
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update report status
const updateReportStatus = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { status, adminNotes } = req.body;

        const report = await reportsService.updateReportStatus(
            reportId,
            status,
            adminNotes
        );

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Report updated successfully",
            data: report
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Delete report
const deleteReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await reportsService.deleteReport(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Report deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createReport,
    getAllReports,
    getReportById,
    getReportsByTarget,
    updateReportStatus,
    deleteReport
};