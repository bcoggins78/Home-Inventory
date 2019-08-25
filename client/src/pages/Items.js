import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Items.css'

class ItemsPage extends Component {

    state = {
        modal: false
    };

    startCreateItemHandler = () => {
        this.setState({modal: true});
    }

    modalConfirmHandler = () => {};

    modalCancelHandler = () => {
        this.setState({modal: false});
    }

    render() {
        return (
            <React.Fragment>
                {this.state.modal && <Backdrop />}
                {this.state.modal && <Modal title="Add Item" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
                    <p>Modal Content</p>
                </Modal>}
                <div className="items-control">
                    <p>Add Items!</p>
                    <button className="btn" onClick={this.startCreateItemHandler}>Add Item</button>
                </div>
            </React.Fragment>
        )
    }
}

export default ItemsPage;