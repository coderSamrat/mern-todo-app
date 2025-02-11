import mongoose from 'mongoose';

const connectDb = async () => {
      try {
            const db = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`);
            console.log(`Connected to MongoDB: ${db.connection.host}`);
      } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
      }
};

export default connectDb;