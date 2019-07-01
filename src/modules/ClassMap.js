import mapboxgl from 'mapbox-gl';
import {MARKER_ICON, LS_POINTS_NAME} from '../constants';
// eslint-disable-next-line max-len
mapboxgl.accessToken = 'pk.eyJ1IjoibG91cjIwMDIiLCJhIjoiY2p4ajV2dTJjMXgyOTNuczhhZ2E0OWNmOCJ9.6IBMJR_o4Wl886nsWld7BA';

export class Map {
  constructor(mapId) {
    try {
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

      let points = localStorage.getItem(LS_POINTS_NAME);

      if (null !== points) {
        this.points = points = JSON.parse(points);

        this.map.on('load', () => {
          this.map.loadImage(`${MARKER_ICON}`, (error, image) => {
            this.map.addImage('marker', image);

            this.map.addLayer({
              'id': 'problems',
              'type': 'symbol',
              'source': {
                'type': 'geojson',
                'data': {
                  'type': 'FeatureCollection',
                  'features': points.map((point) => {
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
                  }),
                },
              },
              'layout': {
                'icon-image': 'marker',
                'icon-size': 0.25,
              },
            });
          });
        });
        this.map.on('click', 'problems', (e) => {
          console.log(e.features);
          this.map.flyTo({center: e.features[0].geometry.coordinates});
        });
        this.map.on('mouseenter', 'problems', () => {
          this.map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        this.map.on('mouseleave', 'problems', () => {
          this.map.getCanvas().style.cursor = '';
        });
      }
    } catch (error) {
      console.error(error);
    }
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

    this.newPoint = new mapboxgl.Marker({
      draggable: true,
      color: '#f44336',
    })
        .setLngLat([30.6, 50.43])
        .addTo(this.map);
  }
  resetNewPoint() {
    this.newPoint.setDraggable(false);
    this.newPoint = {};
  }
  initClickEvent(nameElement, messageElement) {
    this.map.on('click', 'problems', (e) => {
      const {name, message} = e.features[0].properties;
      if (undefined !== nameElement && undefined !== name) {
        nameElement.value = name;
      }
      if (undefined !== messageElement && undefined !== message) {
        messageElement.value = message;
      }
    });
  }
}
