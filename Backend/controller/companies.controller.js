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

module.exports = { getCompanies, addCompany };