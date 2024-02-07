const fs = require("fs");
const path = require("path");

function renameFilesInDirectory(directory = process.cwd(), oldPart, newPart) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }

    files.forEach((file, index) => {
      const filePath = path.join(directory, file);

      fs.stat(filePath, (error, stat) => {
        if (error) {
          console.error("Error stating file.", error);
          return;
        }

        if (stat.isFile() && file.includes(oldPart)) {
          const newFilePath = path.join(directory, file.replace(oldPart, newPart));
          fs.rename(filePath, newFilePath, (err) => {
            if (err) console.log("ERROR: " + err);
          });
        } else if (stat.isDirectory()) {
          renameFilesInDirectory(filePath, oldPart, newPart); // Recursive call for subdirectories
        }
      });
    });
  });
}

// Usage
renameFilesInDirectory(undefined, ".js", ".ts");
renameFilesInDirectory(undefined, ".jsx", ".tsx");
