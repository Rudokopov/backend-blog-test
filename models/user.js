import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) =>
        `${props.value} не является допустимым email адресом!`,
    },
  },
  passwordHash: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model("user", userSchema);
