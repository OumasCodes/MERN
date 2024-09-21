const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res) => {
  let users = "";
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(new HttpError("Fetching users failed, please try again.", 500));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return next(new HttpError("Could not create user, email already exists.", 422));
  }

  const createdUser = new User({
    name,
    email,
    password,
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next("Could not create user", error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HttpError("Please provide email and password", 422));
  }

  const identifiedUser = await User.findOne({ email: email });

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError("Could not identify user, credentials seem to be wrong.", 401));
  }

  res.json({ message: "Logged in!", user: identifiedUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
