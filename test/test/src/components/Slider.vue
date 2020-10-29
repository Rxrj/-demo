<template>
  <el-container>
    <el-aside>
      <div class="block" >
        <el-date-picker
          v-model="value"
          align="right"
          type="date"
          placeholder="Select Data"
          :picker-options="pickerOptions">
        </el-date-picker>
        <br>
        <el-checkbox v-model="checked" style="padding-top: 20px" @change="handleChange">Partition Visible</el-checkbox>
        <br>
        <el-button style="margin-top: 20px;width: 220px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee">Start</el-button>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: "SliderAnalysis",
  data() {
    return {
      checked: true,
      activeIndex: '1',
      activeIndex2: '1',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: 'Today',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: 'Yesterday',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: 'One week ago',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '1',
      radio:'1',
      options: [{
        value: '选项1',
        label: 'drop-off'
      }, {
        value: '选项2',
        label: 'pick-up'
      }, {
        value: '选项3',
        label: 'both'
      }],
      value: ''
    };
  },
  methods:{
    handleChange(){
      this.emit('handleChange',this.checked);
    }
  }
}
</script>

<style scoped>
.el-aside{
  border-right: 0!important;
  padding-top: 70px;
  position: absolute;
  width: 100%;
  top:10px;
  left:0px;
  bottom: 0;
  text-align: center;
}
.el-menu{
  border-right: 0!important;
  top: 30px;
}

.el-main{
  padding-top: 60px;
  position: absolute;
  width: 100%;
  top:10px;
  left:0px;
  bottom: 0;
}
.el-menu-item{
  background-color: #252525;
  color: #eeeeee;
}
.el-menu-item:hover,.el-menu-item:focus{
  background-color: #383838;
}

/deep/ .el-submenu__title:hover{background-color:#383838 !important;}
/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #eeeeee;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #252525;
  border-color: #eeeeee;
}
/deep/ .el-p .el-picker-panel__sidebar{
  color: #eeeeee;
  background-color: #252525;
}
/deep/ .el-input__inner{
  background-color: #2d2d2d;
  border: solid 2px #444444;
  color: #eeeeee;
}
</style>

