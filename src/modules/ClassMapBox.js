import mapboxgl from 'mapbox-gl';
import {MAP_MARKER_DEFAULT, MAP_MARKER_SELECT, MAP_MARKER_NEW} from '../constants';
// eslint-disable-next-line max-len
mapboxgl.accessToken = 'pk.eyJ1IjoibG91cjIwMDIiLCJhIjoiY2p4ajV2dTJjMXgyOTNuczhhZ2E0OWNmOCJ9.6IBMJR_o4Wl886nsWld7BA';

export class ClassMapBox {
  constructor(mapId) {
    if (
      'string' !== typeof mapId ||
      undefined === document.getElementById(mapId)
    ) {
      throw new Error(`Can't find container by id: ${mapId}`);
    }

    this.map = new mapboxgl.Map({
      container: mapId,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.6, 50.43],
      zoom: 10,
    });

    this.newPoint = {};


    this.map.on('load', () => {
      this.pointsData = {
        'type': 'FeatureCollection',
        'features': [],
      };

      this.map.addSource('problemsjson', {
        'type': 'geojson',
        'data': this.pointsData,
      });

      this.map.addImage('marker-red', MAP_MARKER_DEFAULT);

      this.map.addImage('marker-green', MAP_MARKER_SELECT);

      this.map.addLayer({
        'id': 'problems',
        'type': 'symbol',
        'source': 'problemsjson',
        'layout': {
          'icon-image': 'marker-red',
          'icon-padding': 10,
          'icon-anchor': 'bottom',
        },
      });

      axios.post('//mc.yarche.work/map/ajax-get-points/', {})
          .then(({data}) => {
            if (Array.isArray(data.points)) {
              const points = data.points.map((point) => {
                const {coordinates, name, message} = point.data;
                return {
                  coordinates,
                  name,
                  message,
                };
              });

              this.pointsData.features = points.map((point) => {
                return {
                  'type': 'Feature',
                  'properties': {
                    'message': point.message,
                    'name': point.name,
                  },
                  'geometry': {
                    'type': 'Point',
                    'coordinates': point.coordinates,
                  },
                };
              });

              this.updateLayout();
            }
          });

      this.map.on('click', 'problems', (e) => {
        this.map.flyTo({center: e.features[0].geometry.coordinates});
      });

      this.map.on('mouseenter', 'problems', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      this.map.on('mouseleave', 'problems', () => {
        this.map.getCanvas().style.cursor = '';
      });
    });
  }
  get newPointLngLat() {
    const lngLat = this.newPoint.getLngLat();
    console.log(lngLat);
    return [lngLat.lng, lngLat.lat];
  }

  addPoint() {
    if (this.newPoint instanceof mapboxgl.Marker) {
      return;
    }

    this.newPoint = new mapboxgl.Marker(
        MAP_MARKER_NEW,
        {
          draggable: true,
          anchor: 'bottom',
        }
    )
        .setLngLat([30.6, 50.43])
        .addTo(this.map);
  }

  addNewPointToLayer({name, message}) {
    const point = {
      type: 'Feature',
      properties: {
        name,
        message,
      },
      geometry: {
        type: 'Point',
        coordinates: this.newPointLngLat,
      },
    };

    this.pointsData.features.push(point);
    this.newPoint.remove();
    this.updateLayout();
    this.newPoint = {};
  }

  initClickEvent(nameElement, messageElement) {
    this.map.on('click', 'problems', (e) => {
      if ( e.features.length) {
        const {name, message} = e.features[0].properties;
        if (undefined !== nameElement && undefined !== name) {
          nameElement.value = name;
        }
        if (undefined !== messageElement && undefined !== message) {
          messageElement.value = message;
        }
      }
    });
  }
  updateLayout() {
    if (this.map.getSource('problemsjson')) {
      this.map.getSource('problemsjson').setData(this.pointsData);
    }
  }
}
