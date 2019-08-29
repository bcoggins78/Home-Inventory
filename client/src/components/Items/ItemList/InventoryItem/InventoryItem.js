import React from 'react';

import './InventoryItem.css';

const item = props => (
    <li key={props.itemId} className="items-list-item">
        <div className="image-container">
            <a href={props.image} target="_blank" rel="noopener noreferrer"><img className="item-image" src={props.image} alt={props.name} /></a>
        </div>
        <div>
            <h1>{props.name}</h1>
            <p>Estimated Value: ${props.estValue}</p>
        </div>
        <div>
            <button className='btn' onClick={props.onDetail.bind(this, props.itemId)}>View Details</button>
            <button className='red-btn' onClick={props.onDelete.bind(this, props.itemId)}>Delete</button>
        </div>
        
           
        
    </li>
);

export default item;