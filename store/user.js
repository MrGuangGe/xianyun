// 用户模块仓库管理数据
// 仓库里面的state mutations actions都要暴露出去

// 仓库中管理的数据
export const state = () => {
    return {
        userInfo: {
            token: "",
            user: {}
        },
    }
}

// 同步修改仓库中的数据
export const mutations = {
    // 登录的操作，重置用户信息
    // 第一个参数为固定的仓库中的数据state 第二个参数为传进来的参数
    resetUserInfo(state, data) {
        state.userInfo = data
    },
    // 退出的操作，清空用户信息
    clearUserInfo(state) {
        state.userInfo = {}
    },
}

// 异步修改仓库中的数据
export const actions = {
    // 第一个参数固定为store对象，第二个参数为传进来的参数
    // 在store模块中也可以通过this访问$axios，与组件没有关系
    // 登录
    login(store, data) {
        // return这个请求 会返回一个promise
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            // data:data
            data
        })
            .then(res => {
                // console.log(store)
                // console.log(res)

                // 调用重置用户数据的方法 把仓库中的数据替换为返回数据
                store.commit("resetUserInfo", res.data)

                // 登录成功后需要跳转到首页
                // this.$router.push("/")
                // 不能像上面那样写死 因为每个页面登录成功后的操作都是不一样的
                // 解决方法: 把这个请求return回去 然后会返回一个promise 这样就可以具体在某个页面进行成功后的操作了
            })
            .catch(err => {
                console.log(err)
            })
    },
    // 发送验证码
    sendCaptcha(store, phone) {
        return this.$axios({
            url: "/captchas",
            method: "POST",
            data: {
                tel: phone
            }
        })
            .then(res => {
                // console.log(res)
                return res.data.code
            })
            .catch(err => {
                console.log(err)
            })
    },
    // 注册
    register(store, data) {
        // return这个请求 又会返回一个promise
        return this.$axios({
            url: "/accounts/register",
            method: "POST",
            // data:data
            data
        })
            .then(res => {
                // console.log(res)
                // 调用重置用户数据的方法 把仓库中的数据替换为返回数据
                store.commit("resetUserInfo", res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}