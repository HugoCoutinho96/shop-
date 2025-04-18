'use client'

import axios from "axios"

export default function ButtonBuyProduct({price}: {price: {id: string}}){
    async function handlerBuyProduct(){
        try{
            const response = await axios.post('/api', {
                items: [
                    {
                        priceId: price.id,
                        quantity: 1
                    }
                ]
            })

            const {checkoutUrl} = response.data

            window.location.href = checkoutUrl
        }catch(err){
            alert(`Falha ao redirecionar ao checkout! | error: ${err}`)
        }
    }

    return(
        <button onClick={handlerBuyProduct}>
            Comprar Agora
        </button>
    )
}