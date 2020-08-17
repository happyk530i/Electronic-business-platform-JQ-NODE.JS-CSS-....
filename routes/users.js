var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const e = require("express");
var urlencodeParser = bodyParser.urlencoded();
// 連接mysql
var conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "mfee08",
});

/* GET users listing. */
// 購物車
router.get("/shopcart", function isLoggedIn(req, res, next) {
  if (req.session.userName !== "Guest") {
    res.render("shopcart", {
      userId: req.session.userId,
      userName: req.session.userName,
      title: "trip",
    });
  } else {
    res.redirect("/users/login");
  }
});
// 結帳頁面
router.get("/shoppay", function (req, res, next) {
  conn.query(
    "SELECT * FROM memberlist",
    "",
    function (err, rows) {
      if (err) {
        console.log(JSON.stringify(err));
        return;
      }
      // console.log(rows)
      const myData = rows.filter(word=>word.memberId==req.session.userId);
      console.log(myData);
      console.log(myData);
      res.render("shoppay", {
        userId: req.session.userId,
        userName: req.session.userName,
        payData:myData
      });
    }
  );
});
router.post("/shoppay", function (req, res, next) {
  console.log(req.body)
  conn.query("INSERT INTO `orderlist`(`memberId`,`orderIdd` , `orderDate`, `contactName`, `contactTell`, `contactBirth`, `contactEmail`, `orderTotal`, `payWay`) VALUES ( "
    +`'${req.body.memberId}','${req.body.orderIdd}','${req.body.orderDate}','${req.body.memberName}','${req.body.memberTel}','${req.body.memberBir}','${req.body.memberEmail}','${req.body.orderTotal}','${req.body.payWay}')`, 
    "") 
     res.send("row inserted.");
  
});
// router.post("/shoppay2", function (req, res, next) {
//   console.log(req.body)
//   conn.query("INSERT INTO `orderlist2`(`tripNeed`) VALUES ("
//   `'123')`
//   ,"")
//     res.send("row inserted.");
//   })
 
// });
// router.post("/shoppay2", function (req, res, next) {
//   console.log(req.body.preTripName)
//   conn.query("INSERT INTO `orderlist2`(`orderIdd`, `memberId`, `preTripName`, `preTripDate`, `preTripTime`, `tripPic`, `tripPeo`, `orderLan`, `preTripPrice`, `tripNeed`) VALUES ("
//   `'${req.body.orderIdd}',
//   '${req.body.memberId}',
//   '${req.body.preTripName}',
//   '${req.body.preTripDate}',
//   '${req.body.preTripTime}',
//   '${req.body.tripPic1}',
//   '${req.body.tripPeo}',
//   '${req.body.orderLan}',
//   '${req.body.preTripPrice}',
//   '${req.body.tripNeed}'`,"")
//   res.send("row inserted.");
// });

// 登入頁面
router.get("/login", function (req, res, next) {
  // res.send('respond with a resource');
  res.render("login", { passWord: "" });
});
// 註冊頁面
router.get("/register", function (req, res, next) {
  // res.send('respond with a resource');
  if (req.session.userName === "Guest") {
    res.render("register", { passWord: "" });
  } else {
    res.redirect("/");
  }
});
//登出
router.get("/logout", function (req, res, next) {
  // res.send('respond with a resource');
  req.session.userName = "Guest";
  res.redirect("/");
});
//會員中心_個人資料
router.get('/member', function (req, res, next) {
  conn.query("SELECT * FROM memberlist"   , function (err, result, fields) {
    if (err) throw err;
    let memberId = result.map(item => Object.values(item)[0]);//帳號
    let phidList = result.map(item => Object.values(item)[4]);//手機
    let meail = result.map(item => Object.values(item)[5]);//手機
    let side = result.map(item => Object.values(item)[10]);//手機
    let memberLike = result.map(item => Object.values(item)[6]);//手機
    let realName = result.map(item => Object.values(item)[3]);//手機
    let sexName = result.map(item => Object.values(item)[6]);//性別

    let ph= phidList.indexOf(req.session.userName);
   
    if (req.session.userName === "Guest") {
      
      res.render("login", { passWord: req.body.txtPassword });
      return;
    } else{
      res.render("member", {
        userName: req.session.userName,
        UserName:phidList[ph],
        MemberId:memberId[ph],
        Meail:meail[ph],
        Side:side[ph],
        MemberLike:memberLike[ph],
        RealName:realName[ph],
        // SexName:sexName[ph]

      });
     
    }
  });
})

