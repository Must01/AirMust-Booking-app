import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv
import { connectDB } from "./config/db.js";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcryptjs from "bcryptjs";
import download from "image-downloader";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import fs from "fs";

// imported modules
import { User } from "./models/users.model.js";
import { Place } from "./models/places.model.js";
import { Booking } from "./models/booking.model.js";

const bcryptSalt = bcryptjs.genSaltSync(10);
const jwtSecret = "ahkflasdhfjksdhfjashlfweifh";
// configure dotenv
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an express app
const app = express();

// Enable CORS for requests coming from localhost:5173
app.use(express.json());
app.use(cookieParser()); // use
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // Allow requests only from this origin
  })
);

// function to get user data from the token
function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(
      req.cookies.token,
      jwtSecret,
      {},
      async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      }
    );
  });
}

// Define a basic route
app.get("/test", (req, res) => {
  res.json({ success: true, message: "Hello World" });
});

// user regestration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcryptjs.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    console.error(e);
    res.status(422).json({ success: false, message: e.message });
  }
});

// user Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email: email });

  const passOK = bcryptjs.compareSync(password, userDoc.password);
  if (passOK) {
    jsonwebtoken.sign(
      { name: userDoc.name, email: userDoc.email, id: userDoc._id },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(userDoc);
      }
    );
  } else {
    res.status(422).json({ success: false, message: "user not Found" });
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;

  // Check if there's no token in the cookies
  if (!token) {
    return res.json({ success: false, message: "User is not logged in" });
  }

  // If token exists, verify it
  jsonwebtoken.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      // If the token is invalid or expired, send a response
      return res.json({ success: false, message: "Invalid or expired token" });
    }

    // Token is valid, find user by ID
    const user = await User.findById(userData.id);

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // If the user exists, return their data
    const { name, email, _id } = user;
    res.json({ name, email, _id });
  });
});

// logout
app.post("/logout", async (req, res) => {
  res.cookie("token", "").json({ success: true, message: "logged out" });
});

// uploads pictures from link
app.post("/uploadByLink", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await download.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync(__dirname + "/uploads")) {
  fs.mkdirSync(__dirname + "/uploads");
}

// Fix multer configuration
const photosmiddleware = multer({ dest: __dirname + "/uploads" });
app.post("/upload", photosmiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    // Extract just the filename from the full path
    const filename = newPath.split("\\").pop();
    uploadedFiles.push(filename);
  }
  res.json(uploadedFiles);
});

// addPlace :
app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    addresse,
    photos,
    description,
    features,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jsonwebtoken.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    try {
      const placeDoc = await Place.create({
        owner: userData.id,
        title,
        addresse,
        photos,
        description,
        features,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.status(200).json(placeDoc);
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "Error adding your place: " + error.message,
      });
    }
  });
});

// get places
app.get("/user-place", async (req, res) => {
  const { token } = req.cookies;
  jsonwebtoken.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

// get place by id :
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

// update place :
app.put("/places/:id", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    addresse,
    photos,
    description,
    features,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  try {
    // Verify user token
    const userData = await new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) reject(err);
        resolve(userData);
      });
    });

    // Find and update the place
    const placeDoc = await Place.findById(id);
    if (!placeDoc) {
      return res.status(404).json({ error: "Place not found" });
    }

    // Check ownership
    if (placeDoc.owner.toString() !== userData.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Update place
    await Place.findByIdAndUpdate(id, {
      title,
      addresse,
      photos,
      description,
      features,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    res.json({ success: true, message: "Place updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all places :
app.get("/places", async (req, res) => {
  // get all the places
  const places = await Place.find();
  res.json(places);
});

// get place by the id :
app.get("/place/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await Place.findById(id));
  } catch (error) {
    res.json({
      success: false,
      message: "error getting the place Data" + error.message,
    });
  }
});

// create a booking
app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, name, mobile, checkIn, checkOut, numberGuests, price } =
    req.body;
  await Booking.create({
    user: userData.id,
    place,
    name,
    mobile,
    checkIn,
    checkOut,
    numberGuests,
    price,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((error) => res.json({ success: false, message: error }));
});

// get booking by Id
app.get("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  const bookingDoc = await Booking.findById(id);
  res.json(bookingDoc);
});

// get all bookings for my user
app.get("/bookings", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const bookings = await Booking.find({ user: userData.id }).populate({
      path: "place",
      options: { lean: true },
    });
    res.json(bookings);
  } catch (error) {
    res.json({
      success: false,
      message: `error getting all the places ${error}`,
    });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectDB();
});
