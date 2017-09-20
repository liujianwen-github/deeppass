<template>
  <div class="popup" id="registerUser" :class="{show:isShow}">
    <div>
   <!-- <video src="" id="video1" style="position: absolute;background-color:blue;"></video> -->
   <!-- <img id='nini'  alt=""> -->
      <header>
        <h3><span v-text="title"></span>用户</h3>
        <p v-if="title=='新建'" style="font-size: 12px">新建用户上传的图片，第一张将作为头像，上传图片不得少于2张</p>
        <div class="closeWindow" @click="close">&times;</div>
        <!-- 上传头像 -->
        <div class="setHead" >      
          <div>
            <!-- 显示用户头像，新建用户时显示默认头像 -->
            <div class="changePic">
              <!-- <img :src="personData.headImage" alt="1"> -->
              <div v-if="title==='新建'">
                <img src="../../assets/userHeader.png" alt="" v-if="personData.headImage===''">
                <img :src="'data:image/png;base64,'+personData.headImage" v-else>
              </div>
              <input type="file"  name="" ref="fileUpdateHead" @change="updateHead"  accept="image/png,image/jpg,image/jpeg">
              <img :src="'data:image/png;base64,'+personData.headImage" v-if="title==='编辑'">
            </div>
            <!-- 已选中待上传的图片序列 -->
            <div class="changePic"  v-for="(item,index) in personData.imgs" track-by="index" v-if="title==='新建'">
              <img :src="'data:image/png;base64,' + item" alt=""><!-- {{item}} -->
            </div>
            <!-- 添加图片序列的按钮 -->
            <div class="changePic" v-if="title==='新建'">
              <input type="file" name="" ref="fileInputOne" @change="chooseImg" multiple="multiple" :accept="accepyType">
              <!-- <input type="file" name="" ref="fileInputOne" @change="chooseImg" multiple="multiple" :accept="accepyType"> -->
              <img src="../../assets/inputImg.png" alt="">
            </div>
            <!-- <div class="changePic" v-if="title ==='编辑'"   @click="getUserInfos()">
              <div style="padding:20% 0">
                <img src="../../assets/search_800px.png" style="width:50px;height:50px;vertical-align: middle" alt="">
                <p>查看历史识别记录</p>
              </div> 
            </div> -->
          </div>    
        </div>
        <p style="display:inline-block;width:144px;text-align:center"><span>上传用户头像</span></p><p style="display:inline-block;width:144px;text-align:center"><span v-if="title==='新建'">上传用户照片</span></p>
        
      </header>
      <!-- <UserInfos :isHidden = "userInfoIsHidden" :personId="personData.personId" @back="userInfoIsHidden=true"></UserInfos> -->
      <article>
        <div class="content">
        <!-- 编辑信息 -->
        <div class="addUser">
          <br>
          <Row>
            <Col span="12" class="addMessage long">
                <label>姓名</label>
                <input type="text" name="name" v-model="personData.userName" v-validate="'required|name'">
                <p v-show="errors.has('name')">&nbsp;{{ errors.first('name') }}</p>
            </Col>
            <Col span="12" class="addMessage short">
              <label>性别</label>
              <div>
                <input type="radio" id="userMan" name="sex" value="0"  v-model="personData.sex" v-validate="'required'">
                <label for="userMan">男</label>
                <input type="radio" id="userWoman" name="sex" value="1" v-model="personData.sex" v-validate="'required'">
                <label for="userWoman">女</label>
              </div>
              <p v-show="errors.has('sex')">&nbsp;{{ errors.first('sex') }}</p>
            </Col>
          </Row> 
          <!-- <br> -->
          <Row>
            <Col span="12" class="addMessage short">
              <label>门禁权限</label>
              <div>
                <input type="radio" id="isVip" name="isVip" v-validate="'required'" value="0" v-model="vip" >
                <label for="isVip">是</label>
                <input type="radio" id="notVip" name="isVip" v-validate="'required'" value="1" v-model="vip">
                <label for="notVip">否</label>
              </div>
              <p v-show="errors.has('isVip')">&nbsp;{{ errors.first('isVip') }}</p>
            </Col>
            
            <Col span="12" class="addMessage long">
              <label>生日</label>
              <!-- <input type="date" name="" v-model="personData.birthday"> -->
              <Date-picker name="birthday" v-model="personData.birthday" class="input" :options="birthdayOPT"></Date-picker>
              <p v-show="errors.has('birthday')">&nbsp;{{ errors.first('birthday') }}</p>
            </Col>
          </Row> 
          <Row> 
            <Col span="12" class="addMessage long" id="cardBox" :class="{processHide: cardHide}">
              <label>卡号</label>
              <input type="text" name="cardId"  v-model="personData.cardId">
              <!-- <p v-show="errors.has('cardId')">&nbsp;{{ errors.first('cardId') }}</p> -->
            </Col>
          </Row> 
          </div>
          <Progress :percent="percent" :class="{processHide: processHide}"></Progress>
          <div class="foot">
            <button class="btn" @click="close">取消</button>
            <button class="btn" @click="checkForm">下一步</button>
          </div>
        </div>
      </article>
      <!-- <div class="goDelete" v-if="title=='编辑'">
        <span class="btn" @click="godelete">删除用户</span>
      </div> -->
      <!-- 删除用户弹窗 -->
      <!-- <div class="deleteUser">
        <div>
        <div>
          <p>是否删除用户?</p>
          <p class="btnGroup">
            <button class="btn whiteText" @click="dontDelete">取消</button>
            <button class="btn whiteText" @click="mksureDelete">确认</button>
          </p>
        </div>   
        </div>
      </div> -->
      <div class="btnhid" style="position:absolute;top:0;z-index:110" :class="{cropShow:cropShow}">
        <button @click="touchCrop" style="width:100px;height:50px;background-color:lightblue;font-size:30px">确认</button>
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
      >
      </VueCropper>
      
     <!--  <VueCropper
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
      ></VueCropper> -->
    </div>
  </div>
