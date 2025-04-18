'use client'

import axios from "axios"

interface BuyProductCartProps{
    items: {
        priceId: string
        quantity: number 
    }[],
    fromCart?: string
}

export default function ButtonBuyProductCart({items}: BuyProductCartProps){
    async function handlerBuyProduct(){
        try{
            const response = await axios.post('/api', {
                items,
                fromCart: 'true'
            })

            const {checkoutUrl} = response.data

            window.location.href = checkoutUrl
        }catch(err){
            alert(`Falha ao redirecionar ao checkout! | error: ${err}`)
        }
    }

    return(
        <button onClick={handlerBuyProduct} className="buttons-modal-finished">
            Finalizar Compra
        </button>
    )
}