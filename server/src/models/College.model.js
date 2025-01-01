import { Schema, model } from "mongoose";

const collegeSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  feeStructure: [
    {
      title: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
});

const College = model("College", collegeSchema);

export default College;