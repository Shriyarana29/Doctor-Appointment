import { createContext, useEffect, useState } from "react";  
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "$"; 
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Holds the list of doctors fetched from the backend.
    const [doctors, setDoctors] = useState([]); 

    // Stores the logged-in user’s JWT token. Initially checks localStorage for a saved token; if found, uses it, else false
    const [token, setToken] =useState(localStorage.getItem('token') ? localStorage.getItem('token') : false );
    
    // Holds the current logged-in user’s profile data. Initially false (no data until fetched).
    const [userData, setUserData] = useState(false);

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors); // stores the list of doctors from the backend into the React state variable doctors. Once updated, any component using doctors from context will automatically re-render and display the new doctor list.
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const loadUserProfileData = async () => {
        try {

            const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}});
            if(data.success){
                setUserData(data.userData);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }

     const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token,setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    };

    useEffect(() => {
        getDoctorsData();
    }, []);
    
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
        else{
            setUserData(false);
        }
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;