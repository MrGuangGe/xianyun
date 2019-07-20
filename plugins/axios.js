import { Message } from "element-ui";

export default ({ $axios, redirect }) => {
    // console.log(nuxt)
    // {$axios} 是从解构nuxt出来的
    $axios.onError(err => {
        // 单纯打印 err 还不能看到错误信息   要打印 err.response 才能成功看到错误信息
        // console.log(err)
        console.log(err.response)
        const { statusCode, message } = err.response.data;
        // 错误代码为401或403时的弹框
        if (statusCode === 401 || statusCode === 403) {
            // 错误的提示信息
            Message.warning({ message: "请先登录" });
            // 重定向 跳转到登录页面
            redirect("/user/login");
        }
        // 错误代码为400时的弹框
        if (statusCode === 400) {
            // 错误的提示信息
            Message.warning({ message })
            return
        }
    })
}