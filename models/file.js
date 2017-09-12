var fs=require("fs");

exports.getAllAlbums=function(callback){
	//fs模块的路径，参考的是相对路径 即运行时光标所在路径
	fs.readdir("./uploads",function(err,files){
		if(err){
			callback("not found uploads",null);
		}
		var allAlbums=[];
		(function iterator(i){
			if(i==files.length){
				callback(null,allAlbums);
				console.log(allAlbums);
				return ;
			}
			fs.stat("./uploads/"+files[i],function(err,stats){
				
				if(err){
					callback("not found function",null);
				}
				if(stats.isDirectory()){
					allAlbums.push(files[i]);
				}
				iterator(i+1);
			});
			
		})(0);
	});
}



//通过文件名，得到图片
exports.getAllImagesByAlbumName=function(albumName,callback){
	//fs模块的路径，参考的是相对路径 即运行时光标所在路径
	
	fs.readdir("./uploads/"+albumName,function(err,files){
		
		if(err){
			callback("not found albumName",null);
			return;
		}
		var allImages=[];
		(function iterator(i){
		
			if(i===files.length){
				
				callback(null,allImages);
				console.log(allImages);
				return ;
			}
			fs.stat("./uploads/"+albumName+"/"+files[i],function(err,stats){
				
				if(err){
					callback("not found function",null);
				}
			
					allImages.push(files[i]);
			
				iterator(i+1);
			});
			
		})(0)
	});
}