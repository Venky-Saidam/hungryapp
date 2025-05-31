const mongoose = require('mongoose');

require('dotenv').config();
const port = process.env.PORT || 5000;

const mongoURI = process.env.MONGO_URI;


const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected Successfully!");

        const db = mongoose.connection.db;

        const foodItemsCollection = db.collection("food_items");
        const foodCategoryCollection = db.collection("foodCategory");

        const foodItemsData = await foodItemsCollection.find({}).toArray();
        const foodCategoryData = await foodCategoryCollection.find({}).toArray();

        global.food_items = foodItemsData;
        global.foodCategory = foodCategoryData;

    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};


module.exports = mongoDB;
