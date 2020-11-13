function getMonthData(){
  dataMonth=new Array();
  pickupMonth=new Array();
  dropoffMonth=new Array();
  for(var i=0;i<30;i++) {
    dataMonth[i] = new Array();
    pickupMonth[i] = new Array();
    dropoffMonth[i] = new Array();
    for (var j = 0; j < 288; j++) {
      dataMonth[i][j] = 1;
      pickupMonth[i][j] = 1;
      dropoffMonth[i][j] = 1;
    }
  }
  var index = 0;
  var url;
  var request;
  for(index=0;index < 30;index++){
    url = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_"+index+".geojson";
    request = new XMLHttpRequest();
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
      if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
        dataMonth[index] = JSON.parse(request.responseText);
        pickupMonth[index] = dataMonth[index].pickup.slice(0,288);
        dropoffMonth[index] = dataMonth[index].dropoff.slice(0,288);
      }
    };
  }
  alert(pickupMonth[1]);

}

function drawWorkingData(){

}

export {
  getMonthData
}
