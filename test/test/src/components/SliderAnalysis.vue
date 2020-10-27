<template>
  <el-container>
    <el-aside>
      <div class="block">
        <el-date-picker
          v-model="value1"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-select v-model="value" placeholder="请选择" style="margin-top: 20px;width: 220px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-radio v-model="radio" label="1" style="margin-top: 20px;margin-left: 16px">显示分区</el-radio>
        <el-radio v-model="radio" label="2">不显示分区</el-radio>
        <el-button style="margin-top: 20px;width: 220px">查询</el-button>
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
                <span>流量变化</span>
              </template>
              <el-menu-item>散点图</el-menu-item>
              <el-menu-item>热力图</el-menu-item>
              <el-menu-item>三维图</el-menu-item>
            </el-submenu>
            <el-submenu index="2" style="width: 220px">
              <template slot="title">
                <span>流量分析</span>
              </template>
              <el-menu-item>节假日与工作日对比</el-menu-item>
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
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
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
