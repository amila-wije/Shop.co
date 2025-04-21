import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { MongoClient, ObjectId } = require('mongodb');

const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));


mongoose.connect("mongodb+srv://amila:amila123@cluster0.tzjqsvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  
  
const User = mongoose.model("User", new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  }));
//images
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

// Register route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  try {
    await User.create({ name, email, password: hashedPass });
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "error", error: "Duplicate email" });
  }
});

  //Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send({ status: "error", error: "User not found" });

  const validPass = await bcrypt.compare(password, user.password); // Ensure await is used correctly
  if (!validPass) return res.send({ status: "error", error: "Invalid password" });

  const token = jwt.sign({ email: user.email }, "secret123");
  res.send({ status: "ok", token ,name: user.name});
});

//admin
app.get('/api/items', async (req, res) => {
  try {
    const items = await db.collection('items').find({}).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new item with image upload
app.post('/api/items', upload.single('image'), async (req, res) => {
  try {
    const { name, brand, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    const newItem = {
      name,
      brand,
      price: parseFloat(price),
      imageUrl,
      createdAt: new Date()
    };
    
    const result = await db.collection('items').insertOne(newItem);
    res.status(201).json({ 
      ...newItem, 
      _id: result.insertedId 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the item to get the image path
    const item = await db.collection('items').findOne({ _id: new ObjectId(id) });
    
    // Delete the item from the database
    const result = await db.collection('items').deleteOne({ _id: new ObjectId(id) });
    
    // Delete the associated image if it exists
    if (item && item.imageUrl) {
      const imagePath = path.join(__dirname, item.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

