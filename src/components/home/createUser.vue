<template>
  <div class="popup" id="createUser" :class="{notshow:intellNotShow}">
   <div v-if="viewWhich=='createUser'">
    <header>
      <h3 class="whiteText">新建用户</h3>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img :src="img" alt="">
        <div class="changePic">
          <span>修改头像</span>
          <input type="file" name="" accept="image/png,image/jpg,image/jpeg"  ref="inputer" @change="changePic">
        </div>
      </div>
      <div class="addUser">
        <div class="addMessage long">
          <label class="whiteText">姓名</label>
          <input class="input" type="text" name="name" v-model="name" v-validate="'required|name'">
          <span v-show="errors.has('name')">&nbsp;{{ errors.first('name') }}</span>
        </div>
        <div class="addMessage short">
          <label class="whiteText">性别</label>
          <div>
            <input type="radio" id="fkman" name="sex" value="0" checked="checked" v-model="sex" v-validate="'required'">
            <label for="fkman" class="whiteText">男</label>
            <input type="radio" id="fkwoman" name="sex" value="1" v-model="sex" v-validate="'required'">
            <label for="fkwoman" class="whiteText">女</label>
          </div>
          <span v-show="errors.has('sex')">&nbsp;{{ errors.first('sex') }}</span>
        </div>
        <div class="addMessage long">
          <label class="whiteText">生日</label>
          <Date-picker v-model="birthday" class="input" :options="birthdayOPT"></Date-picker>
          <!-- <input type="date" name="" v-model="birthday"> -->
        </div>
        <div class="addMessage short">
          <label class="whiteText">VIP</label>
          <!-- <Date-picker v-model="birthday" class="input"></Date-picker> -->
          <div>
            <input type="radio" id="isVip" name="isVip" value='0' v-model="vip">
            <label for="isVip" class="whiteText">是</label>
            <input type="radio" id="notVip" name="isVip" value='1' v-model="vip">
            <label for="notVip" class="whiteText">否</label>
          </div>
        </div>
        <div class="addMessage long" :class="{itemHide:cardHide}">
          <label class="whiteText">卡号</label>
          <input class="input" type="text" name="cardId" v-model="cardId">
        </div>
        
      </div>
    </header>
    <article>
      <div class="content">
        <button class="footBtn btn" @click="returnHistory">取消</button>
        <button class="footBtn btn" @click="checkForm">确定</button>
      </div>
    </article>
   </div>
   <VueCropper
      :class="{cropShow:cropShow}"
      class="cropBox"
      ref="cropper"
      :img="cropImg.img"
      :info="cropImg.info"
      :canScale="cropImg.canScale"
      :autoCrop="cropImg.autoCrop"
      :autoCropWidth="cropImg.autoCropWidth"
      :autoCropHeight="cropImg.autoCropHeight"
      :fixed="cropImg.fixed"
      :fixedNumber="cropImg.fixedNumber"
    ></VueCropper>
  </div>
