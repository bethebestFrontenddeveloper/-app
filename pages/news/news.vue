<template>
	<view class="news">
		<news-list @itemclick="goDetail" :newslist="newslist"></news-list>
		<view class="news_item">
			<image src="../../serve/static/images/lunbotu/0209425a0f8792b53f.jpg" mode=""></image>
			<view class="text">
				<view class="tit">
					有些人总是抵抗不住外界的诱惑！
					有些人总是抵抗不住外界的诱惑！
					有些人总是抵抗不住外界的诱惑！
				</view>
				<view class="info">
					<text>发表时间：2015-8-3</text>
					<text>浏览：662</text>
				</view>
			</view>
		</view>
		<view class="isOver" v-if="nodata">
			---没有更多了---
		</view>
	</view>
</template>

<script>
	import NewsList from '../../components/news-list/news-list.vue'
	import axios from 'axios'
	export default {
		data() {
			return {
				// 资讯数据
				newslist:[],
				nodata:false
			}
		},
		onLoad() {
			this.getNewsList()
		},
		components:{
			NewsList:'news-list'
		},
		onReachBottom() {
			this.nodata = true
		},
		methods: {
			// 获取资讯数据的方法
			getNewsList:function(){
				axios.post('http://127.0.0.1:3000/newslist').then((res)=>{
					this.newslist = res.data
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url:'/pages/news-detail/news-detail?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="less">
.news {
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
	.isOver{
		font-size: 30rpx;
		color: #C0C0C0;
		text-align: center;
		height: 30px;
		line-height: 30px;
	}
}
</style>
