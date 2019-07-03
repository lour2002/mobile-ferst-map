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

  ProblemInfo.hideMessageInfo();

  document.getElementById('js-add-point').addEventListener('click', () => {
    ProblemInfo.reset();
    ProblemInfo.enabledEditMode();
    Map.addPoint();
  });


  document.getElementById('js-add-problem').addEventListener('click', () => {
    ProblemInfo.disabledEditMode();
    const LngLat = Map.newPointLngLat;

    if (LngLat.length) {
      const point = {
        coordinates: LngLat,
        name: ProblemInfo.nameInput.value,
        message: ProblemInfo.messageInput.value,
      };

      axios.post('http://api.davay2019.com/ajax-add-point/', {
        point,
      }).then(({data}) => {
        console.log(data);
      });

      Map.addNewPointToLayer({
        name: ProblemInfo.nameInput.value,
        message: ProblemInfo.messageInput.value,
      });

      ProblemInfo.reset();
    }
  });

  Map.initClickEvent(ProblemInfo);
};
