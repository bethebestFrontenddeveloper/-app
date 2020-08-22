<template>
	<view class="videos">
		<view class="video-item" v-for="(item,index) in videolist" :key="item.Id">
			<video @play="doplay(index)" :id="String(index)" enable-play-gesture :src="item.src" controls :title="item.title"></video>
			<view class="tit">
				{{item.title}}
			</view>
			<view class="info">
				<text>发布时间：{{item.time}}</text>
				<text>观看：{{item.looks}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				videolist:[],
				videoid:''
			}
		},
		onLoad() {
			this.getVideosList()
			// let video = uni.createVideoContext()
		},
		methods: {
			getVideosList(){
				axios.post('http://127.0.0.1:3000/videos').then((res)=>{
					this.videolist = res.data
				})
			},
			doplay(index){
				let newvideo = uni.createVideoContext(`${index}`)
				if(this.videoid !== newvideo.id && this.videoid !== ''){
					let pause = uni.createVideoContext(`${this.videoid}`)
					pause.pause()
					newvideo.play()
					this.videoid = newvideo.id
				}else {
					newvideo.play()
					this.videoid = newvideo.id
				}
				// console.log(this.videoid)
			}
		}
	}
</script>

<style scoped lang="less">
.videos {
	box-sizing: border-box;
	padding: 0 10px;
	.video-item {
		margin-top: 10px;
		box-shadow: 0 1px 2px 1px rgba(0,0,0,0.2);
		video {
			width: 100%;
			color: #fff;
		}
		.tit {
			margin-bottom: 5px;
			margin-left: 5px;
		}
		.info {
			color: #C0C0C0;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding-bottom: 5px;
			padding-left: 5px;
			padding-right: 5px;
		}
	}
}
</style>
