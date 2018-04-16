const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    var obj = {
        title:"RPSSLGame",
        link: req.protocol + '://' + req.get('host') + req.originalUrl
    };
    res.render('pages/index',obj);
});

module.exports = router;