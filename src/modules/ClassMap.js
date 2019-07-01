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
            console.log(image);
            const marker = new Image();
            marker.src = MARKER_ICON;
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
                        'description': 'TEXT',
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
          this.map.flyTo({center: e.features[0].geometry.coordinates});
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
}
