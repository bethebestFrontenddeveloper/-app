<template>
	<view>
		<view class="news_item" @click="navigator(item.Id)" v-for="item in newslist" :key="item.Id">
			<image :src="item.imgpath"></image>
			<view class="text">
				<view class="tit">{{item.title}}</view>
				<view class="info">
					<text>发表时间：{{item.time}}</text>
					<text>浏览：{{item.looks}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['newslist'],
		methods:{
			navigator(id){
				this.$emit('itemclick',id)
			}
		}
	}
</script>

<style scoped lang="less">
	.news_item {
		width: 100%;
		height: 100px;
		box-sizing: border-box;
		padding: 10px;
		display: flex;
		border-bottom: 1px solid #007AFF;
		image {
			width: 30%;
			height: 80px;
		}
		.text {
			width: 70%;
			box-sizing: border-box;
			padding: 0 10px;
			.tit {
				font-size: 32rpx;
				height: 40px;
				margin-top: 5px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.info {
				font-size: 25rpx;
				height: 40px;
				line-height: 40px;
				color: #333;
				text {
					padding-right: 10px;
				}
			}
		}
	}
</style>