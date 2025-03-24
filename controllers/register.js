const User = require("../models/User/user");
const { generateToken } = require("../utils/JWT");
const { createHashPassowrd, comparePassword } = require("../utils/Password");

async function registerUser(req) {
  try {
    const user = new User(req.body);
    user.Password = await createHashPassowrd(user.Password);
    const result = await user.save();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("User registration failed");
  }
}

async function login(req) {
  try {
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) {
      return { error: "User not found", status: 404 };
    }
    console.log(user, req.body);
    const isValidPassword = await comparePassword(
      req.body?.Password,
      user.Password
    );
    console.log(isValidPassword);
    if (!isValidPassword) {
      return { error: "Invalid password", status: 401 };
    } else {
      const token = await generateToken({ id: user._id, User: user.Name });
      return { token, status: 200 };
    }
  } catch (error) {
    console.log(error);
    return { error: "Internal server error", status: 500 };
  }
}

async function updateUserDetails(id, updateValues) {
  try {
    const user = await User.findById(id);
    if (!user) {
      return { error: "User not found", status: 404 };
    }
    // console.log(user._id);
    if (id.toString() === user._id.toString()) {
      user.Password = (await comparePassword(
        updateValues.oldPassword,
        user.Password
      ))
        ? await createHashPassowrd(updateValues.newPassword)
        : user.Password;
      user.Name = updateValues.Name || user.Name;
      user.Email = updateValues.Email || user.Email;
      user.ContactNumber = updateValues.ContactNumber || user.ContactNumber;
      user.Address = updateValues.Address || user.Address;
      user.Pin_Code = updateValues.Pin_Code || user.Pin_Code;
      user.Outlet_Name = updateValues.Outlet_Name || user.Outlet_Name;
      user.Outlet_GSTNO = updateValues.Outlet_GSTNO || user.Outlet_GSTNO;
      const newUser = await User.updateOne({ _id: id }, { $set: user });
      return newUser;
    } else return { error: "Unauthorsed access", status: 404 };
  } catch (error) {
    console.log(error);
    throw new Error("User update failed");
  }
}

module.exports = { registerUser, login, updateUserDetails };
