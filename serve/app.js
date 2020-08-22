const express = require('express')

const cors = require('cors')

const mysql = require('mysql')

// const multiparty = require('multiparty')

const bodyParser = require('body-parser')
const app = new express()

// 
//获取时间
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	return currentdate.toString();
}
// var datatime = 'static/images/lunbotu/' + getNowFormatDate();
var datatime = 'static/images/lunbotu/';
//将图片放到服务器
const multer = require('multer')
var storage = multer.diskStorage({
	// 如果你提供的 destination 是一个函数，你需要负责创建文件夹
	destination: datatime,
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});


var upload = multer({
	storage: storage
});

app.use('/static',express.static('static'));

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))


const ccon = {
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	port: '3306',
	database: 'mydata'
}

var connection = mysql.createConnection(ccon)
recon()

function recon() {
	connection = mysql.createConnection(ccon)
	connection.on('error', handleError)
}

// 接口

// 接收文件
app.post(
	'/test',
	upload.single('path'),
	(req, res) => {
		console.log(req.body.picTitle) //console.log(req.query.picTitle);//get
		console.log(req.body.picType)
		console.log(req.file) //req.file文件的具体信息
		let path = req.file.destination+req.file.originalname
		let name = req.file.originalname
		let sql = `insert into lunbo (name,path) values ('${name}','${path}')`
		connection.query(sql,(err,result)=>{
			if(err) console.log(err)
			res.send('success')
		})
	}
)

// 图片路径数据
app.post('/getimgpath',(req,res)=>{
	let sql = 'select * from lunbo'
	connection.query(sql,(err,result)=>{
		let list=[]
		result.forEach((item)=>{
			let path = 'http://127.0.0.1:3000/'+item.path
			list.push(path)
		})
		res.send(list)
	})
})


// 推荐商品数据
app.post('/recommendgoods',(req,res)=>{
	let sql = 'select * from phone_data'
	connection.query(sql,(err,result)=>{
		res.send(result)
	})
})

// 商品列表
app.post('/goodslist',(req,res)=>{
	let sql = 'select * from phone_data'
	connection.query(sql,(err,result)=>{
		let test = [...result,...result]
		let list = []
		let i=req.body.pagenum
		list.push(test)
		list.push(result)
		list.push(result)
		res.send(list[i])
	})
})

// 图片社区
const kindofpics = [
	{id:1,sql:'select * from home_life'},
	{id:2,sql:'select * from show_car'},
	{id:3,sql:'select * from cute_anima'},
	{id:4,sql:'select * from cool_dm'},
	{id:5,sql:'select * from food_des'},
	{id:6,sql:'select * from star_pic'},
	{id:7,sql:'select * from fresh_pic'},
	{id:8,sql:'select * from fresh_buity'},
	{id:9,sql:'select * from design_part'},
	{id:10,sql:'select * from photo_pic'},
	{id:11,sql:'select * from plant_pic'}
]
app.post('/kindpics',(req,res)=>{
	kindofpics.forEach((item)=>{
		if(item.id === req.body.id){
			connection.query(item.sql,(err,result)=>{
				res.send(result)
			})
		}
	})
})

// 新闻资讯的数据
app.post('/newslist',(req,res)=>{
	let sql= 'select * from news_list'
	connection.query(sql,(err,result)=>{
		res.send(result)
	})
})

// 资讯的详细信息
app.post('/newsdetail',(req,res)=>{
	let sql = `select * from news_list where id='${req.body.id}'`
	connection.query(sql,(err,result)=>{
		res.send(result)
	})
})

// 商品详情
app.post('/goodsinfo',(req,res)=>{
	let sql = `select * from phone_data where phone_pro_num='${req.body.id}'`
	connection.query(sql,(err,result)=>{
		res.send(result)
	})
})

// 视频数据接口
app.post('/videos',(req,res)=>{
	let sql = `select * from video_look`
	connection.query(sql,(err,result)=>{
		res.send(result)
	})
})

// 获取用户信息
app.post('/userinfo',(req,res)=>{
	let sql = 'select * from user_info'
	connection.query(sql,(err,result)=>{
		res.send(result)
	})
})

// 获取用户购物车信息
app.post('/usercart',(req,res)=>{
	let sql = `select * from user_cart where username='${req.body.name}'`
	connection.query(sql,(err,result)=>{
		res.send(result)
	})
})

//更新用户购物车信息
app.post('/updatecart',(req,res)=>{
	let sql = `update user_cart set goodsnum='${req.body.goodsnum}' where username='${req.body.username}' and goodsID='${req.body.goodsID}'`
	connection.query(sql,(err,result)=>{
		if(err) console.log(err)
		res.send('ok')
	})
})

// 检测商品是否已存在于购物车
app.post('/hasgoods',(req,res)=>{
	let sql = `select * from user_cart where username='${req.body.username}' and goodsID='${req.body.goodslist.phone_pro_num}'`
	connection.query(sql,(err,result)=>{
		if(result.length === 0){
			// 无此商品数据 直接添加
			let sql = `insert into user_cart (username,goodsname,goodsprice,goodsnum,goodsimg,goodsID,flag) 
			values ('${req.body.username}','${req.body.goodslist.phone_name}','${req.body.goodslist.phone_price_new}',
			1,'${req.body.goodslist.img_path_one}','${req.body.goodslist.phone_pro_num}','false')`
			connection.query(sql,(err,result)=>{
				if(err) console.log(err)
				res.send('success')
			})
		}else{
			// 已有该商品 goodsnum加一
			let num = result[0].goodsnum +1
				name = result[0].username
				ID = result[0].goodsID
			let sql = `update user_cart set goodsnum='${num}' where username='${name}' and goodsID='${ID}'`
			connection.query(sql,(err,result)=>{
				res.send('success')
			})
		}
	})
})

// 商品详情页面用户购物车数据
app.post('/usergoodsinfo',(req,res)=>{
	// let sql = `select phone_pro_num from phone_data where phone_pro_num='${req.body.id}'`
	// connection.query(sql,(err,result)=>{
		let goodsID = req.body.id
		let sqll = `select * from user_cart where username='${req.body.username}' and goodsID='${goodsID}'`
		connection.query(sqll,(err,result)=>{
			res.send(result)
		})
	// })
})

// 用户头像上传

var userheadstorage = multer.diskStorage({
	// 如果你提供的 destination 是一个函数，你需要负责创建文件夹
	destination: 'static/images/userhead',
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});
var userheadupload = multer({
	storage: userheadstorage
});
app.post('/userheadimage',userheadupload.single('file'),(req,res)=>{
	let path = 'http://127.0.0.1:3000/'+req.file.destination+'/'+req.file.originalname
	let sql = `update user_info set head_img_path='${path}' where username='${req.body.username}'`
	connection.query(sql,(err,result)=>{
		res.send('success')
	})
	console.log(path)
	console.log(req.body.username)
})

function handleError(err) {
	if (err) {
		// 如果是连接断开，自动重新连接
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			recon()
		} else {
			console.error(err.stack || err);
		}
	}
}

app.listen('3000', () => {
	console.log('127.0.0.1:3000 is running...')
})
