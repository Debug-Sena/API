const fs = require("fs");
const uploadFile = async (file, filename) => {
  console.log(here)
  try {
    fs.writeFile(`/images/${filename}`, file, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    // Or
  } catch (e) {
    console.log(e);
  }
};

module.exports = { uploadFile };
