import { useState } from 'react';
import styles from './HomePage.module.css';

function HomePage(){

    let [list,setList] = useState([]);


    return (
        <div className={styles.container}>
            <h1>Home Page</h1>
        </div>
    )
}

export default HomePage;