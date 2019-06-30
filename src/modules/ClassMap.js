import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibG91cjIwMDIiLCJhIjoiY2p4ajV2dTJjMXgyOTNuczhhZ2E0OWNmOCJ9.6IBMJR_o4Wl886nsWld7BA';

export class Map {
    constructor(mapId) {
        try {
            if (
                'string' !== typeof mapId ||
                undefined === document.getElementById(mapId)
            ) {
                throw new Error(`Can't find container by id: ${mapId}`)
            }

            this.map = new mapboxgl.Map({
                container: mapId,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [30.6, 50.43],
                zoom: 12
            });

            this.newPoint = {};

            let points = localStorage.getItem('__mapPoints');

            // if (null !== points) {
            //     this.points = points = JSON.parse(points);
            //     if (Array.isArray(points)) {
            //         points.forEach((point) => {
            //             new mapboxgl.Marker({
            //                 color: '#f44336'
            //             })
            //                 .setLngLat(point)
            //                 .addTo(this.map);
            //         })
            //     }
            // }

            map.addLayer({
                "id": "symbols",
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [
                            {
                                "type": "Feature",
                                "properties": {color: '#f44336'},
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [
                                        -91.395263671875,
                                        -0.9145729757782163
                                    ]
                                }
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [
                                        -90.32958984375,
                                        -0.6344474832838974
                                    ]
                                }
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [
                                        -91.34033203125,
                                        0.01647949196029245
                                    ]
                                }
                            }
                        ]
                    }
                },
                "layout": {
                    "icon-image": "rocket-15"
                }
            });

            this.map.on('click', 'symbols', function (e) {
                this.map.flyTo({ center: e.features[0].geometry.coordinates });
            });
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
            color: '#f44336'
        })
            .setLngLat([30.6, 50.43])
            .addTo(this.map);
    }
    resetNewPoint() {
        this.newPoint.setDraggable(false);
        this.newPoint = {};
    }
}