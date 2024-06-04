import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // Exclude the logged in user from the list of users to be displayed in the sidebar and
    // send only the necessary fields to the client (not the password)
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);
    // this data is being expected by the useGetConversations hook in the frontend
  } catch (error) {
    console.log("Error in getUsersForSidebar controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getUsersForSidebar;