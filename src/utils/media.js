const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const prepareForStreaming = (inputFilename, outputFilename) => {
  return new Promise((resolve, reject) => {
    let outputDir = path.join(appRoot, "videos", outputFilename);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    ffmpeg(path.join(appRoot, "temp", inputFilename), { timeout: 432000 })
      .addOptions([
        "-profile:v baseline",
        "-level 3.0",
        "-start_number 0",
        "-hls_time 30",
        "-hls_list_size 0",
        "-f hls",
      ])
      .output(path.join(outputDir, `${outputFilename}.m3u8`))
      .on("end", () => {
        resolve();
      })
      .on("error", (err) => {
        return reject(new Error(err));
      });
  });
};

module.exports = {
  prepareForStreaming,
};
