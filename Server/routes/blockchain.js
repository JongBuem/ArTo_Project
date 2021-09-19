//사용자에게 did 제공
var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");
var axios = require('axios')

router.post('/',(req, res)=>{
    var name =req.body.name
    var email =req.body.email
    var gender =req.body.gender
    var phone =req.body.phone 
    var password =req.body.password
    var qr =req.body.qr
    if(qr){
        // setTimeout(() => {
        //     res.json({ message: "인증 성공"}) //클라이언트로 전달
        // }, 10000)
             res.json({ message: true}) //클라이언트로 전달
    }
    else if(!qr){
        // setTimeout(() => {
        //     res.json({ message: "DID_5"}) //클라이언트로 전달
        // }, 10000)
        res.json({ did: "did_111"}) //클라이언트로 전달
    }
});

module.exports= router;