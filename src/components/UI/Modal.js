import classes from './Modal.module.css'
import { Fragment } from 'react'
import ReactDom from 'react-dom'

const Backdrop = (props) => {
    // onClose handler pass it to onClick build in here 
    return <div className={classes.backdrop} onClick={props.onClose} />
}

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>

}
// the id is get it from index.html file
const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return <Fragment>
        {/* the second variable is where to portal, the first variable is which to portal */}
        {/* pass down the onClose handler here to Backdrop */}
        {ReactDom.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
}

export default Modal;