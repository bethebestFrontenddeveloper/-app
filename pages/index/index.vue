<template>
	<view class="container">
		<!-- 轮播图 -->
		<view class="img-lunbo">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in imgpathlist">
					<image style="width: 100%;height: 150px;" :src="item"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 导航 -->
		<view class="nav">
			<view class="nav-item" v-for="(item,index) in navs" :key="index" @click="navItemClick(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hot_goods">
			<view class="title">推荐商品</view>
			<goods-list @itemclick="goodsGoInfo" :recommendGoods="recommendGoods"></goods-list>
			<view class="goods_list">
				<!--  -->
				<view class="goods_item" v-for="item in recommendGoods" :key="item.id">
					<image :src="item.img_path_one" ></image>
					<view class="price">
						<text>${{item.phone_price_new}}</text>
						<text>${{item.phone_price_old}}</text>
					</view>
					<view class="name">
						<text>{{item.phone_name}}</text>
					</view>
				</view>
			</view>
			<view class="isOver" v-if="flag">---没有了---</view>
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	import axios from 'axios'
	export default {
		data() {
			return {
				// 轮播图数据
				imgpathlist:[],
				// 导航数据
				navs:[
					{
						icon:'iconfont icon-shangdian',
						title:'小白超市',
						path:'/pages/goods/goods'
					},
					{
						icon:'iconfont icon-shuohuaspeak',
						title:'联系我们',
						path:'/pages/contact/contact'
					},
					{
						icon:'iconfont icon-tupian',
						title:'图片社区',
						path:'/pages/pics/pics'
					},
					{
						icon:'iconfont icon-shipin',
						title:'视频观赏',
						path:'/pages/videos/videos'
					}
				],
				// 推荐商品数据
				recommendGoods:[],
				flag:false
			}
		},
		created() {
			this.getimgpathlist()
			this.getRecommendGoods()
			this.getUserData()
		},
		onReachBottom(){
			this.flag  = true
		},
		components:{
			"goods-list":goodsList
		},
		methods: {
			getimgpathlist:function() {
				axios.post('http://127.0.0.1:3000/getimgpath').then((res)=>{
					res.data.forEach((item)=>{
						this.imgpathlist.push(item)
					})
				})
			},
			navItemClick:function(url){
				uni.navigateTo({
					url
				})
			},
			// 获取推荐商品数据
			getRecommendGoods:function(){
				axios.post('http://127.0.0.1:3000/recommendgoods').then((res)=>{
					this.recommendGoods = res.data
					// console.log(res.data)
				})
			},
			goodsGoInfo(id){
				uni.navigateTo({
					url:'/pages/goodsinfo/goodsinfo?id='+id
				})
			},
			getUserData(){
				axios.post('http://127.0.0.1:3000/userinfo').then((res)=>{
					window.sessionStorage.setItem('name',res.data[0].username)
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.container {
		// 
		.img-lunbo {
			box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
			background-color: rgba(0,0,0,0.6);
		}
		// 
		.nav {
			display: flex;
			.nav-item {
				width: 25%;
				text-align: center;
				view {
					width: 120rpx;
					height: 120rpx;
					background-color: #007AFF;
					border-radius: 60rpx;
					margin: 10px auto;
					color: #fff;
					font-size: 50rpx;
					line-height: 120rpx;
				}
				text {
					font-size: 30rpx;
				}
			}
		}
		// 
		.hot_goods {
			background-color: #eee;
			margin-top: 10px;
			overflow: hidden;
			.title {
				color: #FF0000;
				height: 50px;
				line-height: 50px;
				text-align: center;
				letter-spacing: 20px;
				margin: 7rpx 0;
				background-color: #fff;
			}
			.goods_list {
				padding: 0 15rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.goods_item {
					width: 355rpx;
					background: #fff;
					margin: 10rpx 0;
					padding: 15rpx;
					box-sizing: border-box;
					image {
						width: 100%;
						height: 200px;
					}
					.price {
						color: #FF0000;
						font-size: 36rpx;
						text:nth-child(2){
							color: #ccc;
							font-size: 28rpx;
							margin-left: 20rpx;
							text-decoration: line-through;
						}
					}
					.name {
						font-size: 30rpx;
						line-height: 50rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
			}
			.isOver {
				width: 100%;
				text-align: center;
				font-size: 28rpx;
				color: #C0C0C0;
				padding: 10px 0;
			}
		}
	}
</style>
