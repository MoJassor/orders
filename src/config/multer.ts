import { diskStorage, memoryStorage } from "fastify-multer";
import { resolve } from "path";

export const multerConfig = {
  //   dest: resolve(__dirname, "..", "..", "uploads"),
  storage: diskStorage({
    destination: (request, file, callback) => {
      callback(null, "public/images");
    },
    filename: (request, file, callback) => {
      const filename = Date.now() + "--" + file.originalname;
      callback(null, filename);
    },
  }),
  limits: {
    // fileSize: 1 * 1024 * 1024, // 1MB
  },
  fileFilter: (request: any, file: any, callback: any) => {
    if (
      file.originalname.split(".")[1] === "png" ||
      file.originalname.split(".")[1] === "jpg" ||
      file.originalname.split(".")[1] === "jpeg"
    )
      callback(null, true);
    else callback(new Error("Format not accepted"));
  },
};
