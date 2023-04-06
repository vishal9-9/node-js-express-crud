const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/user")
  .then(() => console.log("Conneted Successfully..."))
  .catch((err) => console.log("error", err));

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  address: String,
  DOB: { type: Date },
  created_at: { type: Date, default: Date.now },
  is_active: Boolean,
});

const User = mongoose.model("User", userSchema);

const createUser = async () => {
  const user = new User({
    name: "Alex",
    email: "alex@gmail.com",
    address: "NY",
    DOB: "2022-08-13",
    is_active: true,
  });
  const result = await user.save();
  return result;
};

console.log(createUser());
