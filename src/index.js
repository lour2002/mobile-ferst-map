/* Styles */
import './styles.scss';

import {ClassMapBox} from './modules/ClassMapBox';
import {ClassProblemInfo} from './modules/ClassProblemInfo';
import {LS_POINTS_NAME} from './constants';

let wol = () => {};

if (window.onload != null) {
  wol = window.onload;
}

window.onload = () => {
  wol.call();

  const Map = new ClassMapBox('mapbox');
  const ProblemInfo = new ClassProblemInfo();

  ProblemInfo.disabled();

  document.getElementById('js-add-point').addEventListener('click', () => {
    ProblemInfo.enabled();
    Map.addPoint();
  });
  document.getElementById('js-add-problem').addEventListener('click', () => {
    ProblemInfo.disabled();
    const LngLat = Map.newPointLngLat;

    if (LngLat.length) {
      let points = localStorage.getItem(LS_POINTS_NAME);

      console.log(points);
      if (null === points) {
        points = [{
          coordinates: LngLat,
          name: ProblemInfo.nameElement.value,
          message: ProblemInfo.messageElement.value,
        }];
        localStorage.setItem(LS_POINTS_NAME, JSON.stringify(points));
      } else if ('string' === typeof points && points.length) {
        try {
          points = JSON.parse(points);
          points.push({
            coordinates: LngLat,
            name: ProblemInfo.nameElement.value,
            message: ProblemInfo.messageElement.value,
          });
          localStorage.setItem(LS_POINTS_NAME, JSON.stringify(points));
        } catch (error) {
          console.error(`Can't get point from localStorage`);
        }
      }
      Map.addNewPointToLayer({
        name: ProblemInfo.nameElement.value,
        message: ProblemInfo.messageElement.value,
      });
    }
  });

  Map.initClickEvent(ProblemInfo.nameElement, ProblemInfo.messageElement);
};
