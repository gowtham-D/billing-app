import { useState } from 'react';
import styles from './TaxPage.module.css';
import Icon from "../../Components/Icon/Icon";
import { Button, Dialog, DialogContent, DialogTitle, ListItemText, List, ListItem, TextField, MenuItem } from '@mui/material';
import * as yup from 'yup';

import CustomFormik from '../../Components/CustomFormik/CustomFormik';

const TAX_NAMES = [ "GST" , "SGST" , "CGST"];

const taxValidationSchema = yup.object({
    name : yup.string().required(),
    rate : yup.number().required("Rate is required").max(100,"Rate must be between 0 and 100").min(0,"Rate must be between 0 and 100"),
});

const taxGroupValidationSchema = yup.object({
    rate : yup.number().required("Rate is required").max(100,"Rate must be between 0 and 100").min(0,"Rate must be between 0 and 100"),
});

function TaxEditorDialog(props){

    let {
        open,
        tax,
        saveTax,
        handleClose
    } = props;

    if(!open){
        return null;
    }

    let isEditMode = Boolean(tax.id);

    return(
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
            <DialogTitle id="alert-dialog-title">{isEditMode ? "Edit Tax" : "Add Tax"}</DialogTitle>
            <DialogContent>
                <CustomFormik onSubmit={saveTax} initialValues={tax} validationSchema={taxValidationSchema} className="column-2 margin-top20 gap-8">
                    <TextField fieldid="name" label="Name" select>
                        {TAX_NAMES.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                    </TextField>
                    <TextField fieldid="rate" label="Rate" type="number"/>
                    <div className='button-footer-container full-width margin-top8' >
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button color="primary" variant="contained" type="submit">Submit</Button>
                    </div>
                </CustomFormik>
            </DialogContent>
        </Dialog>
    )
}

function TaxGroupEditorDialog(props){

    let {
        open,
        tax,
        saveTax,
        handleClose
    } = props;

    if(!open){
        return null;
    }

    let isEditMode = Boolean(tax.id);

    return(
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xs">
            <DialogTitle id="alert-dialog-title">{isEditMode ? "Edit Tax Group" : "Add Tax Group"}</DialogTitle>
            <DialogContent>
                <CustomFormik onSubmit={saveTax} initialValues={tax} validationSchema={taxGroupValidationSchema} className="margin-top16 gap-8">
                    <TextField fieldid="rate" label="Rate" type="number"/>
                    <div className='button-footer-container full-width margin-top8' >
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button color="primary" variant="contained" type="submit">Submit</Button>
                    </div>
                </CustomFormik>
            </DialogContent>
        </Dialog>
    )
}

function TaxPage() {

    let [taxList, setTaxList] = useState([
        { id: "1", name: "GST", rate: 10 },
        { id: "2", name: "CGST", rate: 8 },
        { id: "3", name: "SGST", rate: 5 }
    ]);
    
    let [taxGroupList, setTaxGroupList] = useState([
        { id: "1", rate: 0},
        { id: "2", rate: 0.25},
        { id: "3", rate: 3},
        { id: "4", rate: 5},
        { id: "5", rate: 12},
        { id: "6", rate: 18},
        { id: "7", rate: 28},
    ]);

    let [taxEditorConf, setTaxEditorConf] = useState({ open : false , instance : {}}); //taxEditorConf
    let [taxGroupEditorConf, setTaxGroupEditorConf] = useState({open : false , instance : {}});

    function _setTaxList(list){
        setTaxList(list);
    }

    function _setTaxGroupList(list){
        setTaxGroupList(list);
    }

    function openEditor(type,instance){
        if(type === "tax"){
            instance = instance || { name : "GST" , rate : 0};
            setTaxEditorConf({open : true , instance});
        }else{
            instance = instance || { rate : 0};
            setTaxGroupEditorConf({open : true , instance});
        }
    }

    function handleSaveTax(tax){

        let existing = taxList.find(t => {
            return t.name === tax.name && t.rate === tax.rate
        });

        if(existing){
            return window.app.showAlert("error", "Tax already exists");
        }

        let clone = [...taxList];
        let msg;
        if(tax.id){
            let index = taxList.findIndex(t => t.id === tax.id);
            clone[index] = tax;
            msg = "Tax Rate updated successfully";
        }else{
            tax.id = window.generateUUID();
            clone.push(tax);
            msg = "Tax Rate added successfully";
        }
        setTaxEditorConf({open : false , instance : {}});
        window.app.showAlert("success",msg);
        _setTaxList(clone);
    }

    function handleSaveTaxGroup(taxGroup){

        let existing = taxGroupList.find(t => t.rate === taxGroup.rate);

        if(existing){
            return window.app.showAlert("error", "Tax Group already exists");
        }

        let clone = [...taxGroupList];
        let msg;
        if(taxGroup.id){
            let index = taxGroupList.findIndex(t => t.id === taxGroup.id);
            clone[index] = taxGroup;
            msg = "Tax Group updated successfully";
        }else{
            taxGroup.id = window.generateUUID();
            clone.push(taxGroup);
            msg = "Tax Group added successfully";
        }
        setTaxGroupEditorConf({open : false , instance : {}});
        window.app.showAlert("success",msg);
        _setTaxGroupList(clone);
    }

    function handleDelete(type,instance){
        let message;
        if(type === "tax"){
            message = `Confirm deleting tax ${instance.name} @ ${instance.rate}% ?`;
        }else{
            message = `Confirm deleting tax group GST ${instance.rate}% ?`;
        }

        let config = {
            message,
            okLabel : "Delete",
            okCallback : () => {
                let list,setter,msg;
                if(type === "tax"){
                    list = taxList;
                    setter = _setTaxList;
                    msg = "Tax deleted successfully";
                }else{
                    list = taxGroupList;
                    setter = _setTaxGroupList;
                    msg = "Tax Group deleted successfully";
                }

                let clone = [...list];
                let index = list.findIndex(t => t.id === instance.id);
                clone.splice(index,1);
                setter(clone);
                window.app.showAlert("success",msg);
            }
        };
        window.app.showAlert("confirm",config);
    }

    function getListSection(type,list){

        let title,labelGetter,subLabelGetter;
        if(type === "tax"){
            title = "Tax Rates";
            labelGetter = item => `${item.name}@${item.rate}%`;
        }else{
            title = "Tax Groups";
            labelGetter = item => `GST ${item.rate}%`;
            subLabelGetter = item => {
                let split = item.rate/2;
                return (<div className={styles.splitTaxRates}>
                    <label>SGST@{split}%</label>
                    <label>CGST@{split}%</label>
                </div>)
            };
        }

        return (
            <div className="flex">
                <div className={styles.listHeader + ' layout-horizontal center padding-8'}>
                    <h3 className='h3'>{title}</h3>
                    <Icon icon={'add'} onTap={() => openEditor(type)}></Icon>
                </div>
                <List className={styles.listBody}>
                    {
                        list.map((item) => {
                            let label = labelGetter(item);
                            let subLabel = subLabelGetter ? subLabelGetter(item) : null;
                            let secondaryAction = (
                                <div className='layout-horizontal'>
                                    <Icon icon={'edit'} onTap={() => openEditor(type,item)}></Icon>
                                    <Icon icon={'delete'} onTap={() => handleDelete(type,item)}></Icon>
                                </div>
                            );
                            return (
                                <ListItem className={styles.listItem} key={item.id} secondaryAction={secondaryAction}>
                                    <ListItemText primary={label} secondary={subLabel}/>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        )
    }

    return (
        <div>
            <TaxEditorDialog open={taxEditorConf.open} tax={taxEditorConf.instance} saveTax={handleSaveTax} handleClose={() => setTaxEditorConf({open:false})} ></TaxEditorDialog>
            <TaxGroupEditorDialog open={taxGroupEditorConf.open} tax={taxGroupEditorConf.instance} saveTax={handleSaveTaxGroup} handleClose={() => setTaxGroupEditorConf({open:false})} ></TaxGroupEditorDialog>

            <div className={styles.mainPanel +' layout-horizontal'}>
                {getListSection("tax",taxList)}
                {getListSection("taxGroup",taxGroupList)}
            </div>
        </div>
    )
}

export default TaxPage;