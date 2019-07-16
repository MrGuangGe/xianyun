// 默认数据
export const state = () => {
    return {

    }
}

// 发送同步请求
export const mutations = {

}

// 发送异步请求
export const actions = {
    // 获取城市信息
    getCityInfo(store, value) {
        return this.$axios({
            url: "/airs/city",
            method: "GET",
            params: {
                name: value
            }
        })
        .then(res=>{
            // console.log(res)
            return res.data.data
        })
        .catch(err=>{
            console.log(err)
        })
    },
    // 购买飞机票
    buyAirTicket(store,data){
       
    }
}