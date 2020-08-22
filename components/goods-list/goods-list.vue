<template>
	<view>
		<view class="goods_list">
			<!--  -->
			<view class="goods_item" @click="showGoods(item.phone_pro_num)" v-for="(item,index) in recommendGoods" :key="index">
				<image :src="item.img_path_one"></image>
				<view class="price">
					<text>${{item.phone_price_new}}</text>
					<text>${{item.phone_price_old}}</text>
				</view>
				<view class="name">
					<text>{{item.phone_name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['recommendGoods'],
		methods:{
			showGoods(id){
				this.$emit('itemclick',id)
			}
		}
	}
</script>

<style scoped lang="less">
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

				text:nth-child(2) {
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
</style>
