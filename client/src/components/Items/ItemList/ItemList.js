import React from 'react';

import InventoryItem from './InventoryItem/InventoryItem';
import './ItemList.css';

const itemList = props => {
    const items = props.items.map(item => {
        return (
                <InventoryItem
                    key={item._id}
                    itemId={item._id}
                    name={item.name}
                    serial={item.serial}
                    model={item.model}
                    description={item.description}
                    estValue={item.estValue}
                    image={item.image ? item.image : "https://dummyimage.com/600x400/fff/000&text=No+Image"}
                    comment={item.comment}
                    userId={props.authUserId}
                    creatorId={item.creator._id}
                    onDetail={props.onViewDetail}
                    onDelete={props.onItemDelete}
                />
        );
    });
    return (
        <ul className="item-list">
            {items}
        </ul>
    );
};

export default itemList;