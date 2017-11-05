/* Import browser dependencies for the HCard component and mount to DOM
 */
import ReactDOM from 'react-dom';
import HCard from './hcard';

ReactDOM.render(
  React.createElement(
    HCard,
    // hCardProps
  ),
  document.getElementById('app')
);
