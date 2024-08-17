import { useEffect, useState } from 'react';
import styles from './App.module.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NavBar from './Components/NavBar/NavBar.js';
import { HashRouter, Route, Routes } from "react-router-dom";

import { HomePage, PartyPage, ItemsPage, InvoicesPage, TaxPage, ApplicationPage } from './Pages/AllPages.js';
import NotificationHandler from './Components/NotificationHandler/NotificationHandler.js';


function App() {

  let [selectedNav, setSelectedNav] = useState("home-page");

  let [notificationConfig, setNotificationConfig] = useState({});

  useEffect(() => {

    window.app = {
      showAlert:function(type,detail){
        let config = {
          type
        }

        if(typeof detail === "string"){
          config.message = detail;
        }else{
          config = { ...config, ...detail };
        }
        window.fire("show-alert",config);
      }
    }


    window.addEventListener("show-alert", (ev) => {



      setNotificationConfig({
        ...ev.detail,
        open: true
      });
    });
  });
  
  return (

    <HashRouter>
      <div className={styles.container}>
        <NavBar selectedNav={selectedNav} onNavChanged={setSelectedNav} className="side-panel"></NavBar>
        <div className={styles.mainPanel}>
          <Routes>
            <Route path='/home-page' element={<HomePage />}></Route>
            <Route path='/party-page' element={<PartyPage />}></Route>
            <Route path='/item-page' element={<ItemsPage />}></Route>
            <Route path='/invoice-page' element={<InvoicesPage />}></Route>
            <Route path='/tax-page' element={<TaxPage />}></Route>
            <Route path='/application-config' element={<ApplicationPage />}></Route>
          </Routes>
        </div>
      </div>
      <NotificationHandler config={notificationConfig} onClose={() => setNotificationConfig({})}></NotificationHandler>
    </HashRouter>
  );
}

export default App;
