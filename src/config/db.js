require("dotenv").config()
const mongoose = require("mongoose")

//uri
const {MONGODB_URI} = process.env;

const connectToDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (error) {
    }   
}

connectToDb();