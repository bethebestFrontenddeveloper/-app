<template>
	<view class="cart">
		<view class="cart-container">
			<checkbox-group @change="changeitem(item)" class="cart-item" v-for="item in cartlist" :key="item.Id">
				
				<checkbox class="box" :value="item.goodsprice" :checked="item.flag" />
				<image :src="item.goodsimg" ></image>
				<view class="right">
					<view class="tit" @click="gotoGoodsInfo(item.goodsID)">{{item.goodsname}}</view>
					<view class="right-bottom">
						<view class="goodsprice">￥{{item.goodsprice}}</view>
						<view class="btn">
							<view class="reduce" @click="reduceNum(item)">-</view>
							<view class="number">{{item.goodsnum}}</view>
							<view class="add" @click="addNum(item)">+</view>
						</view>
					</view>
				</view>
			</checkbox-group>
			<!--  -->
		</view>
		<view class="nodata" v-if="active">
			暂无数据
		</view>
		<!--  -->
		<view class="Settlement">
			<checkbox-group class="allBtn" @change="allChecked()">
				<checkbox :checked="ischecked" />全选 
			</checkbox-group>
			<view class="Settlement-btn">
				<view>总价格:<text>¥{{nums}}</text></view>
				<button type="primary">结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				name: '',
				cartlist:[],
				active:false,
				nums:0,
				ischecked:false
			}
		},
		onLoad() {
			this.name = window.sessionStorage.getItem('name')
			this.getUserCart()
		},
		methods: {
			getUserCart() {
				axios.post('http://127.0.0.1:3000/usercart', {
					name: this.name
				}).then((res) => {
					this.cartlist = res.data
					this.cartlist.map((item)=>{
						item.flag = false
					})
					if(this.cartlist.length === 0){
						this.active = true
					}
				})
			},
			changeitem(item){
				item.flag = !eval(item.flag)
				if(item.flag){
					this.nums+=Number(item.goodsprice)*Number(item.goodsnum)
					this.isallchecked()
				}else {
					this.nums-=Number(item.goodsprice)*Number(item.goodsnum)
					this.isallchecked()
				}
			},
			reduceNum(item) {
				if(item.goodsnum===1) {
					console.log('no')
				}else {
					item.goodsnum--
					if(eval(item.flag)===true){
						this.nums-=Number(item.goodsprice)
					}
					this.updateCart(item)
				}
			},
			addNum(item){
				item.goodsnum++
				if(eval(item.flag)===true){
					this.nums+=Number(item.goodsprice)
				}
				this.updateCart(item)
			},
			allChecked() {
				this.ischecked = !this.ischecked
				if(this.ischecked){
					this.cartlist.map((item)=>{
						this.changeitem(item)
					})
				}else {
					this.cartlist.map((item)=>{
						this.changeitem(item)
					})
				}
			},
			isallchecked() {
				let list = []
				this.cartlist.forEach((item)=>{
					if(item.flag === true){
						list.push(true)
					}
				})
				if(list.length === this.cartlist.length){
					this.ischecked = true
				}else {
					this.ischecked = false
				}
			},
			// 更新购物车信息
			updateCart(item){
				let list = {
					username:item.username,
					goodsID:item.goodsID,
					goodsnum:item.goodsnum
				}
				axios.post('http://127.0.0.1:3000/updatecart',list).then((res)=>{
					// 
				})
			},
			// 跳转到商品详情页
			gotoGoodsInfo(id){
				uni.navigateTo({
					url:'/pages/goodsinfo/goodsinfo?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="less">
	page {
		width: 100%;
		height: 100%;
	}
	
	.cart {
		width: 100%;
		height: 100%;
		background-color: #ccc;
		overflow: hidden;
		.cart-container{
			box-sizing: border-box;
			padding: 0 10px;
		}
		// background-color: pink;
		.cart-item {
			background: #fff;
			display: flex;
			align-items: center;
			margin-top: 10px;
			border-radius: 10px;
			.box {
				margin-left: 10px;
			}
			.right {
				width: 100%;
				margin-right: 10px;
				height: 80px;
				.tit {
					height: 40px;
					font-size: 32rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				.right-bottom {
					display: flex;
					justify-content: space-between;
					height: 40px;
					align-items: center;
					.goodsprice {
						color: #FF0000;
					}
					.btn{
						height: 30px;
						border-radius: 10px;
						border: 1px solid #ccc;
						view {
							display: inline-block;
							height: 30px;
							line-height: 30px;
						}
						.reduce {
							width: 30px;
							border-right: 1px solid #ccc;
							text-align: center;
						}
						.number{
							width: 40px;
							text-align: center;
						}
						.add {
							width: 30px;
							border-left: 1px solid #ccc;
							text-align: center;
						}
					}
				}
			}
		}
		.Settlement {
			box-sizing: border-box;
			padding: 0 10px;
			background: #fff;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			position: fixed;
			bottom: 50px;
			width: 100%;
			height: 50px;
			line-height: 50px;
			.Settlement-btn {
				display: flex;
				align-items: center;
				font-size: 32rpx;
				button {
					display: inline-block;
					width: 100px;
					height: 40px;
					line-height: 40px;
					border-radius: 20px;
				}
				view {
					display: inline-block;
					margin-right: 10px;
					text {
						color: #FF0000;
					}
				}
			}
		}
		.nodata {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			color: #333;
		}

		image {
			width: 120px;
			height: 100px;
		}
	}
</style>
