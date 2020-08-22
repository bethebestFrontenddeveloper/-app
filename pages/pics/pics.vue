<template>
	<view class="pics">
		<scroll-view scroll-y="true" class="left">
			<view 
			@click="leftClickHandle(index,item.id)"
			:class="active===index?'active':''" 
			v-for="(item,index) in kindPics" 
			:key="item.id">
			{{item.title}}
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="right">
			<view class="item" v-for="item  in picslist" :key="item.id">
				<image @click="previewImg(item.path)" :src="item.path" mode=""></image>
				<text>{{item.name}}</text>
			</view>
			<view class="isOver" v-if="nodate">
				暂无图片
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				kindPics:[
					{id:1,title:'家居生活'},
					{id:2,title:'show车'},
					{id:3,title:'可爱萌宠'},
					{id:4,title:'炫酷动漫'},
					{id:5,title:'美食诱惑'},
					{id:6,title:'明星写真'},
					{id:7,title:'清新壁纸'},
					{id:8,title:'清新美女'},
					{id:9,title:'设计素材'},
					{id:10,title:'摄影天地'},
					{id:11,title:'植物世界'}
				],
				active:0,
				nodate:false,
				picslist:[],
				firstItem:1
			}
		},
		onLoad() {
			this.getpicslist(this.firstItem)
		},
		methods: {
			leftClickHandle:function(index,goid){
				this.active = index
				this.getpicslist(goid)
			},
			getpicslist:function(goid){
				axios.post('http://127.0.0.1:3000/kindpics',{
					id:goid
				}).then((res)=>{
					if(res.data.length === 0) {
						this.picslist = []
						this.nodate = true
					}else{
						this.nodate = false
						this.picslist = res.data
					}
				})
			},
			previewImg:function(current){
				const urls = this.picslist.map((item)=>{
					return item.path
				})
				// 预览图片
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="less" scoped>
page {
	height: 100%;
}
.pics {
	height: 100%;
	display: flex;
	.left {
		width: 25%;
		height: 100%;
		border-right: 1px solid #eee;
		// background-color: pink;
		view {
			height: 60px;
			line-height: 60px;
			text-align: center;
			color: #333;
			font-size: 30rpx;
			border-top: 1px solid #eee;
		}
		.active {
			background-color: #007AFF;
			color: #fff;
		}
	}
	.right {
		width: 75%;
		height: 100%;
		box-sizing: border-box;
		padding: 5px;
		.item {
			image {
				width: 100%;
				height: 500rpx;
				border-radius: 5px;
			}
			text {
				font-size: 30rpx;
				line-height: 60rpx;
			}
		}
		.isOver {
			color: #FF0000;
			font-size: 30rpx;
		}
	}
}
</style>
