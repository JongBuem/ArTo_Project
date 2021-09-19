var express = require("express");    
var app = express();
var mysql= require("./routes/mysql");
var bodyparser = require('body-parser');
var axios = require('axios')
app.use(bodyparser.json());
app.use(express.urlencoded({ extended : true  }));
mysql.connect();

app.use(express.static(__dirname+ "./routes"));
app.use(express.static(__dirname+ "/public"));
app.set("views", __dirname+ "/views");
app.set("view engine", "ejs");

var homepage = require("./routes/homepage");
var serverpage = require("./routes/serverpage");
var error = require("./routes/error");
var login = require("./routes/login");
var signup = require("./routes/signup");
var certification = require("./routes/certification");
var didfind = require("./routes/didfind");
var userinfo = require("./routes/userinfo");
var blockchain = require("./routes/blockchain");
var scanner = require("./routes/scanner");
var emailfind = require("./routes/emailfind");
var passwordfind = require("./routes/passwordfind");
var userinfoupdate =require("./routes/userinfoupdate");
var toiletlocation = require("./routes/toiletlocation");
var usagehistory = require("./routes/usagehistory");
var toiletinfo = require("./routes/toiletinfo");
var review = require("./routes/review");
var reviewupdate = require("./routes/reviewupdate");

app.use('/homepage',homepage);                  // 홈페이지
app.use('/serverpage',serverpage);              // 서버홈페이지
app.use('/error',error);                        // 에러 페이지
app.use('/api/login',login);                    // 로그인
app.use('/api/signup',signup);                  // 회원가입
app.use('/api/certification',certification);    // 휴대전화 인증
app.use('/api/didfind',didfind);                // 이메일로 did 찾기
app.use('/api/scanner',scanner);                // did 데이터
app.use('/api/userinfo',userinfo);              // 회원정보 가져오기
app.use('/api/blockchain',blockchain);          // 가상의 블록체인서버
app.use('/api/emailfind',emailfind);            // 휴대전화로 이메일찾기
app.use('/api/passwordfind',passwordfind);      // 이메일로 비밀번호찾기
app.use('/api/userinfoupdate',userinfoupdate);  // 회원정보 수정
app.use('/api/toiletlocation',toiletlocation)   // 지도에서 DB의 화장실 위치정보 가져오기
app.use('/api/usagehistory',usagehistory)       // 이용내역
app.use('/api/toiletinfo',toiletinfo)           // 원하는 화장실 정보 가져오기
app.use('/api/review',review)                   // 리뷰 가져오기
app.use('/api/reviewupdate',reviewupdate)       // 리뷰 작성

// scanner 서버
app.use('/api/scanner',scanner);                // scanner 데이터
app.listen(8080)