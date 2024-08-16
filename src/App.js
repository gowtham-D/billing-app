import { useState } from 'react';
import styles from './App.module.css';
import NavBar from './Components/NavBar/NavBar.js';
import { HashRouter, Route, Routes } from "react-router-dom";

import { HomePage, PartyPage, ItemsPage, InvoicesPage, TaxPage, ApplicationPage } from './Pages/AllPages.js';


function App() {

  let [selectedNav,setSelectedNav] = useState("home-page");
  
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
    </HashRouter>
  );
}

export default App;
