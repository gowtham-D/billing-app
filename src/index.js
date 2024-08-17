import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


window.fire = function (name, detail) {
  let ev = new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail
  });
  window.document.body.dispatchEvent(ev);
}

/**
 * Generates a random universally unique identifier (UUID).
 *
 * @return {string} A 36-character UUID in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
 */
window.generateUUID = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}