import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import ItemList from '../components/Items/ItemList/ItemList';
import Loader from '../components/Loader/Loader';
import './Items.css'
import authContext from '../context/auth-context';

class ItemsPage extends Component {

    state = {
        modal: false,
        items: [],
        isLoading: false,
        selectedItem: null
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
        this.setState({ modal: true });
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
        console.log("Item: " + JSON.stringify(item));

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
                        }
                    }
                `
        };
        
        const token = this.context.token;

        fetch('/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                console.log("mutation: " + JSON.stringify(res));
                return res.json();
            })
            .then(resData => {
                this.setState(prevState => {
                    const updatedItems = [...prevState.items];
                    updatedItems.push({
                        _id: resData.data.createItem._id,
                        name: resData.data.createItem.name,
                        serial: resData.data.createItem.serial,
                        model: resData.data.createItem.model,
                        description: resData.data.createItem.description,
                        estValue: resData.data.createItem.estValue,
                        image: resData.data.createItem.image,
                        comment: resData.data.createItem.comment,
                        creator: {
                            _id: this.context.userId
                        }
                    });
                    return { items: updatedItems };
                })
            })
            .catch(err => {
                console.log(err);
            });
    };

    modalCancelHandler = () => {
        this.setState({ modal: false, selectedItem: null });
    }

    renderItems() {
        this.setState({ isLoading: true });
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
                    }
                `
        };

        const token = this.context.token;

        fetch('/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                console.log("query: " + requestBody);
                return res.json();
            })
            .then(resData => {
                console.log("resData: " + resData.data);
                const items = resData.data.items;
                this.setState({ items: items, isLoading: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false });
            });
    }

    showDetailHandler = itemId => {
        this.setState(prevState => {
            const selectedItem = prevState.items.find(e => e._id === itemId);
            return { selectedItem: selectedItem };
        })
    }

    render() {

        return (
            <React.Fragment>
                {(this.state.modal || this.state.selectedItem) && <Backdrop />}
                {this.state.modal && (
                    <Modal
                        title="Add Item"
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.modalConfirmHandler}
                        confirmText='Add Item'
                    >
                        <form>
                            <div className="form-input">
                                <label htmlFor="item">Item Name</label>
                                <input type="text" id="item" ref={this.nameElRef}></input>
                            </div>
                            <div className="form-input">
                                <label htmlFor="serial">Serial Number</label>
                                <input type="text" id="serial" ref={this.serialElRef}></input>
                            </div>
                            <div className="form-input">
                                <label htmlFor="model">Model Number</label>
                                <input type="text" id="model" ref={this.modelElRef}></input>
                            </div>
                            <div className="form-input">
                                <label htmlFor="estValue">Estimated Value</label>
                                <input type="number" id="value" ref={this.estValueElRef}></input>
                            </div>
                            <div className="form-input">
                                <label htmlFor="name">Image</label>
                                <input type="text" id="image" ref={this.imageElRef}></input>
                            </div>
                            <div className="form-input">
                                <label htmlFor="description">Description</label>
                                <input type="text" id="description" ref={this.descriptionElRef}></input>
                            </div>
                            <div className="form-input">
                                <label htmlFor="comment">Comment</label>
                                <textarea id="comment" rows="3" ref={this.commentElRef}></textarea>
                            </div>

                        </form>
                    </Modal>
                )}
                {this.state.selectedItem && (
                    <Modal
                        title={this.state.selectedItem.name}
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        // onConfirm={this.modalConfirmHandler}
                        
                    >
                        <div className="modal-cell">
                        <h3>Serial Number</h3>
                        <p>{this.state.selectedItem.serial}</p>
                        </div>
                        <div className="modal-cell">
                        <h3>Model Number</h3>
                        <p>{this.state.selectedItem.model}</p>
                        </div>
                        <div className="modal-cell">
                        <h3>Estimated Value</h3>
                        <p>${this.state.selectedItem.estValue}</p>
                        </div>
                        <div className="modal-cell">
                        <h3>Description</h3>
                        <p>{this.state.selectedItem.description}</p>
                        </div>
                        <div className="modal-cell">
                        <h3>Comments</h3>
                        <p>{this.state.selectedItem.comment}</p>
                        </div>
                        

                    </Modal>
                )}
                <div className="items-control">
                    <button className="btn" onClick={this.startCreateItemHandler}>Add Item</button>
                </div>

                {this.state.isLoading ? (
                    <Loader />
                ) : (
                        <ItemList
                            items={this.state.items}
                            authUserId={this.context.userId}
                            onViewDetail={this.showDetailHandler}
                        />
                    )}

            </React.Fragment>
        )
    }
}

export default ItemsPage;