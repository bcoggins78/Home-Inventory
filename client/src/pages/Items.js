import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Items.css'
import authContext from '../context/auth-context';

class ItemsPage extends Component {

    state = {
        modal: false,
        items: []
    };

    static contextType = authContext;

    constructor(props) {
        super(props);
        this.nameElRef = React.createRef();
        this.serialElRef = React.createRef();
        this.modelElRef = React.createRef();
        this.descriptionElRef = React.createRef();
        this.estValueElRef = React.createRef();
        this.imageElRef = React.createRef();
        this.commentElRef = React.createRef();
    }

    componentDidMount() {
        this.renderItems();
    }

    startCreateItemHandler = () => {
        this.setState({modal: true});
    }

    modalConfirmHandler = () => {
        this.setState({ modal: false });
        const name = this.nameElRef.current.value;
        const serial = this.serialElRef.current.value;
        const model = this.modelElRef.current.value;
        const description = this.descriptionElRef.current.value;
        const estValue = +this.estValueElRef.current.value;
        const image = this.imageElRef.current.value;
        const comment = this.commentElRef.current.value;

        if (
            name.trim().length === 0
        ) {
            return;
        }

        const item = { name, serial, model, description, estValue, image, comment };
        console.log(item);

        const requestBody = {
            query: `
                    mutation {
                        createItem(itemInput: {name: "${name}", serial: "${serial}", model: "${model}", description: "${description}", estValue: ${estValue}, image: "${image}", comment: "${comment}"}) {
                            _id
                            name
                            serial
                            model
                            description
                            estValue
                            image
                            comment
                            creator {
                                _id
                                userName
                            }
                        }
                    }`
        };

        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status !==200 && res.status !==201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                this.renderItems();
            })
            .catch(err => {
                console.log(err);
            });
    };

    modalCancelHandler = () => {
        this.setState({modal: false});
    }

    renderItems() {
        const requestBody = {
            query: `
                    query {
                        items {
                            _id
                            name
                            serial
                            model
                            description
                            estValue
                            image
                            comment
                            creator {
                                _id
                                userName
                            }
                        }
                    }`
        };

        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status !==200 && res.status !==201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
                const items = resData.data.items;
                this.setState({items: items});
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const itemList = this.state.items.map(item => {
            return (
                <li key={item._id} className="item-list-item">
                    {item.name}
                </li>
            )
        })
        return (
            <React.Fragment>
                {this.state.modal && <Backdrop />}
                {this.state.modal && <Modal title="Add Item" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
                    <form>
                        <div className="form-control">
                            <label htmlFor="item">Item Name</label>
                            <input type="text" id="item" ref={this.nameElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="serial">Serial Number</label>
                            <input type="text" id="serial" ref={this.serialElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="model">Model Number</label>
                            <input type="text" id="model" ref={this.modelElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" ref={this.descriptionElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="value">Estimated Value</label>
                            <input type="number" id="value" ref={this.estValueElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="name">Image</label>
                            <input type="text" id="image" ref={this.imageElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="comment">Comment</label>
                            <textarea id="comment" rows="3" ref={this.commentElRef}></textarea>
                        </div>
                        
                    </form>
                </Modal>}
                <div className="items-control">
                    <button className="btn" onClick={this.startCreateItemHandler}>Add Item</button>
                </div>
                <ul className="item-list">
                    {itemList}
                </ul>
            </React.Fragment>
        )
    }
}

export default ItemsPage;