router.post("/member", function (req, res, next) {
  conn.query("SELECT * FROM  memberlist", function (err, result, fields) {
    if (err) throw err;
    req.session.userName = req.body.txtUserName;
    let idList = result.map((item) => Object.values(item)[4]); //手機
    // let ph= phidList.indexOf(req.session.userName);
    if (req.body.txtUserName === "") {
      res.render("member", {
        UserName: req.session.userName,
        userName: req.session.userName,
        MemberId: req.body.txtMemberId,
        RealName: req.body.txtRealName,
        Side: req.body.txtSide,
        MemberLike: req.body.txtMemberLike,
        Meail: req.body.txtMeail,
      });
    } else if (
      idList.includes(req.body.txtUserName) &&
      req.body.txtUserName !== req.session.userName
    ) {
      res.render("member", {
        UserName: req.session.userName,
        userName: req.session.userName,
        MemberId: req.body.txtMemberId,
        RealName: req.body.txtRealName,
        Side: req.body.txtSide,
        MemberLike: req.body.txtMemberLike,
        Meail: req.body.txtMeail,
      });
    } else {
      conn.query(
        " UPDATE memberlist SET  memberName=? , memberEmail=?,memberLike=? ,guideSide=?     WHERE memberTel = ? ",
        [
          req.body.txtRealName,
          req.body.txtMeail,
          req.body.txtMemberLike,
          req.body.txtSide,
          req.body.txtUserName,
        ]
      );
      req.session.userName = req.body.txtUserName;
      res.render("member", {
        UserName: req.body.txtUserName,
        userName: req.session.userName,
        RealName: req.body.txtRealName,
        Side: req.body.txtSide,
        MemberLike: req.body.txtMemberLike,
        Meail: req.body.txtMeail,
      });
    }
  });
});

/* POST users listing. */
// 回傳登入資料
router.post("/login", function (req, res, next) {
  conn.query("SELECT * FROM memberlist", function (err, result, fields) {
    if (err) throw err;
    // const memberId = result.map((item) => Object.values(item)[0]);
    const idList = result.map((item) => Object.values(item)[4]);
    const passWord = result.map((item) => Object.values(item)[2]);
    if (
      idList.includes(req.body.txtUserName) &&
      idList.indexOf(req.body.txtUserName) ==
        passWord.indexOf(req.body.txtPassword)
    ) {
      req.session.userId = passWord.indexOf(req.body.txtPassword) + 1;
      req.session.userName = req.body.txtUserName;
      //回前一頁的頁面
      if (req.query.backUrl) {
        res.redirect(req.query.backUrl);
      } else {
        res.redirect("/");
      }
    } else {
      res.render("login", { passWord: req.body.txtPassword });
    }
  });
});
// 回傳註冊資料
router.post("/register", function (req, res, next) {
  conn.query("SELECT * FROM  memberlist", function (err, result, fields) {
    if (err) throw err;
    const idList = result.map((item) => Object.values(item)[4]);
    if (req.body.txtUserName === "") {
      res.render("register", { passWord: "" });
    } else if (idList.includes(req.body.txtUserName)) {
      res.render("register", { passWord: "" });
    } else {
      conn.query(
        "insert into memberlist set memberAccount=?  ,memberPassword = ?, memberTel = ?   ",
        [req.body.txtDotphone, req.body.txtPassword, req.body.txtUserName]
      );
      req.session.userName = req.body.txtUserName;

      if (req.query.backUrl) {
        res.redirect(req.query.backUrl);
      } else {
        res.redirect("/");
      }
    }
  });
});

module.exports = router;
