<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="users[index].username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="users[index].id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in ticketData.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="choseInsurance(item)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="success" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 添加乘机人
      users: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [], // 保险id的集合
      contactName: "", // 用户名字
      contactPhone: "", // 用户电话
      invoice: false, // 是否需要保险
      captcha: "", // 验证码
      seat_xid: "", // 座位id
      air: "", // 航班id
      ticketData: {
        insurances: [], // 保险的具体信息
        seat_infos: {} // 座位的具体信息
      }
    };
  },
  mounted() {
    // 通过 this.$route.query 获取到航班id和座位id
    let { id, seat_xid } = this.$route.query;
    // 获取选中机票的信息
    this.$axios({
      url: "airs/" + id,
      method: "GET",
      params: {
        seat_xid
      }
    })
      .then(res => {
        // console.log(res.data)
        this.ticketData = res.data;

        // 调用父组件传递过来的事件，并且把请求回来的数据传递过去
        this.$emit("getTicketData", res.data)
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },

    // 获取所选中保险的id
    choseInsurance(item) {
      // console.log(value)   // change事件输出的是布尔值 但我们需要的是保险的id号 所以要把保险的信息项传递过来
      // console.log(item)
      // 获取到数组中的id所对应的索引
      let index = this.insurances.indexOf(item.id);
      // 添加之前判断数组中是否存在了这个id 如果存在就先把它干掉再添加
      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(item.id);
      }
      // console.log(this.insurances)
    },

    // 发送手机验证码
    handleSendCaptcha() {
      const phone = this.contactPhone;
      // 如果用户名为空 则会弹出下面的提示框
      if (!phone.trim()) {
        this.$confirm("手机号不能为空！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          showCancelButton: false,
          center: true
        });
        return;
      }
      // 用户名存在的话就发送请求 请求验证码
      if (phone.trim()) {
        // 调用actions里面的方法 并把手机号传过去
        this.$store.dispatch("user/sendCaptcha", phone)
          .then(res => {
            // console.log(res)  // 当前输出的为验证码
            this.$confirm(`验证码为：${res}`, "提示", {
              confirmButtonText: "确定",
              type: "success",
              showCancelButton: false,
              center: true
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    // 提交订单
    handleSubmit() {
      // 添加验证规则
      const rules = {
        users: {
          value: this.users[0].username && this.users[0].id,
          message: "乘机人的信息不能为空"
        },
        contactName: {
          value: this.contactName,
          message: "请输入您的名字"
        },
        contactPhone: {
          value: this.contactPhone,
          message: "请输入您的手机号"
        },
        captcha: {
          value: this.captcha,
          message: "请输入手机验证码"
        }
      };
      let valid = true
      // 循环遍历 一个一个地进行验证  
      Object.keys(rules).forEach(val => {
        // 有一项为空就立刻执行return停止
        if(!valid) return
        // 如果没有输入信息则会出现以下的弹框
        if (!rules[val].value.trim()) {
          valid = false
          this.$message({
            type: "warning",
            message: rules[val].message
          })
          return
        }
      })

      // 有一项为空就立刻执行return停止
      if(!valid) return

      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: false,
        captcha: this.captcha,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      };
      this.$axios({
        url: "/airorders",
        method: "POST",
        data,
        // 设置授权的头部信息
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>