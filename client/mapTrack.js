Template.map.rendered = function(){
  console.log('==== template.map.rendered ');
  // renderMap(Tracks.find().fetch());
   
  // 百度地图API功能
  var map = new BMap.Map("mapDiv");
  map.clearOverlays();
  map.addControl(new BMap.NavigationControl()); //添加默认缩放平移控件
  map.addControl(new BMap.ScaleControl());      // 添加默认比例尺控件
  var point = new BMap.Point(116.404, 39.915);
  map.centerAndZoom(point, 5);

  var points = [];
  var index = 0;
  var lastMarker = null;

  function addPoint(p){
    points.push(new BMap.Point(p.lng, p.lat));

    var len = points.length;
    if(len == 1){
      // 添加 标记点
      var marker = new BMap.Marker(points[0]);
      map.addOverlay(marker);

      // 文本标注
      var opts = {
          position: points[0],
          offset: new BMap.Size(30,-30)
      }
      var label = new BMap.Label('起点', opts);
      label.setStyle({
          color: 'red',
          fontSize: '12px',
          height: '20px',
          fontFamily:"微软雅黑",
          lineHeight: '20px'
      });
      map.addOverlay(label);
    }else{
      // 为最新的位子添加 动态标记点
      if(lastMarker){
        map.removeOverlay(lastMarker);
      }
      lastMarker = new BMap.Marker(points.slice(-1)[0]);
      map.addOverlay(lastMarker);
      lastMarker.setAnimation(BMAP_ANIMATION_BOUNCE);

      //设定可视区域的中心
      map.panTo(points.slice(-1)[0]);
      //画直线
      var polyline = new BMap.Polyline(points.slice(-2), {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});
      map.addOverlay(polyline);
      // polyline.enableEditing();
    }
  }

  Tracks.find().observe({
    added: function(doc){
      // console.log('==== Tracks observe added');
      // console.log(doc);
      // console.log(Tracks.find().fetch());
      addPoint({lng: doc.lng, lat:doc.lat});
    }
  });
}




