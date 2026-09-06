import React, {
createContext,
useContext,
useState
} from "react"

import translations from "./translations"


const LanguageContext =
createContext()


export function LanguageProvider({
children
}){


const savedLanguage =
localStorage.getItem("language")


const [language,setLanguage] =
useState(
savedLanguage || "en"
)



const changeLanguage=(lang)=>{

setLanguage(lang)

localStorage.setItem(
"language",
lang
)

}



const t=(key)=>{


return (
translations[language]?.[key]
||
translations["en"][key]
||
key
)


}



return (

<LanguageContext.Provider

value={{
language,
changeLanguage,
t
}}

>

{children}

</LanguageContext.Provider>

)


}



export function useLanguage(){

return useContext(LanguageContext)

}