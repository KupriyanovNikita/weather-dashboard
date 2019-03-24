import React from 'react';

export default function Dashboard({widgets, deleteWidget}) {
    const dashboardWidgets = widgets.map((widget, index) =>
        <li key={index} className='weather'>
            <h3>{widget.name}</h3>
            <div>{widget.temp} ℃</div>
            <img src={widget.image} alt={widget.alt}/>
            <div className='weather__delete' onClick={() => deleteWidget(widget)}>
                Delete
            </div>
        </li>
    );

    return (
        <div className='dashboard'>
            <ul className='dashboard_list'>
                {dashboardWidgets}
            </ul>
        </div>
    );
}
