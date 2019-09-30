<template>
    <div id="detailContainer">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
		<Loading v-if="isLoading" />
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg" :style="{'background-image':'url('+movieDetail.img.replace(/w\.h/,'140.208')+')'}"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="movieDetail.img|setWH('128.180')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{movieDetail.nm}}</h2>
						<p>{{movieDetail.enm}}</p>
						<p>{{movieDetail.sc}}</p>
						<p>{{movieDetail.cat}}</p>
						<p>{{movieDetail.src}} / {{movieDetail.dur}}分钟</p>
						<p>{{movieDetail.pubDesc}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{movieDetail.dra}}</p>
			</div>
			<div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li v-for="(item,index) in movieDetail.photos" :key="index" class="swiper-slide">
						<div>
							<img :src="item | setWH('70.127')" alt="">
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
    
<script>
import Header from "@/components/Header"
export default {
    name:'Detail',
    components:{
        Header
    },
    data(){
        return{
			movieDetail:{},
			isLoading:true
        }
    },
    created(){
        this.axios.get('/api/detailmovie?movieId='+this.$route.params.movieid).then(res=>{
            console.log(res)
            var msg = res.data.msg;
            if(msg === "ok"){
				this.isLoading = false
				this.movieDetail = res.data.data.detailMovie
				this.$nextTick(()=>{
					new Swiper(this.$refs.detail_player,{
						slidersPerView:'auto',
						freeMode:true,
						freeModeSticky:true
					})
				})
            }
        })
    },
    methods:{
        handleToBack(){
            this.$router.back()
        }
    }
}
</script>

<style scoped>
#detailContainer{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    min-width: 100%;
    background-color: white;
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>