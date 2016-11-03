var express = require("express");

var path = require("path");

var multer = require("multer");

var upload = multer({
	dest: 'uploads/'
})

var app = express();

var bodyParser = require("body-parser");

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/file_upload", upload.single('file_upload'), function(req, res) {
	console.log(req.body);
	console.log(req.file);
	if (req.file && req.file.size) {
		res.status(200).json({
			"size": req.file.size
		});
	} else {
		res.status(200).json({
			"size": null
		});
	}
});

app.listen(port, function() {
	console.log("Server is listening on " + port);
})