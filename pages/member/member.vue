<template>
	<view class="member">
		<image class="bigheadimg" :src="userdata.head_img_path" mode="widthFix"></image>
		<uni-list>
			<uni-list-item>
				<view class="list-item" @click="chooseImg">
					<view class="tit">头像</view>
					<view><image :src="userdata.head_img_path" mode=""></image></view>
				</view>
			</uni-list-item>
			<uni-list-item>
				<view class="item-text">
					<text>昵称</text>
					<text>{{userdata.username}}</text>
				</view>
			</uni-list-item>
			<uni-list-item>
				<view class="item-text">
					<text>会员中心</text>
					<text></text>
				</view>
			</uni-list-item>
			<uni-list-item>
				<view class="item-text">
					<text>拍一拍</text>
					<text></text>
				</view>
			</uni-list-item>
			<uni-list-item>
				<view class="item-text">
					<text>我的订单</text>
					<text></text>
				</view>
			</uni-list-item>
			<uni-list-item>
				<view class="item-text">
					<text>我的地址</text>
					<text></text>
				</view>
			</uni-list-item>
			<uni-list-item>
				<view class="item-text">
					<text>更多</text>
					<text></text>
				</view>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				userdata:{},
			}
		},
		onLoad() {
			this.getUserData()
		},
		methods: {
			getUserData(){
				axios.post('http://127.0.0.1:3000/userinfo').then((res)=>{
					this.userdata = res.data[0]
					window.sessionStorage.setItem('name',this.userdata.username)
				})
			},
			// 上传头像
			chooseImg(){
				uni.chooseImage({
					count:1,
					success:res=> {
						let file = res.tempFiles[0]
						let fordate = new FormData()
						let username = window.sessionStorage.getItem('name')
						// fordate.append('file',file)
						fordate.append('file',file)
						fordate.append('username',username)
						axios.post('http://127.0.0.1:3000/userheadimage',fordate).then((res)=>{
							this.getUserData()
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
.member {
	.bigheadimg {
		width: 100%;
	}
	.uni-list-item{
		border-bottom: 1px solid #ccc!important;
	}
	.list-item {
		display: flex!important;
		justify-content: space-between!important;
		.tit {
			height: 50px;
			line-height: 50px;
		}
		image {
			width: 50px;
			height: 50px;
		}
	}
	.item-text {
		display: flex;
		justify-content: space-between;
	}
}
</style>
