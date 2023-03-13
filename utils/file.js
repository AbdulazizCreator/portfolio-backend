const path = require("path");
const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");

// upload image
exports.uploadImage = async (req, photo_model, model_id, model, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse("Please upload a file", 400));
  }

  const file = req.files.file;
  console.log(file);
  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_SIZE) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_SIZE}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${photo_model}_${file.md5}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
    model_id && (await model.findByIdAndUpdate(model_id, { photo: file.name }));
    console.log("Update photo");
  });
  res.status(200).json({
    success: true,
    data: file.name,
  });
  next();
};

exports.deleteImage = async (req, res, next, model, model_id) => {
  try {
    fs.unlinkSync(`${process.env.FILE_UPLOAD_PATH}/${req.params.file}`);
    model_id && (await model.findByIdAndUpdate(model_id, { photo: undefined }));
    console.log("Delete photo");
    res.status(200).json({ message: "Image deleted" });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse(`Problem with file delete`, 500));
  }
};
