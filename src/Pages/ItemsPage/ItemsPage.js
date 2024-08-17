import { useState } from 'react';
import styles from './ItemsPage.module.css';
import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import clsx from 'clsx';
import { Button } from '@mui/material';

const currencyFormatter = new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:2}).format;

function ItemsPage(){

    let [itemsList,setItemsList] = useState([
        {   id: window.generateUUID(),
            name : "178F Engine self start kit with battery",
            price : {
                sale : 16524,
                purchase :0
            },
            quantity:5
        },
        {   id: window.generateUUID(),
            name : "179F Engine self start kit with battery",
            price : {
                sale : 16524,
                purchase :0
            },
            quantity:10
        },
        {   id: window.generateUUID(),
            name : "Aeroplane",
            price : {
                sale : 1652400,
                purchase :0
            },
            quantity:0
        },
        {   id: window.generateUUID(),
            name : "Submarine",
            price : {
                sale : 19757524,
                purchase :0
            },
            quantity:-10
        }
    ]);

    let [selectedItem,setSelectedItem] = useState(itemsList[0]);

    function editItem(row){

    }

    function deleteItem(row){

    }


    function handleRowSelection(selectionModel){
        const selectedRowData = itemsList.find((row) => row.id === selectionModel[0]);
        setSelectedItem(selectedRowData);
    }

    function getListDisplay(list){

        const columns = [
            { field: 'name', headerName: 'Item', flex:1 },
            { field: 'quantity', headerName: 'Quantity', type: 'number', 
                width: 100,
                cellClassName: (params) => {
                    if (params.value == null) {
                      return '';
                    }
                    return clsx('data-cell',{
                      "color-red": params.value <= 0,
                      "color-green": params.value > 0,
                    });
                  },
            },
            { field : 'actions',  type: 'actions',width: 40,
                getActions: (row) => [
                  <GridActionsCellItem
                    icon={<Delete />}
                    label="Delete"
                    showInMenu
                    onClick={deleteItem(row)}
                  />,
                  <GridActionsCellItem
                    icon={<Edit />}
                    label="Edit"
                    onClick={editItem(row)}
                    showInMenu
                  />,
                ]
            }
        ]

        return (
            <div>
                <div className={styles.listHeadingContainer}>
                    <Button variant="outlined" startIcon={<AddCircleOutline />}>Add Item</Button>
                </div>
                <div style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
                    <DataGrid rows={list} columns={columns} disableColumnResize={true} 
                    rowSelectionModel={selectedItem ? [selectedItem.id] : []}
                    onRowSelectionModelChange={handleRowSelection}/>
                </div>
            </div>
        )
    }

    function getItemDisplay(selected){
        if(!selected){
            return null;
        }



       
        return(
            <div className={'layout-horizontal justified '+styles.itemPanel}>
                <div className='layout-vertical gap-8'> 
                    <label className={styles.itemName}>{selected.name}</label>
                    <label>SALE PRICE : <span className='color-green'>{currencyFormatter(selected.price.sale)}</span> </label>
                    <label>PURCHASE PRICE : <span className='color-green'>{currencyFormatter(selected.price.purchase)}</span> </label>
                </div>
                <div className='layout-vertical gap-8'>
                    <Button color="primary" variant="contained" >Edit Item</Button>
                    <label>STOCK QUANTITY : <span>{selected.quantity}</span> </label>
                    <label>STOCK VALUE : <span className='color-green'>{currencyFormatter(selected.price.sale * selected.quantity)}</span> </label>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.listContainer}>
                {getListDisplay(itemsList)}
            </div>
            <div className={styles.itemContainer}>
                {getItemDisplay(selectedItem)}
            </div>
            <div className={styles.transactionsContainer}></div>
        </div>
    )
}

export default ItemsPage;