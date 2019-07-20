// 默认数据
export const state = () => {
    return {
        // 机票信息
        ticketData: {
            seat_infos: {}
        },
        // 计算总价
        totalPrice: 9999
    }
}

// 发送同步请求
export const mutations = {
    setTicketData(state, data) {
        state.ticketData = data
    },
    setTotalPrice(state, data) {
        state.totalPrice = data
    }
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
            .then(res => {
                // console.log(res)
                return res.data.data
            })
            .catch(err => {
                console.log(err)
            })
    }
}