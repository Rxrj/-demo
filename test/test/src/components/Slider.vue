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
        <el-radio v-model="radio" label="1" style="margin-top: 20px;margin-left: 16px">显示分区</el-radio>
        <el-radio v-model="radio" label="2">不显示分区</el-radio>
        <el-button style="margin-top: 20px;width: 220px">开始</el-button>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: "Slider",
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
      value: ''
    };
  }
}
</script>

<style scoped>
.el-aside{
  border-right: 0!important;
  padding-top: 60px;
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
