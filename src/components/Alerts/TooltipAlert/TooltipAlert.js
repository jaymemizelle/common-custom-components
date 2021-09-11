import React from 'react';
import "./TooltipAlert.css";

export default function TooltipAlert({ open, children }) {
    if (!open) return null;
    return (
        <span className="tooltipAlert">
            {children}
        </span>
    )
}