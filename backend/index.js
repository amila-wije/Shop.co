const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/inventoryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Item Schema
const itemSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  imageUrl: String
});
const Item = mongoose.model('Item', itemSchema);

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// Routes
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

app.post('/api/items', upload.single('image'), async (req, res) => {
  try {
    const { name, brand, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const item = new Item({ name, brand, price, imageUrl });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving item" });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Vercel backend!' });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
