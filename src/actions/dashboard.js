const BACKEND = 'https://api.openweathermap.org/data/2.5';

export const getCityWeather = name => async dispatch => {
    dispatch({type: 'SET_READY', payload: false});
    dispatch({type: 'SET_ERROR', payload: undefined});

    const path = `${BACKEND}/weather`;
    const params = {
        q: name,
        units: 'metric',
        APPID: '7dcbcf6342c63fa38c95caa5c011337c'
    };
    const url = getUrl(path, params);

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            const payload = getWidgetData(data);
            dispatch({type: 'SET_SEARCH_QUERY', payload: ''});
            dispatch({type: 'ADD_WIDGET', payload});
        } else {
            throw data;
        }
    } catch(e) {
        dispatch({type: 'SET_ERROR', payload: e.message});
    }
    finally {
        dispatch({type: 'SET_READY', payload: true});
    }
};

export const getWidgets = cityIds => async dispatch => {
    dispatch({type: 'SET_READY', payload: false});
    dispatch({type: 'SET_ERROR', payload: undefined});

    const path = `${BACKEND}/group`;
    const params = {
        id: cityIds.join(','),
        units: 'metric',
        APPID: '7dcbcf6342c63fa38c95caa5c011337c'
    };
    const url = getUrl(path, params);

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            const payload = data.list.map(widget => getWidgetData(widget));
            dispatch({type: 'INIT_WIDGETS', payload});
        } else
            throw data;
    } catch(e) {
        dispatch({type: 'SET_ERROR', payload: e.message});
    }
    finally {
        dispatch({type: 'SET_READY', payload: true});
    }
};

function getWidgetData({id, name, main: {temp}, weather}) {
    return {
        id,
        name,
        temp,
        image: weather[0] ? `http://openweathermap.org/img/w/${weather[0].icon}.png` : '',
        alt: weather[0] ? weather[0].main : 'No data'
    };
}

function getUrl (path, params) {
    const url = new URL(path);
    url.search = new URLSearchParams(params);
    return url;
}
