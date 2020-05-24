let map;
  let zoom = 12;
  let typeid;
  let marker;

  initMap();


  function initMap() {
    let tokyo = {
      lat: 35.67832667,
      lng: 139.7704437812
    };
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom,
      center: tokyo
    });

    marker = new google.maps.Marker({ // マーカーの追加
      position: tokyo, // マーカーを立てる位置を指定
      map: map // マーカーを立てる地図を指定
    });

    // document.querySelector("#file_input").addEventListener("click", () => {
    //   document.querySelector("#file_input").fileExif(function (exif, lat, lng) {
    //     if (!exif) {
    //       console.log("exif情報なし");
    //       return;
    //     }
    //     if (!exif.GPSLatitude) {
    //       console.log("GPS情報なし");
    //       return;
    //     }
    //     var lat = exif.GPSLatitude[0] + (exif.GPSLatitude[1] / 60) + (exif.GPSLatitude[2] / 3600);
    //     var lng = exif.GPSLongitude[0] + (exif.GPSLongitude[1] / 60) + (exif.GPSLongitude[2] / 3600);

    //     let center = {
    //       lat: lat,
    //       lng: lng,
    //     }
    //     console.log(center);
    //     marker = new google.maps.Marker({ // マーカーの追加
    //       position: center, // マーカーを立てる位置を指定
    //       map: map // マーカーを立てる地図を指定
    //     });
    //   })
    // })
  }


  $('input').change(function () {
    $("input").fileExif(function (exif, lat, lng) {
      if (!exif) {
        console.log("exif情報なし");
        return;
      }
      if (!exif.GPSLatitude) {
        console.log("GPS情報なし");
        return;
      }
      var lat = exif.GPSLatitude[0] + (exif.GPSLatitude[1] / 60) + (exif.GPSLatitude[2] / 3600);
      var lng = exif.GPSLongitude[0] + (exif.GPSLongitude[1] / 60) + (exif.GPSLongitude[2] / 3600);

      let center = {
        lat: lat,
        lng: lng,
      }
      console.log(center);

      //div#mapを「GoogleMap」化
      map = new google.maps.Map(document.getElementById('map'), {
        center: center, // 地図の中心を指定
        zoom: zoom, //Zoom値設定
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      marker = new google.maps.Marker({ // マーカーの追加
        position: center, // マーカーを立てる位置を指定
        map: map // マーカーを立てる地図を指定
      });

      let key = $("#file-input").val();
      // alert(key);
      localStorage.setItem(key, JSON.stringify(center));
      console.log(key);
      if (localStorage.getItem(key)) {
        const value = JSON.parse(getItem(key));
        $("#file-input").val(value);
      }
    });
  });

  document.querySelector("#type").onchange = function () {
    console.log(typeid);
    typeid = this.value;
    if (typeid == "ROADMAP") {
      map.setMapTypeId('roadmap')
    }
    if (typeid == "SATELLITE") {
      map.setMapTypeId('satellite')
    }
    if (typeid == "HYBRID") {
      map.setMapTypeId('hybrid')
    }
    if (typeid == "TERRAIN") {
      map.setMapTypeId('terrain')
    }
  }