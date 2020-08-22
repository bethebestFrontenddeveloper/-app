<template>
	<view class="good-list">
		<goods-list @itemclick="goodsGoInfo" :recommendGoods="goodlist"></goods-list>
		<view class="isOver" v-if="flag">
			---没有了---
		</view>
	</view>
</template>

<script>
	import GoodList from '../../components/goods-list/goods-list.vue'
	import axios from 'axios'
	export default {
		data() {
			return {
				goodlist: [],
				pagenum: 0,
				flag: false
			}
		},
		onLoad() {
			this.getGoodList()
		},
		// 监听底线
		onReachBottom() {
			if (this.goodlist.length == 16) return this.flag = true
			this.pagenum++
			this.getGoodList()
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.pagenum = 0
			this.goodlist = []
			this.flag = false
			setTimeout(()=>{
				this.getGoodList(()=>{
					uni.stopPullDownRefresh()
				})
			},1000)
		},
		components: {
			"goods-list": GoodList
		},
		methods: {
			getGoodList: function(callBack) {
				axios.post('http://127.0.0.1:3000/goodslist', {
					pagenum: this.pagenum
				}).then((res) => {
					this.goodlist = [...this.goodlist, ...res.data]
					callBack && callBack()
				})
			},
			goodsGoInfo(id){
				uni.navigateTo({
					url:'/pages/goodsinfo/goodsinfo?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.good-list {
		background-color: #eee;
		.isOver {
			width: 100%;
			text-align: center;
			font-size: 28rpx;
			color: #C0C0C0;
			padding: 10px 0;
		}
	}
</style>
