<template>
  <el-container>
    <el-aside>
      <div class="block">
        <el-date-picker
          v-model="value1"
          align="right"
          type="date"
          placeholder="select data"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-select v-model="value" placeholder="please choose" style="margin-top: 20px;width: 220px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-radio v-model="radio" label="1" style="margin-top: 20px;margin-left: 16px">partition visible</el-radio>
        <el-radio v-model="radio" label="2">invisible</el-radio>
        <el-button style="margin-top: 20px;width: 220px">search</el-button>
      </div>
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            style="left: 40px">
            <el-submenu index="1" style="width: 220px">
              <template slot="title">
                <span>Data changes</span>
              </template>
              <el-menu-item>Scatter plot</el-menu-item>
              <el-menu-item>Thermodynamic diagram</el-menu-item>
              <el-menu-item>Three dimensional diagram</el-menu-item>
            </el-submenu>
            <el-submenu index="2" style="width: 220px">
              <template slot="title">
                <span>Data analysis</span>
              </template>
              <el-menu-item>Holidays and working days</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: "SliderAnalysis",
  data() {
    return {
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
</style>
