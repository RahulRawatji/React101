import {createContext, useState} from 'react';

const UserProgressContext = createContext({
    progress:'',
    showCart:()=>{},
    hideCart:()=>{},
    showCheckout:()=>{},
    hideCheckout:()=>{}
})

export function UserProgressContextProvider({children}){
    const [userProgress, setUserProgress] = useState('');

    function hideCart(){
        setUserProgress('')
    }
    function showCart(){
        setUserProgress('cart')
    }

    function showCheckout(){

    }

    function hideCheckout(){

    }

    const userProgressValue = {
        progress:userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return <UserProgressContext.Provider value={userProgressValue}>
        {children}
    </UserProgressContext.Provider>
} 

export default UserProgressContext;