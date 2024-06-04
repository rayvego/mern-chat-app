// explanation of how JWT basically works
// in tradition web development, we use sessions and cookies to authenticate users,
// when the user logs in, the server creates a session and stores it in the server memory
// keep in mind the server stores the session in memory, so if the server crashes, the session is lost
// now in the modern web development, we use JWT (JSON Web Token) to authenticate users
// when the user logs in, the server creates a JWT token and sends it to the client
// JWT token consists of three parts: header, payload, signature
// header: contains the type of token and the hashing algorithm used
// payload: contains the data that we want to send, like user id, username, etc.
// signature: contains the encoded header, encoded payload, and a secret key, the secret key is stored in the server (i.e. with us)
// the client stores the JWT token in the local storage or in the cookies
// now when the client makes a request to the server, it sends the JWT token in the header
// the server then decodes the JWT token using the secret key and verifies the signature
// if the signature is verified, the server sends the response back otherwise it sends an error

import jwt from "jsonwebtoken";

// generating the token and setting the cookie upon logging in
// this function takes two arguments, the payload and the response object.
// response object is used to set the cookie
// here in the payload, we are only sending the userId
// it is recommended that you should not send sensitive information in the payload

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });

  // sending cookie containing the JWT token along with expiry date and other options for security
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", // CSRF protection
    secure: process.env.NODE_ENV === "production",
  });
};

export default generateTokenAndSetCookie;