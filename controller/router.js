//首页
var file=require("../models/file.js");

var formidable=require("formidable");
var path=require("path");

var fs=require("fs");


exports.showIndex=function(req,res,next){
	//res.send("Index page");
	//渲染首页相册
	// res.render("index",{
	// 	"albums":file.getAllAlbums()
	// 	//不能获得length?
	// 	//node.js编程思维  异步的，需要修改
	// });
	

	file.getAllAlbums(function(err,allAlbums){
		if(err){
			next();
			return;
		}
		res.render("index",{
			"albums": allAlbums
		})

	});
}





//相册页

exports.showAlbum=function(req,res,next){
	//res.send("showAlbum");
	//拿到用户想请求的相册
	console.log(req.url);
	console.log("showAlbum");
	var xiangce=req.params.albumName;
	//遍历相册中所有的图片，具体业务交给model
	file.getAllImagesByAlbumName(xiangce,function(err,allImages){
		if (err) {
			next();//交给下面的中间件
			return;
		}
		console.log(allImages);
		res.render("albums",{
			"albumname":xiangce,
			"images":allImages
		});
	});
	
	
}

//显示上传
exports.showUp=function(req,res,next){
	//res.render("up");
	//res.end("data-toggle");
	//
	//命令File模块调用函数
	
	file.getAllAlbums(function(err,allAlbums){
		res.render("up",{
			"albums":allAlbums
		});
	})
}

//上传表单
exports.doPost=function(req,res){
	//res.render("up");
	//res.end("data-toggle");
	//
	//命令File模块调用函数
	var form=new formidable.IncomingForm();

	form.uploadDir=__dirname+"/../test/";
	form.parse(req,function(err,fields,files,next){
		if(err){
			next();
			return;
		}
		
		console.log(fields);
		console.log(files.pic.name);
		var oldpath=files.pic.path;
		var newpath=path.normalize(__dirname+"/../uploads/"+fields.wenjianjia+"/"+files.pic.name);

		console.log(oldpath);
		console.log(newpath);
		fs.rename(oldpath,newpath,function(err){

			console.log(err);
			if(err){
				console.log("yes something wrong!");
				res.end("failed");
				return;

			}
			res.end("success");
		});



	});


	
}
