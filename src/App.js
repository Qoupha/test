import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios'
import UserData from './components/UserData'
import OnLoadingUserData from './components/OnLoadingUserData'

function App() {
    const DataLoading = OnLoadingUserData(UserData);
    const [appState, setAppState] = useState(
        {
            isLoading: true,
            persons: null,
        }
    )

    useEffect(() => {
        axios.get('https://sowatrends.ru/trades/crypto')
            .then(({data}) => {
                setAppState({
                    isLoading: false,
                    persons: data
                });
            });
    }, []);


    return (
        <div className="app">
            <DataLoading {...appState} />
        </div>
    );
}


export default App;

