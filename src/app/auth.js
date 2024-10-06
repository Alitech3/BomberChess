const { User } = require("./db"); // Import User model

// Register a new user
async function registerUser(username, password) {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { success: false, message: "Username already exists" };
    }

    const newUser = new User({ username, password });
    await newUser.save();

    return { success: true, message: "User registered successfully", user: newUser };
  } catch (err) {
    console.error("Error registering user:", err);
    return { success: false, message: "Error registering user" };
  }
}

// Login an existing user
async function loginUser(username, password) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return { success: false, message: "Username not found" };
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return { success: true, message: "Login successful", user };
    } else {
      return { success: false, message: "Incorrect password" };
    }
  } catch (err) {
    console.error("Error logging in user:", err);
    return { success: false, message: "Error logging in" };
  }
}

module.exports = { registerUser, loginUser };