</template>
<!-- 新建用户组件 -->
<script>
// import $ from 'jquery'
import Axios from 'axios'
import config from '@/config/default'
import INTERFACE from '@/INTERFACE'
import VueCropper from 'vue-cropper'
// import QsConfig from '@/axiosCon'
export default {
  name: 'createUser',
  data () {
    return {
      msg:null,
      cropImg: config.cropImg,
      birthdayOPT:config.dayBefore,
      cropShow: false,
      intellNotShow: true,
      cardHide: true,
      name: null,
      img:'',
      vip: 0,
      sex: 0,
      cardId: null,
      birthday: null,
      facetrackId: null,
      update: true
    }
  },
  props: ['viewWhich', 'toCreateUser'],
  components: {VueCropper},
  // computed:{
  //   img: function(){
  //     return config.get_facetrackimage(this.facetrackId)
  //   }
  // },
  methods: {
    // 关闭窗口
    close: function () {
      // $('#createUser').css('display', 'none')
      this.intellNotShow = true
      this.$emit('popState', '0')
    },
    // 初始化加载，清空所有数据
    init: function () {
      this.cardHide = true
      this.name = null
      this.vip = 0
      this.sex = 0
      this.cardId = null
      this.birthday = null
    },
    // 返回到历史记录查询
    returnHistory: function () {
      this.$emit('popState', 'intell')
    },
    // 修改头像
    changePic: function (e) {
      console.log(e)
      console.log(this.$refs.inputer.files)
      const file = this.$refs.inputer.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        // 获取上传图片的base64编码，赋值给img
        this.img = e.target.result
        this.cropShow = true
        this.cropImg.img = e.target.result
        this.msg = this.$Message.info({
          content:'调整好图片后，回车键确认',
          duration: 0
        })
        $("input[type='file']").attr('disabled',true)
      }
    },
    // 检查表单
    checkForm: function (argument) {
      this.$validator.validateAll().then(result => {
        console.log(this.cardId === null)
        const isVip = this.vip === 0 
        if (!result) {
          // this.$Message.error('请按照提示完整填写')
          this.$emit('modalMessage','warning',this.errors.errors[0].msg)
          this.$emit('popState','createUser')
          this.update = false
          console.log(this.update)
          return
        } else if(!isVip &&this.cardId === null){
          this.$Message.error({content:'非vip卡号不能为空',duration:5})
        } else {
          this.createUser(isVip)          
        }
      })
    },
    // 上传图片截图
    cropTheImg: function (e) {
      // 回车确认裁剪图片
      if (e.keyCode === 13){
        this.$refs.cropper.startCrop() 
        this.$refs.cropper.stopCrop()
        this.$refs.cropper.getCropData((data) => {
          // TODO
          // 2017/08/28 16:56
          // 头像是用facetrackid获取的，实现截图功能的话返回base64地址，直接给base编码，或者不要截图（更换头像）
          // ********************************************************************************************************
          // 确定裁剪的图片，输出
          // console.log(this.img)
          this.img = data
          // console.log(data)
          // 裁剪窗口消失
          this.cropShow = false
          // 提示信息消失
          this.msg()
          // console.log(this.img)
          //按钮恢复可用
          $("input[type='file']").attr('disabled',false)
        })
      }
    },
    // 创建用户
    createUser: function (isVip) {

      // 数据格式化
      let dataList = new FormData()
      // 修改日期格式
      this.birthday = typeof this.birthday === 'undefined' ? '' : new Date(this.birthday).Format('yyyy-MM-dd')
      dataList.append('facetrackId', this.facetrackId)
      dataList.append('sex', this.sex)
      // 
      if (this.img.match(/base64/g)) {
        dataList.append('headImage',this.img.split(',')[1])
        // console.log(this.img)
        // return 
      }else{
         dataList.append('headImageUrl', this.img)
      }
      dataList.append('userName', this.name)
      // 如果不是vip，加上卡号信息
      if (!isVip)  dataList.append('cardId', this.cardId)
      dataList.append('birthday', this.birthday)
      dataList.append('vip', this.vip)
      // for(let item of dataList.values()){
      //   console.log(item)
      // }
      // return 
      // http操作
      Axios({
        method: 'POST',
        url: INTERFACE.POST_USER_FACETRACK,
        data: dataList,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          // 'Content-Type': 'text/plain'
        }
      }).then((res) => {
        console.log()
        if (res.data.status === 200) {
          // 回调操作
          this.$Message.success('创建成功')
          this.$emit('update')
          this.close()
          return
        }
        // 创建失败操作
        // this.$Message.error(res.data.msg)
        this.$Modal.error({
          title:'创建失败',
          content: res.data.message
        })
      }, (err) => {
        // 运行失败操作
        console.log(err)
      })
    }
  },
  watch: {
    // 当前窗口
    viewWhich: function (val, old) {
      console.log('createUser->viewWhich:' + val)
      if (val === 'createUser') {
        this.intellNotShow = false
        this.init()
      } else {
        this.intellNotShow = true
      }
    },
    // 传递到创建用户组件的数据
    toCreateUser: function (val, old) {
      this.facetrackId = val.facetrackId
      // this.facetrackId = val.facetrackId
      this.intellNotShow = false
      this.img = config.get_facetrackimage(this.facetrackId)
    },
    // 根据是否为vip判断cardId是否展示
    vip: function (val, old) {
      switch(val) {
        case '1':
          this.cardHide = false

          break;
        case '0':
          this.cardHide = true
          break;
      }
    },
    cropShow: function(val, old) {
      const _this = this
      if(val === true) {
        document.body.addEventListener('keyup',_this.cropTheImg,false)
      }else if (val === false) {
        document.body.removeEventListener('keyup',_this.cropTheImg,false)
      }
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
.notshow{
  display: none;
}
header{
  height: 60%
}
header>div:not(.closeWindow){
  display: inline-block;
  /*float: left;*/
  vertical-align: top;
  margin-top: 20px
}
header .addUser{
  padding-left: 10px;
  width: 60%;
  position: relative;
}
header .addUser .addMessage{
  margin-bottom: 10px;
}
.addMessage>label{
  width: 20%
}
.addMessage.short>div{
  display: inline-block;
  width: 160px
}
.addMessage.short>div label{
  width: 35%;
  text-align: center;
}
.itemHide{
  visibility: hidden;
}

header .setHead{
  position: relative;
  height: 144px;
  width: 144px;
  background-color: white
}
header .setHead>img{
  width: 100%
}
header .setHead>div{
  width: 100%;
  background-color: rgba(0,0,0,0.7);
  text-align: center;
  color: white;
  position: absolute;
  bottom:0;
}
article{
  clear: both;
  text-align: center;
  letter-spacing: 60px;
  width: 100%;
  height: 40px;
  position: absolute;
  bottom:20px;
}
article>div>button{
  background-color: #2B77D5;
  letter-spacing: 1px;
  width: 100px;
  color: white
}
.changePic{
  height: 30px
}
.changePic>span{
  line-height: 30px
}
input[type="file"]{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.input{
  /*width: 40%;*/
  max-width: 160px;
  height: 30px;
  display: inline-block;
}
.cropShow{
  display: block
}
</style>
