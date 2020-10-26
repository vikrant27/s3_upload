var s3 = require('s3-node-client');
require('dotenv').config();
 
var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.Secret_Access_Key,
    region: process.env.region
    
  },
});


var params = {
  localDir: "./project-html-website",
  deleteRemoved: true, 
  s3Params: {
    Bucket: process.env.Bucket
  }
};
var uploader = client.uploadDir(params);
uploader.on('error', function(err) {
  console.error("unable to sync:", err.stack);
});
uploader.on('progress', function() {
  console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  console.log("done uploading");
});