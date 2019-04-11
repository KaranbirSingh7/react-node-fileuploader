const express = require("express");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 8000;
const app = express();

// Use fileUpload as middleware
app.use(fileUpload());

// Upload endpoint
app.post("/upload", (req, res) => {
  if(req.files === null) {
    return res.status(400).json({
      "msg": "No file uploaded"
    });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  console.log(`
    filename: ${file.name}
    filepath: /uploads/${file.name}
  `);

  res.json({  
    fileName: file.name,
    filePath: `/uploads/${file.name}`
  });

});

app.get("/", (req, res) => {
  res.json({
    message: "Server is running"
  });
});

app.listen(PORT, console.log(`Server running on: ${PORT}`));
