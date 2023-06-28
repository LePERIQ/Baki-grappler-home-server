const express = require("express");
const fs = require("fs");

const videoApiRoute = express.Router();

videoApiRoute.get("/", async (req, res) => {
  try {
    // const { id } = req.params;
    const { range } = req.headers;
    // console.log(range);
    if (!range) {
      res.status(400).send('error');
      return
    }

    const videoPath = "video.mp4";
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 10 ** 6;

    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);
    videoLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": videoLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, {start, end});
    videoStream.pipe(res);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = videoApiRoute;
