<template>
    <div>
        <div>个人中心:</div>
        <div>当前用户：{{$store.state.user.name}} <a href="javascript:void(0);" @click="handleToLogout">推出</a></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "center",
    methods:{
        handleToLogout(){
            this.axios.get('/api2/users/logout').then(res=>{
                console.log(res)
                var status = res.data.status;
                if(status === 0){
                    this.$store.commit('USER_NAME',{name:""})
                    this.$router.push('/mine/login')
                }
            })
        }
    },
    beforeRouteEnter(to,from,next){
        axios.get('/api2/users/getUser').then(res=>{
            var status = res.data.status;
            if(status === 0){
                next(vm=>{
                    vm.$store.commit('USER_NAME',{name:res.data.data.username})
                })
            }else{
                next('/mine/login')
            }
        })
    }
}
</script>

<style lang="stylus">

</style>