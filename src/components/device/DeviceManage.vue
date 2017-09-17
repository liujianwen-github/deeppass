<template>
  <Row class="container">
    <Col span="4" class="">
      <Sider :item="1"></Sider>
    </Col>
    <Col span="20">
      <HeadBox></HeadBox>
      <div class="operation">
        <button>添加</button>
      </div>
      <Table class="data" :columns="titles" :data="dataList"></Table>
    </Col>
  </Row>
</template>

<script>
import config from '@/config/default'
import INTERFACE from '@/INTERFACE'
import Sider from '../Sider'
import HeadBox from '../Head'
export default {
  name: 'DeviceManage',
  data(){
    return {
      titles:[{
          title:'',
          key:'1',
          render:(h,params) => {
            return h('input',{
              attrs: {
                type: 'checkbox'
              }
            })
          }
        },{
          title:'序号',
          key:'index'
        },{
          title:'名称',
          key:'name'
        },{
          title:'类型',
          key:'type'
        },{
          title:'连接方式',
          key:'lianjie'
        },{
          title:'添加日期',
          key:'date'
        },{
          title:'备注',
          key:'detail'
        },{
          title:'操作',
          key:'oper'
      }],
      dataList:[{
        index:1,
        name:'ilu',
        type:'camera',
        lianjie:'wi-fi',
        date:'2017-09-19',
        detail:'17',
        oper:'删除'
      }]
    }
  },
  components:{Sider, HeadBox},
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.container{
  .operation{
    text-align: left;
    button{
      background-color: white;
      border-radius: 5px;
      border:1px solid black;
      padding: 0.5em 1em
    }
  }
}
</style>
