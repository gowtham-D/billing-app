import { useState } from 'react';
import styles from './InvoicesPage.module.css';

function InvoicesPage(){

    let [list,setList] = useState([]);


    return (
        <div className={styles.container}>
            <h1>Invoices Page</h1>
        </div>
    )
}

export default InvoicesPage;