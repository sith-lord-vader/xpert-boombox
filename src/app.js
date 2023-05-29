const path = require("path"),
  mongoose = require("mongoose");
global.appRoot = path.join(path.resolve(__dirname), "..");

console.log(appRoot);
