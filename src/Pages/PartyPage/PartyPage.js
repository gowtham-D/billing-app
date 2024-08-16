import { useState } from 'react';
import styles from './PartyPage.module.css';

function PartyPage(){

    let [list,setList] = useState([]);


    return (
        <div className={styles.container}>
            <h1>Party Page</h1>
        </div>
    )
}

export default PartyPage;