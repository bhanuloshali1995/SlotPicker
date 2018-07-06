import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import SlotSelector from './slotSelector';

ReactDOM.render(<SlotSelector />, document.getElementById('root'));
registerServiceWorker();
