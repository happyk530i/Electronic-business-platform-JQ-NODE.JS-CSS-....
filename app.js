var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mysql = require("mysql");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var session = require("express-session");
const nodemailer = require('nodemailer');
const { response } = require("express");

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//連接資料庫
var conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "mfee08",
});
// 取得行程資料
app.get("/trip/tripList", function (request, response) {
  conn.query("select * from tripList", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    // console.log(JSON.stringify(rows));
    response.send(JSON.stringify(rows));
  });
});
app.get("/trip11", function (request, response) {
  res.render("lo.html", {
    dd: 123,
  });
});
// 取得行程-地區(北部)資料
app.get("/trip/tripList/areaNorth", function (request, response) {
  conn.query("SELECT * FROM `triplist` WHERE `tripState` = '北部'", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    // console.log(JSON.stringify(rows));
    response.send(JSON.stringify(rows));
  });
});

// 取得行程-地區(中部)資料
app.get("/trip/tripList/areaMidst", function (request, response) {
  conn.query("SELECT * FROM `triplist` WHERE `tripState` = '中部'", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    response.send(JSON.stringify(rows));
  });
});

// 取得行程-地區(南部)資料
app.get("/trip/tripList/areaSouth", function (request, response) {
  conn.query("SELECT * FROM `triplist` WHERE `tripState` = '南部'", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    response.send(JSON.stringify(rows));
  });
});

// 取得行程-地區(花東)資料
app.get("/trip/tripList/areaEast", function (request, response) {
  conn.query("SELECT * FROM `triplist` WHERE `tripState` = '東部'", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    response.send(JSON.stringify(rows));
  });
});

// 取得行程-地區(外離島)資料
app.get("/trip/tripList/areaIslandsArea", function (request, response) {
  conn.query("SELECT * FROM `triplist` WHERE `tripState` = '外離島'", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    response.send(JSON.stringify(rows));
  });
});

// 取得導遊-地區(北部)資料
app.get("/trip/tripList/areaNorthGuide", function (request, response) {
  conn.query("SELECT * FROM `memberlist` WHERE `guideSide` = '北部'", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    response.send(JSON.stringify(rows));
  });
});

// 取得導遊-地區(中部)資料
app.get("/trip/tripList/areaMidstGuide", function (request, response) {
  conn.query("SELECT * FROM `memberlist` WHERE `guideSide` = '中部'", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    response.send(JSON.stringify(rows));
  });
});

// 取得導遊-地區(南部)資料
app.get("/trip/tripList/areaSouthGuide", function (request, response) {
  conn.query("SELECT * FROM `memberlist` WHERE `guideSide` = '南部'", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    response.send(JSON.stringify(rows));
  });
});

// 取得導遊-地區(東部)資料
app.get("/trip/tripList/areaEastGuide", function (request, response) {
  conn.query("SELECT * FROM `memberlist` WHERE `guideSide` = '東部'", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    response.send(JSON.stringify(rows));
  });
});

// 取得導遊-地區(外離島)資料
app.get("/trip/tripList/areaIslandsAreaGuide", function (request, response) {
  conn.query("SELECT * FROM `memberlist` WHERE `guideSide` = '外離島'", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    response.send(JSON.stringify(rows));
  });
});

// 取得會員資料
app.get("/guide/memberList", function (request, response) {
  conn.query("SELECT * FROM memberlist", "", function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    // console.log(JSON.stringify(rows));
    response.send(JSON.stringify(rows));
  });
});
//取得購物車資料
app.get("/guide/shopcart", function (request, response) {
  conn.query(
    "SELECT `tripNeed`,`orderLan`,`preOrder`, `tripPic1`,`preTripName`,`preTripDate`,`preTripTime`,`tripPeo`,`preTripPrice`,c.`memberId`  FROM `cartlist` c JOIN `triplist` t on c.`tripId` = t.`tripId` ",
    "",
    function (err, rows) {
      if (err) {
        console.log(JSON.stringify(err));
        return;
      }
      // console.log(JSON.stringify(rows));
      response.send(JSON.stringify(rows));
    }
  );
});
app.delete("/guide/shopcart", function (request, response) {
  console.log(request.body.preOrder);
  conn.query(
    `delete from cartlist where preOrder = ${request.body.preOrder}`,
    []
  );
  response.send("row deleted.");
});

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "recommand 128 bytes random string",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 30 * 1000 },
  })
);
// app.use(
//   session({
//     secret: "gyug7g6fhv",
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60, // default session expiration is set to 1 hour
//     },
//   })
// );

// 身分大綱
app.use(function (req, res, next) {
  if (typeof req.session.userName === "undefined") {
    req.session.userName = "Guest";
  }
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.locals.layout = false;

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h6>客戶來信</h6>
    <ul>  
      <li>客戶姓名: ${req.body.name}</li>
      <li>協力導遊: ${req.body.company}</li>
      <li>客戶信箱: ${req.body.email}</li>
      <li>客戶電話: ${req.body.phone}</li>
    </ul>
    <h3>留言內容</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: 'terry71210@gmail.com',
      clientId: '668709106506-f68r9knc27petqdhs1dlvfq2m1btiopl.apps.googleusercontent.com',
      clientSecret: 'EdWQsZzOOj3R5xY4v7E8fZT9',
      refreshToken: '1//046N3b3GJgwFdCgYIARAAGAQSNwF-L9IrU1eQRCDEG8UCMRgyk0fgEqYT-MY_ta1NXFokr-hmfQ6twJqfZS6F1VB7yYTiALxtr9Q',
  }
});



// setup email data with unicode symbols
let mailOptions = {
    from: '"來自" <terry71210@email.com>', // sender address
    to: 'happyk530i@yahoo.com.tw', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.redirect("/")
    // res.render('/', {msg:'感謝您的意見回饋!! 信件已經送出'});
});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
