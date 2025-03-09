import multer from "multer";
import path from "path";

export const uploadMemoryStorage = multer({
  storage: multer.memoryStorage(),
});

export const uploadDiskStorage = multer({
  storage: multer.diskStorage({
    // Destination function to determine where to store the files
    destination: (req, file, cb) => {
      // You can dynamically change the folder based on conditions
      cb(null, "uploads/"); // Store files in the 'uploads' directory
    },
    // Filename function to determine the name of the uploaded file
    filename: (req, file, cb) => {
      // You can customize the filename to include timestamp or random strings
      const ext = path.extname(file.originalname); // Get the file extension
      const name = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 15)}${ext}`;
      cb(null, name); // Set the filename for the uploaded file
    },
  }),
});
