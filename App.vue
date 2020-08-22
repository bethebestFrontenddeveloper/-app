<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
	
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
@font-face {font-family: "iconfont";
  src: url('~@/static/font/iconfont.eot?t=1597550932364'); /* IE9 */
  src: url('~@/static/font/iconfont.eot?t=1597550932364#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('~@/static/font/iconfont.woff?t=1597550932364') format('woff'),
  url('~@/static/font/iconfont.ttf?t=1597550932364') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('~@/static/font/iconfont.svg?t=1597550932364#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-01:before {
  content: "\e60e";
}

.icon-shipin:before {
  content: "\e615";
}

.icon-tupian:before {
  content: "\e6de";
}

.icon-shangdian:before {
  content: "\e603";
}

.icon-icon-test1:before {
  content: "\e63f";
}

.icon-huiyuanchuda:before {
  content: "\e600";
}

.icon-mendian:before {
  content: "\e601";
}

.icon-video2:before {
  content: "\e67f";
}

.icon-picture:before {
  content: "\e680";
}

.icon-arrow-left-bold:before {
  content: "\e685";
}

.icon-suo:before {
  content: "\e657";
}

.icon-yonghu:before {
  content: "\e607";
}

.icon-caidan:before {
  content: "\e660";
}

.icon-gerentouxiang_o:before {
  content: "\ebac";
}

.icon-weixin1:before {
  content: "\e65f";
}

.icon-qq:before {
  content: "\e613";
}

.icon-dianhua:before {
  content: "\e66f";
}

.icon-shuohuaspeak:before {
  content: "\e64d";
}

.icon-bi:before {
  content: "\e617";
}

.icon-biaoqian:before {
  content: "\e620";
}

.icon-shijian:before {
  content: "\e61f";
}

.icon-yanjing:before {
  content: "\e912";
}

.icon-cha:before {
  content: "\e628";
}

.icon-icon-test:before {
  content: "\e643";
}

.icon-sousuo:before {
  content: "\e650";
}

.icon-weibo:before {
  content: "\e635";
}

.icon-icon:before {
  content: "\e636";
}

.icon-weibo1:before {
  content: "\e666";
}

.icon-QQ:before {
  content: "\e667";
}

.icon-jiantouarrow494:before {
  content: "\e6b2";
}

.icon-dizhi:before {
  content: "\e609";
}

.icon-jiantou-copy-copy:before {
  content: "\e668";
}

.icon-tuya_huabanfuben:before {
  content: "\e75d";
}

.icon-jiantou:before {
  content: "\e63e";
}

.icon-danseshixintubiao-:before {
  content: "\e62e";
}

.icon-gouwuche:before {
  content: "\e634";
}

.icon-weixin:before {
  content: "\e630";
}
</style>
