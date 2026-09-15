const { reportModel } = require("../models/reports.model");


// Create a new report
const createReport = async (reportData) => {
    const report = new reportModel(reportData);

    return await report.save();
};


// Get all reports
const getAllReports = async () => {
    return await reportModel.find();
};


// Get report by ID
const getReportById = async (reportId) => {
    return await reportModel.findById(reportId);
};


// Get reports for a specific target
const getReportsByTarget = async (targetType, targetId) => {
    return await reportModel.find({
        targetType: targetType,
        targetId: targetId
    });
};


// Update report status
const updateReportStatus = async (reportId, status, adminNotes) => {
    return await reportModel.findByIdAndUpdate(
        reportId,
        {
            status: status,
            adminNotes: adminNotes
        },
        { new: true }
    );
};


// Delete report
const deleteReport = async (reportId) => {
    return await reportModel.findByIdAndDelete(reportId);
};


module.exports = {
    createReport,
    getAllReports,
    getReportById,
    getReportsByTarget,
    updateReportStatus,
    deleteReport
};
