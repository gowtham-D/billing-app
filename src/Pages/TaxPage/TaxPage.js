import { useState } from 'react';
import styles from './TaxPage.module.css';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";

function TaxItem(props) {
    return (<div className={styles.listItem + ' layout-horizontal center gap-16'}>
        <label className={styles.listItemName + ' flex'} >{`${props.name}@${props.rate}%`}</label>
        <label className={styles.listItemRate}>{props.rate}</label>
        <MdModeEdit className={'clickable icon-s24'}></MdModeEdit>
        <MdDelete className={'clickable icon-s24'}></MdDelete>
    </div>)
}

function TaxGroupItem(props) {
    return (<div className={styles.listItem +' layout-vertical gap-8'}>
        <div className='layout-horizontal center gap-16'>
            <label className={styles.listItemName +' flex'}>{`GST@${props.rate}%`}</label>
            <MdModeEdit className={'clickable icon-s24'}></MdModeEdit>
            <MdDelete className={'clickable icon-s24'}></MdDelete>
        </div>
        <div className='layout-horizontal center'>
            <label className={styles.listItemSecondary}>{`SGST@${props.rate/2}%`}</label>
            <label className={styles.listItemSecondary}>{`CGST@${props.rate/2}%`}</label>
        </div>
    </div>)
}


function TaxPage() {

    let [taxlist, setTaxList] = useState([
        { name: "GST", rate: 10 },
        { name: "PST", rate: 8 },
        { name: "HST", rate: 5 }
    ]);
    let [taxGroupList, setTaxGroupList] = useState([
        { GSTRate: 0},
        { GSTRate: 0.25},
        { GSTRate: 3},
        { GSTRate: 5},
        { GSTRate: 12},
        { GSTRate: 18},
        { GSTRate: 28},
    ]);


    return (
        <div>
            <div className={styles.mainPanel +' layout-horizontal'}>
                <div className={' flex '}>
                    <div className={styles.listHeader + ' layout-horizontal center'}>
                        <h3 className='h3'>Tax Rates</h3>
                        <MdAddCircleOutline className={'clickable icon-s24'}></MdAddCircleOutline>
                    </div>
                    <div className={styles.listBody}>
                        {
                            taxlist.map((item) => <TaxItem name={item.name} rate={item.rate}></TaxItem>)
                        }
                    </div>
                </div>
                <div className={' flex '}>
                    <div className={styles.listHeader + ' layout-horizontal center'}>
                        <h3 className='h3'>Tax Group Rates</h3>
                        <MdAddCircleOutline className={'clickable icon-s24'}></MdAddCircleOutline>
                    </div>
                    <div className={styles.listBody}>
                        {
                            taxGroupList.map((item) => <TaxGroupItem rate={item.GSTRate}></TaxGroupItem>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaxPage;