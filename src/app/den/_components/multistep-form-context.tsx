'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Warband = {
	// id: string | null
	name?: string
	pennies?: number
  allegience?: string
  den?: string
}

export interface WarbandContextProps {
	warband: Warband
	updateWarbandData: (property: Partial<Warband>) => void
}

const WarbandBuilderContext = createContext<WarbandContextProps>({
  warband: {} as Warband,
	// updatePropertyForm: () => null,
});

export function WarbandBuilderContextProvider({ children }){
    const [warband, setWarband] = useState<Warband | null>(null)

    const updateWarbandData = (values: Partial<Warband>) => {
      setWarband({ ...warband, ...values })
     }

    return (
      <WarbandBuilderContext.Provider value={{ warband, updateWarbandData }}>
       {children}
      </WarbandBuilderContext.Provider>
    )
}

export const useWarbandBuilderContext = () => {
  const context = useContext(WarbandBuilderContext)
  if (!context) {
    throw new Error('useWarbandBuilderContext must be used within a WarbandBuilderContextProvider')
  }

  return context
}


// const WarbandContext = createContext();

// // "This will allow you to update the state within the context whenever you need to."
// export interface UserContextProps {
// 	propertyForm: User | null
// 	updatePropertyForm: (property: Partial<User>) => void
// }

// export const NewPropertyFormContext = createContext<UserContextProps | null>({
// 	user: null,
// 	updatePropertyForm: () => null,
// })


// // const NewUserFormContext = createContext();

// export function UserFormContextProvider({ children }) {
//     const [user, setUser] = useState<User | null>(null)
   
//     const updateUserData = (values: Partial<User>) => {
//      setUser({ ...user, ...values })
//     }
   
//    // adding this code 👇🏽
//     return (
//      <NewPropertyFormContext.Provider value={{ user, updateUserData }}>
//       {children}
//      </NewPropertyFormContext>
//     )
// }

//    export const useNewUserFormContext = () => {
//     const context = useContext(NewPropertyFormContext)
//     if (!context) {
//       throw new Error('useNewPropertyFormContext must be used within a NewUserFormContextProvider')
//     }
  
//     return context
//   }