const uuid = require("uuid");
const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "oumasCodes",
    email: "abdellahoumas@gmail.com",
    password: "123456",
  },
  {
    id: "u2",
    name: "oumasCodes2",
    email: "abdellahoumas2@gmail.com",
    password: "123456",
  },
  {
    id: "u3",
    name: "oumasCodes3",
    email: "abdellahoumas3@gmail.com",
    password: "123456",
  },
];

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_PLACES.find((u) => u.id === userId);

  if (!user) {
    return next(new HttpError("Could not find a user with the provided id", 404));
  }
  res.json({ user });
};

const getAllUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.some((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("User already exists", 422);
  }

  const createdUser = {
    id: uuid.v4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Could not identify user, credentials are not valid", 401);
  }
  res.json({ message: "Login Successful", user: identifiedUser });
};

const updateUser = (req, res, next) => {
  const userId = req.params.uid;
  const updatedUser = req.body;
  const userIndex = DUMMY_USERS.findIndex((u) => u.id === userId);
  DUMMY_USERS[userIndex] = updatedUser;
  res.status(200).json({ user: updatedUser });
};

const deleteUser = (req, res, next) => {
  const userId = req.params.uid;
  const userIndex = DUMMY_USERS.findIndex((u) => u.id === userId);
  DUMMY_USERS.splice(userIndex, 1);
  res.status(200).json({ message: "User Deleted" });
};

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
