<template>
	<view class="news_detail">
		<text class="tit">{{newsdetailinfo.title}}</text>
		<view class="info">
			<text>发表时间：{{newsdetailinfo.time}}</text>
			<text>浏览：{{newsdetailinfo.looks}}</text>
		</view>
		<image :src="newsdetailinfo.imgpath" mode=""></image>
		<view class="content">
			{{newsdetailinfo.newstext}}
		</view>
	</view>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				id:0,
				// 资讯详情
				newsdetailinfo:{}
			}
		},
		methods: {
			getNewsDetailList(){
				axios.post('http://127.0.0.1:3000/newsdetail',{
					id:this.id
				}).then((res)=>{
					this.newsdetailinfo = res.data[0]
				})
			}
		},
		// 获取id
		onLoad(options) {
			this.id = options.id
			this.getNewsDetailList()
		}
	}
</script>

<style scoped lang="less">
.news_detail {
	font-size: 30rpx;
	padding: 0 20rpx;
	.tit {
		text-align: center;
		width: 100%;
		display: block;
		margin: 20rpx 0;
		font-size: 32rpx;
	}
	image {
		width: 100%;
		height: 250px;
		margin: 20rpx 0;
	}
	.info {
		display: flex;
		justify-content: space-between;
	}
}
</style>
