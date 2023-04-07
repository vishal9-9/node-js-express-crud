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

const getUser = async () => {
  const data = await User.find({ name: "Alex" })
    // .find({price: {$eq: 10}}) $ne, $gt, $gte, $in, $nin, $lt, $lte
    // .find({price: {$in: [10, 15, 20]}})
    // .find({name: /^Alex/i}) starts with alex i for case insensitive
    // .find({name: /Alex$/i}) ends with alex i for case insensitive
    // .find({name: /.*Alex.*/i}) contains alex i for case insensitive
    // .or({price: {$eq: 10}}, {price: {$eq: 15}})
    // .and({price: {$eq: 10}}, {price: {$eq: 15}})
    .limit(10) // limit the number of output
    .sort({ name: 1 }) // sort by name 1 = asc, -1 = desc
    .select({ name: 1, email: 1 }); // only return name & email
  console.log(data);
};

// console.log(createUser());
getUser();
