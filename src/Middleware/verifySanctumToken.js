import axiosClient from "../axios.js";

const VerifySanctumToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "false",
        message: "Token tidak ada",
      });
    }

    const response = await axiosClient.post(
      "verify-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    req.user = response.data.user;
    req.token = token;
    next();
  } catch (error) {
    console.error("Error in VerifySanctumToken middleware:", error.message);
    return res.status(500).json({
      status: "false",
      message: error.response.data.message,
    });
  }
};

export default VerifySanctumToken;
