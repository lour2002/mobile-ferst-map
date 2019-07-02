/* Styles */
import './styles.scss';

import {ClassMapBox} from './modules/ClassMapBox';
import {ClassProblemInfo} from './modules/ClassProblemInfo';

window.axios = require('axios');

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
    ProblemInfo.reset();
    ProblemInfo.enabled();
    Map.addPoint();
  });
  document.getElementById('js-add-problem').addEventListener('click', () => {
    ProblemInfo.disabled();
    const LngLat = Map.newPointLngLat;

    if (LngLat.length) {
      const point = {
        coordinates: LngLat,
        name: ProblemInfo.nameElement.value,
        message: ProblemInfo.messageElement.value,
      };

      axios.post('http://api.davay2019.com/ajax-add-point/', {
        point,
      }).then(({data}) => {
        console.log(data);
      });

      Map.addNewPointToLayer({
        name: ProblemInfo.nameElement.value,
        message: ProblemInfo.messageElement.value,
      });

      ProblemInfo.reset();
    }
  });

  Map.initClickEvent(ProblemInfo);
};
