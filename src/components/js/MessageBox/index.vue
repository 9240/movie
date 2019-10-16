<template>
    <div class="messagebox">
        <h2>{{title}}</h2>
        <p>{{content}}</p>
        <div>
            <div v-if="cancel" @touchstart="handleCancel">{{cancel}}</div>
            <div v-if="ok" @touchstart="handleOk">{{ok}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'MessageBox'
}
</script>

<style scoped>
.messagebox{
    width: 200px;
    height:140px;
    border:1px solid #fff;
    border-radius: 4px;
    background-color: white;
    box-shadow: 2px 2px 2px 2px;
    position: absolute;
    left: 50%;
    top:50%;
    margin: -70px 0 0 -100px;
}
.messagebox h2{
    text-align: center;
    line-height: 40px;
    font-size: 18px;
}
.messagebox p{
    text-align: center;
    line-height: 40px;
}
.messagebox > div{
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ccc;
}
.messagebox > div div{
    flex: 1;
    text-align: center;;
    line-height: 30px;
    border-right: 1px solid #ccc;
}
.messagebox > div div:last-child{
    border: none;
}
</style>