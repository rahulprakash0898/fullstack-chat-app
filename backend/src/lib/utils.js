import jwt from "jsonwebtoken";

export const generateTokens = (userId, res) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 15 * 60 * 1000, // 15 mins
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: process.env.NODE_ENV === "development" ? "strict" : "none", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in MS
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
    secure: process.env.NODE_ENV !== "development",
  });

  return { accessToken, refreshToken };
};
