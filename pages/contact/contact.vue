<template>
	<view class="container">
		<view class="top-show">
			<image src="../../static/phone/0017029575207269_b.jpg" mode=""></image>
		</view>
		<view class="information">
			<text>联系电话：400-778-9966</text>
			<text>地址：江西省赣州市信丰县嘉定镇吉顺苑</text>
		</view>
		<view class="map">
			<map :latitude="latitude" :longitude="longitude"></map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude:114.935679,
				latitude:25.37445
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="less">
.container {
	.top-show {
		image {
			width: 100%;
			height: 150px;
		}
	}
	.information {
		width: 100%;
		box-sizing: border-box;
		padding: 0 10px;
		text {
			width: 100%;
			display: block;
			margin: 15px 0;
		}
	}
	.map {
		width: 100%;
		height: 500px;
		box-sizing: border-box;
		padding: 10px;
		map {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
