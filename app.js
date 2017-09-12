var express=require("express");
var app=express();
var router=require("./controller");

//设置模板引擎
app.set("view engine","ejs");


//静态页面   请求静态服务
app.use(express.static("./public"));
 app.use(express.static("./uploads"));



//路由中间件
app.get("/",router.showIndex);
app.get("/up",router.showUp);
app.get("/:albumName", router.showAlbum);
app.post("/up",router.doPost);


app.listen(3000);