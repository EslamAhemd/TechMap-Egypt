  const { companyModel } = require("../models/companies.model");

const getCompanies = async (req, res) => {
  try {
    const data = await companyModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "error occurred", err });
  }
};

const addCompany = (req, res) => {
  companyModel.create(req.body)
    .then(() => res.status(201).json({ message: "added" }))
    .catch((err) => res.status(500).json({ err }));
};

const updateCompany = async (req, res) => {
  try {
    const data = await companyModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!data) {
      return res.status(404).json({ message: "company not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "error occurred while updating company", err });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const data = await companyModel.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "company not found" });
    }

    res.status(200).json({ message: "company deleted successfully", data });
  } catch (err) {
    res.status(500).json({ message: "error occurred while deleting company", err });
  }
};

module.exports = { getCompanies, addCompany, updateCompany, deleteCompany };