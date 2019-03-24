import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dashboard from './Dashboard.js'
import Search from './Search.js'
import { getCityWeather, getWidgets } from '../actions/dashboard.js'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.setLocalStorage = this.setLocalStorage.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.setLocalStorage);
        const cityIds = JSON.parse(localStorage.getItem('cityIds'));
        if (cityIds && cityIds.length)
            this.props.getWidgets(cityIds);
    }

    setSearchQuery(inputQuery) {
        const query = inputQuery.replace(/[^0-9a-zA-Z\s]/g, '');
        this.props.setSearchQuery(query);
    }

    render() {
        const ready = !this.props.ready && <div className='progress'/>;
        const error = this.props.error && <div className='message message_error'>{this.props.error}</div>;
        const dashboardEmpty = this.props.ready && !this.props.widgets.length &&
            <div className='dashboard-placeholder'>
                Dashboard is empty
            </div>;
        const dashboard = !!this.props.widgets.length &&
            <Dashboard widgets={this.props.widgets} deleteWidget={this.props.deleteWidget}/>;

        return (
            <div className='page'>
                <Search query={this.props.searchQuery}
                        setQuery={this.setSearchQuery.bind(this)}
                        addWidget={this.props.addWidget}
                />
                {ready}
                {error}
                {dashboardEmpty}
                {dashboard}
            </div>
        );
    }

    setLocalStorage() {
        const cityIds = this.props.widgets.map(({id}) => id)
            .slice(0, 20);
        localStorage.setItem('cityIds', JSON.stringify(cityIds));
    }

    componentWillUnmount() {
        this.setLocalStorage();
        window.removeEventListener('beforeunload', this.setLocalStorage);
    }
}

export default connect(
    ({dashboard}) => ({
        widgets: dashboard.widgets,
        searchQuery: dashboard.searchQuery,
        ready: dashboard.ready,
        error: dashboard.error
    }),
    dispatch => ({
        setSearchQuery: query => dispatch({type: 'SET_SEARCH_QUERY', payload: query}),
        deleteWidget: widget => dispatch({type: 'DELETE_WIDGET', payload: widget}),
        addWidget: name => dispatch(getCityWeather(name)),
        getWidgets: cityIds => dispatch(getWidgets(cityIds))
    })
)(App);
