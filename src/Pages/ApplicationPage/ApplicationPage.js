import { useState } from 'react';
import styles from './ApplicationPage.module.css';

function ApplicationPage(){

    let [list,setList] = useState([]);


    return (
        <div className={styles.container}>
            <h1>Application Page</h1>
        </div>
    )
}

export default ApplicationPage;