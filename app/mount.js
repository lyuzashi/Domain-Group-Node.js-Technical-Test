/* Import browser dependencies for the HCard component and mount to DOM.
 * Set global Fetch options for cookies!
 */
import ReactDOM from 'react-dom';
import HCard from './hcard';

const actualFetch = global.fetch;
global.fetch = (url, options = {}) => actualFetch(url, { credentials: `same-origin`, ...options });

ReactDOM.render(
  React.createElement(
    HCard,
    // hCardProps
  ),
  document.getElementById('app')
);
