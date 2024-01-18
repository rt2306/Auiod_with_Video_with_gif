import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Auio_Gif from './Auio_Gif';
import reportWebVitals from './reportWebVitals'; 
// import React_Player_with_aduido from './React_Player_with_aduido';
// import Audio_custom_gif from './Audio_custom_gif';
 
 const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auio_Gif />
    {/* <Audio_custom_gif /> */}
    {/* <React_Player_with_aduido /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
