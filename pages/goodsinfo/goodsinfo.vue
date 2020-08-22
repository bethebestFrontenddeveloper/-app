<template>
	<view class="goodsinfo">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in lunbotu" :key="index">
				<image :src="item" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="part-top same">
			<text>￥{{goodsInfo.phone_price_new}}</text>
			<text>￥{{goodsInfo.phone_price_old}}</text>
			<view>品牌：{{goodsInfo.phone_name}}</view>
		</view>
		<view class="part-middle same">
			<text>货号：{{goodsInfo.phone_pro_num}}</text>
			<text>存货：{{goodsInfo.phone_number}}</text>
		</view>
		<view class="part-end same">
			<view class="tit">详细介绍</view>
			<view class="content">
				{{goodsInfo.phone_main}}
			</view>
			<view v-for="item in imgshow">
				<image :src="item" mode="widthFix"></image>
			</view>
			<view class="isOver">
				---到底了---
			</view>
		</view>
		<!-- 底部导航 -->
		<view class="goodsnav">
			<uni-goods-nav :fill="true" :options="options" @click="onclick" @buttonClick="buttonClick">
			</uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '../../components/uni-goods-nav/uni-goods-nav.vue'
	import axios from 'axios'
	export default {
		data() {
			return {
				lunbotu: [],
				goodsInfo: {},
				id: 0,
				imgshow: [],
				url: '../cart/cart',
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 0,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getGoodsInfo()
			this.getUserGoodsInfo()
		},
		components: {
			uniGoodsNav
		},
		methods: {
			getGoodsInfo() {
				axios.post('http://127.0.0.1:3000/goodsinfo', {
					id: this.id
				}).then((res) => {
					this.goodsInfo = res.data[0]
					this.lunbotu.push(res.data[0].img_path_one)
					this.lunbotu.push(res.data[0].img_path_two)
					this.lunbotu.push(res.data[0].img_path_three)
					// 
					this.imgshow.push(res.data[0].img_path_four)
					this.imgshow.push(res.data[0].img_path_five)
					this.imgshow.push(res.data[0].img_path_six)
					this.imgshow.push(res.data[0].img_path_seven)
					this.imgshow.push(res.data[0].img_path_eight)
				})
			},
			getUserGoodsInfo() {
				let name = window.sessionStorage.getItem('name')
				let list = {
					username: name,
					id: this.id
				}
				axios.post('http://127.0.0.1:3000/usergoodsinfo', list).then((res) => {
					if (res.data.length === 0) {
						this.options[2].info = 0
					} else {
						this.options[2].info = res.data[0].goodsnum
					}
				})
			},
			gotoCart(url) {
				uni.navigateTo({
					url
				})
			},
			onclick(e) {
				uni.showToast({
					title: `未开启${e.content.text}功能`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				if (e.index === 0) {
					let name = window.sessionStorage.getItem('name')
					let list = {
						username: name,
						goodslist: this.goodsInfo
					}
					axios.post('http://127.0.0.1:3000/hasgoods', list).then((res) => {
						if (res.data === 'success') {
							uni.showToast({
								title: `添加成功！`,
								icon: 'success'
							})
							this.options[2].info++
						} else {
							uni.showToast({
								title: `未知错误`,
								icon: 'none'
							})
						}
					})
				} else {
					uni.showToast({
						title: '暂未开通支付功能',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.goodsinfo {
		background-color: #eee;

		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.same {
			background-color: #fff;
			box-sizing: border-box;
			padding: 0 10px;
			margin-bottom: 5px;
		}

		.part-top {
			padding: 10px;

			text:nth-child(1) {
				color: #FF0000;
				font-size: 40rpx;
				font-weight: 600;
				padding-right: 10px;
			}

			text:nth-child(2) {
				font-size: 30rpx;
				color: #333;
				text-decoration: line-through;
			}

			view {
				margin-top: 10px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}

		.part-middle {
			text {
				color: #333;
				font-size: 32rpx;
				display: block;
				height: 60rpx;
				line-height: 60rpx;
			}
		}

		.part-end {
			padding-top: 10px;

			.tit {
				font-size: 40rpx;
				margin-bottom: 10px;
			}

			.content {
				font-size: 34rpx;
				margin-bottom: 10px;
				color: #333;
			}

			image {
				display: block;
				width: 100%;
				height: 100%;
			}

			.isOver {
				color: #333;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background-color: #fff;
				font-size: 30rpx;
				padding-bottom: 50px;
			}
		}

		.goodsnav {
			width: 100%;
			position: fixed;
			bottom: 0;
			padding: 0;
			margin: 0;
		}
	}
</style>
