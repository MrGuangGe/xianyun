<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥{{$store.state.air.totalPrice}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 引入生成二维码的插件
import QRCode from "qrcode";

export default {
  data() {
    return {
      timer: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.$axios({
        url: "/airorders/" + this.$route.query.id,
        method: "GET",
        // 设置授权的头部信息
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      })
        .then(res => {
          // console.log(res);
          // 拿到支付的链接
          const { code_url } = res.data.payInfo;
          // 插件要求的canvas
          let canvas = document.getElementById("qrcode-stage");
          // 生成二维码到canvas
          QRCode.toCanvas(canvas, code_url);

          this.timer = setInterval(async () => {
            // 调用付款状态查询的方法 并把请求回来的数据传递过去
            const pay = await this.isPay(res.data);
            if (pay) {
              // 弹框
              this.$message({
                type: "success",
                message: "支付完成"
              });
              // 清除定时器
              clearInterval(this.timer);
              return;
            }
          }, 3000);
        })
        .catch(err => {
          console.log(err);
        });
    }, 10);
  },
  methods: {
    // 支付结果轮询
    isPay(data) {
      return this.$axios({
        url: "/airorders/checkpay",
        method: "POST",
        data: {
          id: data.id,
          nonce_str: data.price,
          out_trade_no: data.orderNo
        },
        // 设置授权的头部信息
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      })
        .then(res => {
          // console.log(res);
          const { statusTxt } = res.data;
          if (statusTxt === "支付完成") {
            return true;
          } else {
            return false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>