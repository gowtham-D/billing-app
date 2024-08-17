import React from 'react';
import Icon from '../Icon/Icon';
import styles from './NotificationHandler.module.css';
import { Button, Dialog, DialogContent, DialogTitle, Typography, DialogActions } from '@mui/material';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TYPE_CONFIG = {
    "success" : {
        icon : "success",
        className : styles.success,
        title : "Success"
    },
    "error" : {
        icon : "error",
        className : styles.error,
        title : "Error"
    },
    "warning" : {
        icon : "warning",
        className : styles.warning,
        title : "Warning"
    },
    "confirm":{
        icon : "info",
        className : styles.confirm,
        title : "Confirm"
    }
}


function NotificationHandler(props) {

    let {
        open,
        type,
        message,
        okCallback,
        cancelCallback,
        okLabel,
        cancelLabel
    } = props.config;

    if(["success", "error", "warning","confirm"].indexOf(type) === -1) {
        return null;
    }

    let config = TYPE_CONFIG[type];

    okLabel = okLabel || "Ok";
    cancelLabel = cancelLabel || "Cancel";


    let _okCallback = () => {
        props.onClose();
        if(typeof okCallback === "function") {
            okCallback();
        }
    }

    let _cancelCallback = () => {
        props.onClose();
        if(typeof cancelCallback === "function") {
            cancelCallback();
        }
    }

    return (
        <Dialog open={open} className={config.className + ' ' + styles.dialog} fullWidth={true} TransitionComponent={Transition} maxWidth='sm'>
            <DialogTitle className={styles.dialogTitle+ ' layout-horizontal center gap-8'}>
                <Icon icon={config.icon} className={styles.titleIcon} /> 
                <label className={styles.title}>{config.title}</label>
            </DialogTitle>
            <DialogContent>
                <Typography className={styles.dialogMessage}>{message}</Typography>
            </DialogContent>
            <DialogActions className={'button-footer-container '+ styles.dialogFooter}>
                <Button variant='outlined' onClick={_cancelCallback}>{cancelLabel}</Button>
                <Button variant='contained' color='primary' onClick={_okCallback}>{okLabel}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NotificationHandler;