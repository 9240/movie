<template>
  <div class="movie_body">
    <Loading v-if="isLoading"/>
    <BScroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDown">{{pullDownmsg}}</li>
        <li v-for="(item,index) in comingList" :key="index">
          <div class="pic_show" @tap="handleToDetail(item.id)">
            <img :src="item.img|setWH('128.180')" />
          </div>
          <div class="info_list">
            <h2 @tap="handleToDetail(item.id)">{{item.nm}}</h2>
            <p>
              <span class="person">{{item.wish}}</span> 人想看
            </p>
            <p>主演: {{item.star}}</p>
            <p>{{item.rt}}上映</p>
          </div>
          <div class="btn_pre">预售</div>
        </li>
      </ul>
    </BScroller>
  </div>
</template>

<script>
export default {
  name: "ComingSoon",
  data() {
    return {
      comingList: [],
      pullDownmsg: "",
      isLoading:true,
      preCityId:-1
    };
  },
  activated() {
    var cityId = this.$store.state.city.id
    if(this.preCityId === cityId){
      return;
    }
    this.isLoading = true
    this.axios.get("/api/movieComingList?cityId="+cityId).then(res => {
      var msg = res.data.msg;
      if (msg == "ok") {
        this.preCityId = cityId
        this.comingList = res.data.data.comingList;
        this.isLoading = false
      }
    });
  },
  methods: {
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownmsg = "正在更新中";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios.get("/api/movieComingList?cityId=10").then(res => {
          var msg = res.data.msg;
          if (msg == "ok") {
            this.pullDownmsg = "更新成功";
            setTimeout(() => {
              this.comingList = res.data.data.comingList;
              this.pullDownmsg = "";
            }, 1000);
          }
        });
      }
    },
    handleToDetail(id) {
      console.log(id);
      this.$router.push('/movie/detail/'+id)
    },
  }
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
}
</style>