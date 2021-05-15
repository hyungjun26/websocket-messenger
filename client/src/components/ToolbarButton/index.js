import React from 'react';
import './ToolbarButton.css';

export default function ToolbarButton(props) {
    const { icon, action } = props;
    return (
      <i onClick={action} className={`toolbar-button ${icon}`} />
    );
}