import { useFormik } from "formik";
import { cloneElement } from "react";


function CustomFormik({ children, ...props }) {

    const formik = useFormik({ ...props });

    let changedChildren = children.map(child => {
        let fieldid = child.props.fieldid;

        if(fieldid){
            return cloneElement(child,{
                id : fieldid,
                name : fieldid,
                value : formik.values[fieldid],
                onChange : formik.handleChange,
                onBlur : formik.handleBlur,
                error : formik.touched[fieldid] && Boolean(formik.errors[fieldid]),
                helperText : formik.touched[fieldid] && formik.errors[fieldid]
            });
        }else{
            return child;
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className={props.className}>
            {changedChildren}
        </form>
    )
}

export default CustomFormik;