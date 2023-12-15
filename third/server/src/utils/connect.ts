import mongoose from "mongoose";

const connect = async () => {
  const dbUri: string = "mongodb://notadmin:notpassword@localhost:27017";
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to the DB");
  } catch (error) {
    console.error("error connecting to the database");
    process.exit(1);
  }
};

export default connect;
