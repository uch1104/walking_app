export default {
  map: null,

  // 初期化
  // Args:
  //   lat (float): 初期状態で表示する中心緯度
  //   lat (float): 初期状態で表示する中心軽度
  //   zoom (int): 初期状態で表示するズームレベル
  //   key_name (str): 緯度経度をローカルストレージに保存する際のキー（ユーザ名等を入れる）
  init(lat, lng, zoom, key_name) {
    const self = this

    let default_lat = lat ? lat : 35.6812362
    let default_lng = lng ? lng : 139.7671248
    let default_zoom = zoom ? zoom : 16


    const storage_key = 'map:' + (key_name || '') + ':' + location.pathname;

    if (localStorage) {
      var value = localStorage.getItem(storage_key);
      if (value) {
        var data = value.split(',')
        default_lat = parseFloat(data[0]);
        default_lng = parseFloat(data[1]);
        default_zoom = parseInt(data[2]);
      }
    }

    const latlng = new window.google.maps.LatLng(default_lat, default_lng);

    const mapOptions = {
      zoom: default_zoom,
      // maxZoom: 14,
      center: latlng,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      clickableIcons: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM
      },
      fullscreenControl: false,
      scaleControl: true
    };
    const el = document.getElementById('google-map');
    this.map = new window.google.maps.Map(el, mapOptions);

    this.geocoder = new window.google.maps.Geocoder();

    this.infowindow = new window.google.maps.InfoWindow();
    // this.places = new window.google.maps.places.PlacesService(this.map);

    const loc_el = document.createElement('div')
    loc_el.className = 'current-location';
    loc_el.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path fill="#666666" stroke="#666666" stroke-width="1" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
    `
    loc_el.onclick = function () {
      self.getCurrentLocation();
      return;
    }
    this.map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(loc_el);

    window.google.maps.event.addListener(this.map, 'idle', function() {
      if (localStorage) {
        var center = self.map.getCenter();
        var zoom = self.map.getZoom();
        var value = center.lat() + ',' + center.lng() + ',' + zoom
        localStorage.setItem(storage_key, value);
      }
      console.log(center.lat(), center.lng(), zoom);
    });

    this.msg_el = document.createElement('div')
    this.msg_el.classList.add('map-message')
    this.msg_el.innerHTML = ''
    this.map.getDiv().appendChild(this.msg_el)
  },

  fitBounds(bounds, max_zoom) {
    if (!max_zoom) {
      this.map.fitBounds(bounds);
      return;
    }

    var zoom = this.getZoomByBounds(bounds);
    if (zoom > max_zoom) {
        zoom = max_zoom;
    }
    this.map.panTo(bounds.getCenter());
    this.map.setZoom(zoom);
    return zoom;
  },

  getZoomByBounds(bounds){
    var mapType = this.map.mapTypes.get(this.map.getMapTypeId());
    if (!mapType) {
      return;
    }
    var maxZoom = mapType.maxZoom ? mapType.maxZoom : 21;
    var minZoom = mapType.minZoom ? mapType.minZoom : 0;
    var northEast = this.map.getProjection().fromLatLngToPoint(bounds.getNorthEast());
    var southWest = this.map.getProjection().fromLatLngToPoint(bounds.getSouthWest());
    var worldCoordWidth = Math.abs(northEast.x - southWest.x);
    var worldCoordHeight = Math.abs(northEast.y - southWest.y);
    var fitPad = 30;
    for (var zoom = maxZoom; zoom >= minZoom; --zoom) {
      if (worldCoordWidth * (1 << zoom) + 2 * fitPad < this.map.getDiv().clientWidth && worldCoordHeight * (1 << zoom) + 2 * fitPad < this.map.getDiv().clientHeight) {
        return zoom;
      }
    }
    return 0;
  },

  location_marker: null,
  watch_id: null,

  getCurrentLocation() {
    const self = this
    if (self.watch_id) {
      if (self.location_marker) {
        self.map.panTo(self.location_marker.getPosition());
      }
    }
    function success(position) {
      if (position.coords.accuracy > 100000) {
        return
      }
      var p = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude)

      if (!self.location_marker) {
        self.location_marker = new window.google.maps.Marker({
          icon: {
            'url': '/static/images/gpsloc.png',
            'size': new window.google.maps.Size(34, 34),
            'scaledSize': new window.google.maps.Size(17, 17),
            'origin': new window.google.maps.Point(0, 0),
            'anchor': new window.google.maps.Point(8, 8)
          },
          position: p,
          map: self.map
        });
        self.map.panTo(p);

      } else {
        self.location_marker.setPosition(p);
      }
    }
    function error() {
    }
    self.watch_id = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true
    });
  },


  showMessage(message) {
    this.msg_el.innerHTML = message
    this.msg_el.style.display = 'block'
  },

  hideMessage() {
    this.msg_el.innerHTML = ''
    this.msg_el.style.display = 'none'
  },


  fromLatLngToPoint(lat, lng) {
    const projection = this.map.getProjection()

    const bounds = this.map.getBounds()
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const p1 = projection.fromLatLngToPoint(new window.google.maps.LatLng(ne.lat(), sw.lng()));
    const p2 = projection.fromLatLngToPoint(new window.google.maps.LatLng(lat, lng))

    const scale = Math.pow(2, this.map.getZoom());

    return {
      x: (p2.x - p1.x) * scale,
      y: (p2.y - p1.y) * scale
    }
  }

};
