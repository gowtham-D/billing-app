import { useState } from 'react';
import styles from './ItemsPage.module.css';

function ItemsPage(){

    let [list,setList] = useState([]);


    return (
        <div className={styles.container}>
            <h1>Items Page</h1>
        </div>
    )
}

export default ItemsPage;