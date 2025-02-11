import "dotenv/config";
import connectDb from "./db/connectDB.js";
import { app } from "./app.js";


console.log(process.env.MONGODB_URI);

connectDb()
.then(
      () => {
            console.log('MongoDB connected');
            app.on('error', (error) => {
                  console.error('MongoDB connection Failed', error);
                  throw new Error('MongoDB connection Failed', error);
            });
            app.listen(process.env.PORT || 8000, () => {
                  console.log(`Server running on port http://localhost:${process.env.PORT}`);
            });
      }
).catch((error) => {
      console.error('MongoDB connection Failed', error);
});