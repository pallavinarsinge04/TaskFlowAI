import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const ThemeContext =
createContext();

export function ThemeProvider({

children

}){

const [theme,setTheme]=
useState(

localStorage.getItem("theme")
||

"dark"

);

useEffect(()=>{

document.body.dataset.theme=
theme;

localStorage.setItem(
"theme",
theme
);

},[theme]);

return(

<ThemeContext.Provider
value={{
theme,
setTheme
}}
>

{children}

</ThemeContext.Provider>

);

}

export const useTheme=()=>

useContext(ThemeContext);