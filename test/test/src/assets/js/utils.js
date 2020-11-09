function getMouseLngLat(e) {
  return "lng: " + e.lngLat.toArray()[0].toFixed(3) + "  lat: " + e.lngLat.toArray()[1].toFixed(3);
}

function randomHexColor() { //随机生成十六进制颜色
  return '#' + (Math.random() * 0xffffff << 0).toString(16);
}

function getColorByRandom(colorList) { //从几种颜色中随机取色实现每次取出不同的颜色
  let colorIndex = Math.floor(Math.random() * colorList.length);
  return colorList[colorIndex];
}

//返回当前点所在的区域id
function getCurrentGridIndex(currentPoint,gridCenters){
  var index = 0;
  var minDistance = 100000;
  for (var i=0;i<gridCenters.length;i++){
    var tempDist = distance(currentPoint,gridCenters[i]);
    if (tempDist<minDistance){
      minDistance = tempDist;
      index = i;
    }
  }
  return index;
}

function distance(p1,p2){
  return Math.sqrt((p1[0]-p2[0])*(p1[0]-p2[0]) + (p1[1]-p2[1])*(p1[1]-p2[1]));
}


export {
  getMouseLngLat,
  randomHexColor,
  getColorByRandom,
  distance,
  getCurrentGridIndex,
}
