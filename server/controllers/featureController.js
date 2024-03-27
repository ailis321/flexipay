
const Feature = require('../models/feature');

// Function to fetch all features
exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to create and save new features
exports.createFeatures = async (req, res) => {
  try {
    const features = req.body; 

    const savedFeatures = [];
    for (const featureData of features) {
      const newFeature = new Feature({
        icon: featureData.icon,
        title: featureData.title,
        description: featureData.description
      });

      const savedFeature = await newFeature.save();
      savedFeatures.push(savedFeature);
    }

    res.json(savedFeatures);
  } catch (error) {
    res.status(500).json({ message: 'Error saving features', error: error });
  }
};
