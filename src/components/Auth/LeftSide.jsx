import React from 'react';
import './LeftSide.css';
import MessageImage from '../../images/3156814.jpg';

class LeftSide extends React.Component {
    render() {
        return (
            <div className="left_side">
                <img src={MessageImage} alt="msg" />
                <div className="left_side_text">
                </div>
            </div>
        )
    }
}

export default LeftSide; 