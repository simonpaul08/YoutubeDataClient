import { createContext, useContext, useEffect, useState } from "react";

const dataContext = createContext();

export const useDataContext = () => {
    return useContext(dataContext);
}

const DataContextProvider = ({ children }) =>  {

    const [data, setData] = useState(null);
    const [isResults, setIsResults] = useState(null);
    let path = window.location.pathname;




    useEffect(() => {
        if(path === "/results"){
            setIsResults(true);
        }else {
            setIsResults(false);
        }
    }, [path])

    useEffect(() => {
        let data = JSON.parse(window.localStorage.getItem('youtubeData'));
        if(data){
            setData(data);
        }
    }, [])


    let value = {
        data, setData,
        isResults, setIsResults
    }
 
    return (
        <dataContext.Provider value={value}>
            { children }
        </dataContext.Provider>
    )
}

export default DataContextProvider;