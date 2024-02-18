import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    // used to add item
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

// StoreContext will then have a Provider method that can wrap around our app
// so that the values and methods can be available anywhere from our app.
export const StoreContext = createContext<StoreContextValue | undefined>(undefined)

// custom hook - useStoreContext
// when we use, useStoreContext then we can use whatever items or method is inside
// the StoreContextValue interface 
// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error('Ooops - we do not seem to be inside the provider')
    }

    return context
}

// { children }: PropsWithChildren<unknown> is the standard command for
// creating Provider
export function StoreProvider({ children }: PropsWithChildren<unknown>) {
    const [basket, setBasket] = useState<Basket | null>(null)
    function removeItem(productId: number, quantity: number) {
        if (!basket) {
            return
        }
        // spread operator creates a copy of the basket.items array and
        // saves it to the items variable and repalce that array in our state. That is
        // just the recommended way of working with arrays and objects in react states.
        const items = [...basket.items]
        const itemIndex = items.findIndex(i => i.productId === productId)
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity
            if (items[itemIndex].quantity === 0) {
                // splice removes the item in the array
                items.splice(itemIndex, 1);
            }
            // gets the previous state and replace it with the copied items array
            // was created using the spread operator.
            setBasket(prevState => {
                return { ...prevState!, items }
            })
        }
    }


    return (
        // this is how to provide value that includes the basket state as well as the
        // functions setBasket and RemoveItem. This means all of the values will be
        // available anywhere in our app
        <StoreContext.Provider
            value={{
                basket,
                setBasket,
                removeItem
            }}
        >
            {children}
        </StoreContext.Provider>
    )


}