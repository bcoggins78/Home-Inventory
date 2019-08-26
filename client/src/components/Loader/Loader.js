import React from 'react';

import './Loader.css';

const loader = () =>
    <div className = "loader">
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>;

export default loader;