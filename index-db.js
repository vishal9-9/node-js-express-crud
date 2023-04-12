const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/user")
  .then(() => console.log("Conneted Successfully..."))
  .catch((err) => console.log("error", err));

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
    // unique: true,
    // enum: ["Vishal", "Alex", "Spiderman"],  // value of the field should be inside the array
    // match: /pattern/,
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,   // For foreign key constraint
  //   ref: "Author"
  // },
  email: {
    type: String,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 5;
          callback(result);
        }, 4000);
      },
      message: "Async task executed and result gave error",
    },
  },
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "Tags length should be greater than 1.",
    },
  },
  address: {
    type: String,
    required: function () {
      if (this?.email?.length > 5) return true;
      else return false;
    },
    lowercase: true,
    // uppercase: false,
    trim: true,
  },
  price: {
    type: Number,
    min: 10,
    max: 1100,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
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
  const pageNumber = 1;
  const pageSize = 10;

  const data = await User.find({ name: "Alex" })
    // .populate('author')  to get the foreign key value
    // .find({price: {$eq: 10}}) $ne, $gt, $gte, $in, $nin, $lt, $lte
    // .find({price: {$in: [10, 15, 20]}})
    // .find({name: /^Alex/i}) starts with alex i for case insensitive
    // .find({name: /Alex$/i}) ends with alex i for case insensitive
    // .find({name: /.*Alex.*/i}) contains alex i for case insensitive
    // .or([{price: {$eq: 10}}, {price: {$eq: 15}}])
    // .and([{price: {$eq: 10}}, {price: {$eq: 15}}])
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize) // limit the number of output
    .sort({ name: 1 }) // sort by name 1 = asc, -1 = desc
    // .count() to get total no. of data
    .select({ name: 1, email: 1 }); // only return name & email
  console.log(data);
};

const updateUser = async (id) => {
  const user1 = await User.findByIdAndUpdate(
    id,
    { $set: { name: "Spiderman" } },
    { new: true }
  );
  console.log(user1);
  // const user = await User.findById(id);
  // if (!user) console.log("User Not Found");
  // else {
  //   // (user.name = "Vishal"), user.save();
  //   user.set({
  //     name: "Peter",
  //   });
  //   user.save();
  //   console.log("Done");
  // }
};

const deleteUser = async (id) => {
  const user = await User.deleteOne({ _id: id });
  const user1 = await User.deleteMany({ _id: id });
  const user2 = await User.findByIdAndRemove({ _id: id });
};

// console.log(createUser());
// getUser();
async function run() {
  await updateUser("642ec8b58c0777f1c3d82a37");
}

run();
