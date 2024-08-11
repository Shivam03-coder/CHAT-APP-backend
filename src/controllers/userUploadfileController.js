import { mkdirSync, renameSync } from "fs";
import path from "path";

const userUploadfileController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "failed",
        message: "No file uploaded.",
      });
    }

    const date = Date.now();
    const fileDir = path.join('uploads', 'files', date.toString());
    const fileName = path.join(fileDir, req.file.originalname);

    mkdirSync(fileDir, { recursive: true });

    renameSync(req.file.path, fileName);

    res.status(200).json({
      status: "success",
      filepath: fileName,
    });
  } catch (error) {
    console.error('Error uploading file:', error); // Log the error for debugging
    res.status(500).json({
      status: "failed",
      message: "Unable to upload file.",
    });
  }
};

export default userUploadfileController;
