import mongoose from "mongoose";

const chatSchema=new mongoose.Schema(
    {
        userInput: String,

       planner: String,

       executor: String,

       critic: String,

       final: String,

       score: Number,

      rounds: Number,
    },
    {
        timestamps: true,
    }
);
export default mongoose.model("Chat",chatSchema);


