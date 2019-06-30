/* Styles */
import './styles.scss';

import {Map} from './modules/ClassMap';

window.onload = () => {
    const map = new Map('mapbox');

    document.getElementById('js-add-point').addEventListener("click", () => map.addPoint() );
    document.getElementById('js-add-problem').addEventListener("click", () => {
        const LngLat = map.newPointLngLat;

        if (LngLat.length) {
            let points = localStorage.getItem('__mapPoints');
            console.log(points)
            if (null === points) {
                points = [LngLat];
                localStorage.setItem('__mapPoints', JSON.stringify(points))
            } else if ('string' === typeof points && points.length){
                try {
                    points = JSON.parse(points);
                    points.push(LngLat)
                    localStorage.setItem('__mapPoints', JSON.stringify(points))
                } catch (error) {
                    console.error(`Can't get point from localStorage`);
                }
                
            }
        }

        map.resetNewPoint();
    });
}
