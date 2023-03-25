import React from 'react'
import './tooltip.scss'

export const CustomTooltip = ({ active, payload, label }) => {
    return (active && payload && payload.length) ?
        (
            <div className="custom-tooltip">
                <div className="date">{label.toLocaleString()}</div>
                <div className="info">
                    <div className="humidtips">
                        <img src="https://cdn-icons-png.flaticon.com/512/728/728093.png" />
                        <h2>{Math.round(payload[0]['value'] * 100) / 100}%</h2>
                    </div>
                    <div className="temptips">
                        <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3407026/high-temperature-icon-md.png" />
                        <h2>{Math.round(payload[1]['value'] * 100) / 100}°C</h2>
                    </div>
                </div>
            </div>
        )
        : null
}
