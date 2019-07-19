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
          <el-checkbox :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" border></el-checkbox>
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
      insurances: [], // 保险id
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
    handleSubmit() {}
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