</template>
<!-- 新建用户组件 -->
<!-- TODO图片下添加input file -->
<script>
import $ from 'jquery'
// import Axios from 'axios'
import config from '@/config/default'
import common from '@/common'
import INTERFACE from '@/INTERFACE'
import userHead from '../../assets/userHeader.png'
import VueCropper from 'vue-cropper'
// import UserInfos from './searchUserInfos.vue'
export default {
  name: 'registerUser',
  data () {
    return {
      msg: null,
      userinfoList:[],
      percent: 0,
      userHead: userHead,
      itemInfo:null,
      update: true,
      isShow: false,
      cropShow: false,
      // cardHide: true,
      processHide: true,
      userInfoIsHidden: true,
      cropImg: config.cropImg,
      accepyType:"image/png,image/jpg,image/jpeg",
      // accepyType:"video/mp4",
      vip: '0',
      birthdayOPT: config.dayBefore,
      // personData中的数据以及vip等，都是从totalUserList中带过来的
      title: null,
      personData: {
        headImage: '',
        imgs: [],
        userName: '',
        sex: '0',
        time: null,
        cardId: '',
        birthday: null,
        personId: '',
        images:[]
      }
    }
  },
  props: ['viewWhich', 'toRegisterUser'],
  components: {VueCropper},
  computed: {
    // 根据person是否具有vip属性，来判断cardId输入框是否显示
    cardHide: {
      get() {
        return this.vip ==='0'?true:false
      },
      set(msg){
        this.vip = msg
      }
    }
  },
  methods: {
    get_facetrackimage: function(facetrackId){
      return common.get_facetrackimage(facetrackId,this.$store.state.userInfo.customName)
    },
    initPage(){
      this.personData ={
        headImage: '',
        imgs: [],
        userName: null,
        sex: '0',
        time: null,
        cardId: '',
        birthday: null,
        personId: '',
        images:[]
      }
      this.isShow = false
      this.processHide = true
      this.userInfoIsHidden = true
      this.cardHide = true
    },
    close: function () {
      this.$emit('popState', '0')
      this.initPage()
      this.$forceUpdate()
      console.log('register组件显示状态：'+(this.isShow).toString())
    },
    nextStep(){
      this.$emit('changeUserData',this.personData,this.title)
      this.$emit('popState','chooseDevice')
    },
    // 更新头像
    updateHead: function () {
      const file = this.$refs.fileUpdateHead.files[0]
       this.msg = this.$Message.info({
          content:'调整好图片后，回车键确认',
          duration: 0,
          closable: true
        })
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.cropShow = true
        this.cropImg.img = e.target.result
        // 禁用上传文件按钮，避免回车继续打开传文件
        $("input[type='file']").attr('disabled',true)
      }
    },
    // 图片序列添加
    chooseImg: function (e) {
      const _this = this
      const files = this.$refs.fileInputOne.files

      // config.readFile(files[0],function(e){
      //   console.log(_this)
      //   _this.personData.imgs = e
      // })
      // return
      this.personData.imgs = this.personData.imgs || []
      // console.log(this.$refs.fileInputOne.files)
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        let isTrue = file.type ==='image/png' || file.type==='image/jpeg' || file.type==='image/jpeg'
        console.log(isTrue)
        if(!isTrue){
            this.msg = this.$Message.error({
            content:'请选择图片上传',
            duration: 5
          })
            return
        }
        this.personData.images.push(file) //上传的图片文件
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          this.personData.imgs.push(e.target.result.split(',')[1])
          this.$forceUpdate()
          console.log(this.personData.imgs)
          console.log(this.personData.images)
        }
      }
    },
    // 去往删除界面
    godelete: function () {
      $('.deleteUser').css('display', 'block')
      $('#registerUser>div>header').addClass('vague')
      $('#registerUser>div>article').addClass('vague')
    },
    // 检查表单
    checkForm: function () {
      // 调用validator验证全部条件
      this.$validator.validateAll().then(result => {
        const isVip = this.vip === '0' 
        console.log(this.personData.cardId === '')
        if (!result) {
          // this.$Message.error('请按照提示完整填写')
          this.$Message.warning('请按照提示完整填写')
          // console.log(this.$store)
          // this.$emit('popState','registerUser')
        } else if(!isVip &&this.personData.cardId === ''){
          this.$Message.error({content:'非vip卡号不能为空',duration:5})
        } else {
          // this.pushFormat()
          this.nextStep()
        }
      })
    },
    pushFormat: function () {
        $("button").attr('disabled',true)
        // 新建用户验证图片数量
        if (this.title === '新建' && this.personData.images.length >= 0) {
          // alert(this.personData.images.length)
          // alert(config.minImageCount)
          if (this.personData.images.length < config.minImageCount) {
           // this.$Message.error('照片太少，不能上传')
           this.$emit('modalMessage','warning','图片数量不足，请添加后再进行操作')
            $("button").attr('disabled',false)
           this.update = false
          } else {
            this.update = true
          }
        }
        if (typeof this.personData.images === 'undefined') {
          this.personData.images = []
        }
        if (this.update === false) return false
        this.processHide = false
        let personData = new FormData()
        // 修改日期格式
        this.personData.birthday = typeof this.personData.birthday === 'undefined' ? '' : new Date(this.personData.birthday).Format('yyyy-MM-dd')
        console.log(this.personData)
        personData.append('personId', this.personData.personId)
        personData.append('userName', this.personData.userName)
        personData.append('sex', Number(this.personData.sex))
        personData.append('birthday', this.personData.birthday)
        //如果用户上传的头像为空，表单中不加headImage
        if(this.personData.headImage !=''){
          personData.append('headImage', this.personData.headImage)
        }
        // personData.append('userkey', config.userkey)
        // personData.append('deviceId', config.deviceId)
        personData.append('vip', this.vip)
        if (this.vip === '1') {
          personData.append('cardId', this.personData.cardId)
        }
        console.log(personData.get('images'))
        let _this = this
        if (this.title === '新建') {
          for(let i = 0;i< this.personData.images.length;i++){
            personData.append('images', this.personData.images[i])
          }
          this.$http({
            method: 'POST',
            url: INTERFACE.POST_USER_IMAGE,
            data: personData,
            onUploadProgress: function (e) {
              // 这里的this指向xhr对象
              _this.percent = Math.round((e.loaded * 100) / e.total)
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) =>{
            // alert(res.data.status)
            this.processHide = true
            this.percent = 0
            $("button").attr('disabled',false)

            if (res.data.status ===200) {
              this.$Message.success({content:'创建成功',duration: 5})
              this.$emit('popState','update')
              this.close()
              return
            }else{
              // alert(res.data.msg)
              this.$Message.error(res.data.reference)
              $("button").attr('disabled',false)
            } 
          })
          .catch((err) => {
            // alert('err')
            this.$Message.error(err.toString())
            $("button").attr('disabled',false)
          })
        } else if (this.title === '编辑') {
          this.$http({
            method: 'POST',
            url: INTERFACE.PUT_USER,
            data: personData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            onUploadProgress: function (e) {
              // 这里的this指向xhr对象
              _this.percent = Math.round((e.loaded * 100) / e.total)
            }
          }).then((res) => {
            console.log(res)
            this.processHide = true
            this.percent = 0
            $("button").attr('disabled',false)
            if (res.data.status === 200) {
              // this.$emit('popState', '0')
              this.$Message.success(res.data.reference)
              this.$emit('popState','update')
              this.close()
              return
            }else{
              this.$Message.error(res.data.reference)
              $("button").attr('disabled',false)
            }
          }, (err) => {
            this.$Message.error(err.data.reference)
            $("button").attr('disabled',false)
          })
        }
        
      
    },
    // 取消删除操作
    dontDelete: function () {
      $('.deleteUser').css('display', 'none')
      $('#registerUser>div>header').removeClass('vague')
      $('#registerUser>div>article').removeClass('vague')
    },
    // 确认删除
    mksureDelete: function () {
      // alert('push delete,return userManage')
      let dataForm = new FormData()
      dataForm.append('personId', this.personData.personId)
      this.$http({
        method: 'POST',
        url: INTERFACE.DELETE_USER,
        data: dataForm,
        headers: {
          'Content-Type': ' application/x-www-form-urlencoded'
        }
      }).then((res) => {
        console.log(res)
        $('.deleteUser').css('display', 'none')
        $('#registerUser>div>header').removeClass('vague')
        $('#registerUser>div>article').removeClass('vague')
        this.$emit('deleteItem', this.personData.index)
        this.close()
      }, (err) => {
         this.$Message.error(err.data.msg)
      })
    },
    // 确认裁剪图片
    cropTheImg: function(e){
      // 回车确认裁剪图片
      if (e.keyCode === 13 || typeof e.keyCode ==='undefined'){
        this.$refs.cropper.startCrop() 
        this.$refs.cropper.stopCrop()
        this.$refs.cropper.getCropData((data) => {
          // 确定裁剪的图片，输出
          this.personData.headImage = data.split(',')[1]
          //裁剪窗口消失
          this.cropShow = false
          // 提示消息消失
          this.msg()
          $("input[type='file']").attr('disabled',false)
        })
      }
    },
    touchCrop: function(){
      this.$refs.cropper.startCrop() 
        this.$refs.cropper.stopCrop()
        this.$refs.cropper.getCropData((data) => {
          // 确定裁剪的图片，输出
          this.personData.headImage = data.split(',')[1]
          //裁剪窗口消失
          this.cropShow = false
          // 提示消息消失
          this.msg()
          $("input[type='file']").attr('disabled',false)
        })
    },
    getUserInfos: function(){
      this.userInfoIsHidden = false
    }
  },
  watch: {
    viewWhich: function (val, old) {
      console.log(val)
      
        console.log(this.personData)
        this.personData = this.toRegisterUser
      // 新建or编辑
      if (val === 'editUser') {
        this.isShow = true
        this.title = '编辑'
        // this.personData = this.toRegisterUser
        // console.log(this.toRegisterUser)
      } else if (val === 'addNewUser') {
        console.log(this.personData)
        // for(let i=0;i<=10;i++){
        //   console.log('!!!!')
        // }
        this.isShow = true
        this.title = '新建'
        this.personData.imgs = []
          this.personData.images = []
          this.cardHide = true
          this.vip = String(this.personData.vip)

          console.log('register状态为新建，初始数据如下:')
          console.log(this.personData)
      }else{
        this.isShow = false
        this.initPage()
      }
      this.personData.headImage = this.toRegisterUser.headImage
      this.vip = String(this.personData.vip)
    },
    // toRegisterUser: {
    //   handler (val, old) {
    //     console.log('元数据改变')
    //     console.log(val)
    //     // 获取元数据一份,edit的信息深拷贝一份，防止编辑用户信息的时候影响到item的显示
    //     this.itemInfo = val 
    //     this.personData = common.deepCopy(this.itemInfo)
    //     if (this.title === '新建') {
    //       // 初始化修改用户信息窗口的数据
    //       // this.isShow = true
    //       this.personData.imgs = []
    //       this.personData.images = []
    //       this.cardHide = true
    //       this.vip = String(this.personData.vip)

    //       console.log('register状态为新建，初始数据如下:')
    //       console.log(this.personData)
    //       return
    //     }
    //     // 默认不显示进度条
    //     this.personData.headImage = val.headImage
    //     this.vip = String(this.personData.vip)
    //     console.log(this.personData)
    //   },
    //   deep: true
    // },
    // vip: function (val, old) {
    //   switch(val) {
    //     case '1':
    //       // this.cardHide.set('1')

    //       break;
    //     case '0':
    //       // this.cardHide.set('')
    //       break;
    //   }
    // },
    cropShow: function(val, old) {
      const _this = this
      if(val === true) {
        document.body.addEventListener('keyup',_this.cropTheImg,false)
      }else if (val === false) {
        document.body.removeEventListener('keyup',_this.cropTheImg,false)
      }
    }
  },
  created(){
    var arr1 = {
      user:'1',
      psd: '2'
    }
    var arr2 = common.deepCopy(arr1)
    arr2.psd = 'bibi'
    console.log(arr1)
    console.log(arr2)
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
.popup{
  display: none;
}
.btnhid{
  display: none
}
.cropShow{
  display: block!important;
}
.processHide{
  visibility: hidden;
}
p{
  margin-bottom: 0; 
}
header>div{
  margin-top: 10px;
}
header{
    color: white;
    text-align: left;
  }
h3{
  margin:0;
  font-size: 24px
}
h3>span{
  font-size: 24px
}

header .setHead{
  position: relative;
  height: 150px;
  width: 100%;
}
header .setHead>div{
  /*width: 200%;*/
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space:nowrap;
}
.goLong{
  width: 150%!important
}

header .setHead .changePic{
  width: 144px;
  height: 100%;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  /*border: 1px solid grey;*/
  /*background-color: white;*/
  text-align: center;
  color: white;
  /*float:left;*/
  display: inline-block;
  margin-right: 20px;
  position: relative;
  overflow:hidden; 
}
header .setHead .changePic>div{
  width: 100%;
  height: 100%
}
header .setHead .changePic img{
  /*width: 100%;*/
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  height: 100%;
  /*width: 100%;*/
  /*min-height: 100%;*/
}
article{
  clear: both;
  text-align: center;
  /*letter-spacing: 60px;*/
  width: 100%;
  position: relative;
}
article .addUser{
  padding-left: 10px;
  margin-top:10px
}
article .addUser .addMessage{
  min-height: 50px;
  display: flex!impotant;
  text-align: left;
}
article .addUser .addMessage>label{
  display: inline-block;
  width: 40%;
  min-width: 80px;
  text-indent: 2em;
  /*background-color: red;*/
}

article .addMessage.long>input,.addMessage.long>.input{
  width: 55%;
  max-width: 160px;
  height: 30px;
  /*margin-left: 10%;*/
  display: inline-block;
}
article .addMessage.short>div{
  /*margin-left: 10%;*/
  text-align: left;
  display: inline-block;
  width: 55%;
  text-indent: 5px
}
article .addMessage.short>div>label{
  /*width: 40%;*/
  text-align: center;
  display: inline-block;
}
article>div .foot{
  letter-spacing: 20px
}
article>div .foot button{
  background-color: #2B77D5;
  letter-spacing: 0;
  max-width: 100px;
  margin: 0;
  width: 40%;
  height: 30px;
  color: white
}
.goDelete{
  text-align: right
}

/*确认删除弹窗*/
.deleteUser{
  width: 100%;
  height: 100%;
  /*background-color: red;*/
  position: absolute;
  left: 0;
  top: 0;
  display: none
}
.deleteUser>div{
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%
}
.deleteUser>div>div{
  /*width: 100%;
  height: 100%;*/
  position: relative;
  left: -50%;
  top: -40%;
  background-color: white;
  /*width: 100%;*/
  /*box-sizing: content-box;*/
  /*background-color: red;*/
  /*border:1px solid red;*/
  letter-spacing: 1em;
  /*display: table-cell;*/
  text-align: center;
  padding:60px 0;
}
.deleteUser>div>div p{
  letter-spacing: 1px;
  width: 100%
}
.deleteUser .btnGroup>button{
  background-color: #2B77D5;
}
input[type="file"]{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /*background-color: red;*/
  opacity: 0
}

</style>
