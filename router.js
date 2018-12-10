var express = require("express")
var client = require("./discord.js")
var router = express.Router()
var JSZip = require("jszip");
var fs = require("fs");


const check = require('./check.js')
const bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());

router.get("/",function(req,res) {
    res.render("index",{title:"Tako's FetchBot Web Interface"})
})

router.get('/submit',function(req,res) {
    res.redirect("/");
})

router.post("/submit",function(req,res) {
    if (client.channels.get(req.body.id)) {
        if(check.check(req.body.id) == req.body.pass) {
            var channel = client.channels.get(req.body.id)

            channel.fetchMessages({limit:100})
                .then(function(result) {
                    var images = []
                    result.forEach(function(item) {
                        if (item.attachments.array().length != 0) {
                            item.attachments.forEach(function(item){
                                if (item.url.match(/\.(jpeg|jpg|gif|png)$/)) {
                                    images.push(item.url);
                                }
                            })
                        } else if (item.embeds.length != 0) {
                            item.embeds.forEach(function(result) {
                                if (result.image != null) {
                                    images.push(result.image.url)
                                }
                            })
                        }
                    })
                    res.render('list', {
                        list: images
                    })
                })

        }
    }
})

router.post("/download",function(req,res) {
    var zip = new JSZip();
    var img = zip.folder("images");
    console.log(req.body.image);
})


module.exports = router;