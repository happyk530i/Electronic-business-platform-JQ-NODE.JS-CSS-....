var express = require("express");
var router = express.Router();
var queryString = require("querystring");
var mysql = require("mysql");
var http = require ('http');
var url = require ('url');
var bodyParser = require("body-parser");
var urlencodeParser = bodyParser.urlencoded();
/* GET home page. */
var conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "mfee08",
});
router.get('/', function(req, res, next) {
  // console.log(req.session.userName);
  console.log(req.query.backUrl);
  res.render('index', { 
    backUrl:req.query.backUrl,
    userName: req.session.userName,
  });
});
// index首頁 接收form表單
router.use(bodyParser.urlencoded({extended:false}));

router.post("/", function (req, res, next) {
  // res.send(req.body);
  if(req.body.title == "trip") {
    req.session.locatTrip = req.body.area;
    // res.send(req.session.locatTrip);
    res.redirect("/trip/searchTrip");

  }else if(req.body.title == "guide") {
    req.session.locatGuide = req.body.area;
    // res.send(req.session.locatGuide);
    res.redirect("/guide/searchGuide");
  }
  next();
});
router.get("/guide", function (req, res, next) {
  res.render("guide_list", {
    userName: req.session.userName,
    title: "guide",
    area: ""
  });
});
router.get("/trip", function (req, res, next) {
  res.render("guide_list", {
    userName: req.session.userName,
    title: "trip",
    area: ""
  });
});
router.get("/trip/searchTrip", function (req, res, next) {
  // conn.query("SELECT * FROM `triplist` WHERE `tripState` = "+ `"${req.session.locatTrip}"`, "", function (err, rows) {
  //  if (err) {
  //     console.log(JSON.stringify(err));
  //     return;
  //   }
    // response.send(JSON.stringify(rows));
    res.render("guide_list", {
      userName: req.session.userName,
      title: "trip",
      area: req.session.locatTrip
    });
  });
// });

router.get("/guide/searchGuide", function (req, res, next) {
  res.render("guide_list", {
    userName: req.session.userName,
    title: "guide",
    area:req.session.locatGuide
  });
});
router.get("/guide/guide_detail", function (req, res, next) {
  conn.query("select * from memberlist m join triplist t on m.memberId=t.memberId", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }   
    var g = req.url.replace("/guide/guide_detail?id=","")
    console.log(g);
    if(g==="/guide/guide_detail"){
     g=0;
    }
    console.log(g);
    res.render("guide_detail", {
      userName: req.session.userName,
      userId:req.session.userId,
      title:rows[g],
    });
  });
});
//取得獨立商品資料
router.get("/trip/location_detail", function (req, res, next) {
  conn.query("select * from tripList", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }   
    var y = req.url.replace("/trip/location_detail?id=","")
    console.log(y);
    if(y==="/trip/location_detail"){
     y=0;
    }
    console.log(y);
    res.render("location_detail", {
      userName: req.session.userName,
      userId:req.session.userId,
      title:rows[y],
    });
  });
});
//歷史購物
router.get("/historyshopcart", function (req, res, next) {
  conn.query("select * from cartlist", "", function (err, result) {
      if (err) 
        console.log(JSON.stringify(err));
        var indices = [];
      const UsPhon =  result.map(item => Object.values(item)[4]);
      var idx = UsPhon.indexOf(req.session.userName); 
      while (idx != -1) {
        indices.push(idx);
        idx = UsPhon.indexOf(req.session.userName, idx + 1);
      }
      const map1 = indices.map(x => result[x] );
   if (req.session.userName === "Guest") {
        res.render("login", { passWord: req.body.txtPassword });
        return;
      } else{
        res.render("historyshopcart", {
          userName: req.session.userName,
          title:map1,  
        });
      }
    });
  });
//post資料
// 加入購物車清單到資料庫

router.post("/trip/location_detail", function (req, res, next) {
console.log(req.body);
var tD = toString(req.body.tripDate);
var tT= toString(req.body.tripTime)
conn.query(('INSERT INTO `cartlist`(`membeTel`,`memberId`,`preTripName`,`preGuideId`,`preTripDate`,`preTripTime`,`tripId`,`tripPeo`,`orderLan`,`preTripPrice`,`tripNeed`) VALUES('
+`'${req.session.userName}','${req.body.memberId}','${req.body.preTripName}','${req.body.preGuideId}','${req.body.tripDate}','${req.body.tripTime}','${req.body.preTripId}','${req.body.adultCount}','${req.body.orderLan}','${req.body.totalPrice}','${req.body.Content}')`), "", function (err, rows) {
res.redirect("/users/shopcart");
})
});

module.exports = router;
