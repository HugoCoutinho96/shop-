'use client'

import { useCart } from '@/context/CartContext'
import { TrashSimple } from 'phosphor-react'
import { useState } from 'react'

export default function QuantityInput({
  initial = 1,
  itemId
}: {
  initial?: number
  itemId: string
}) {
  const {updateProductQuantity, removeProduct} = useCart() 
  const [quantity, setQuantity] = useState(initial)

  const handleIncrement = () => {
      const newValue = quantity + 1
      setQuantity(newValue)
      updateProductQuantity(itemId, newValue)
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      const newValue = quantity - 1
      updateProductQuantity(itemId, newValue)
      setQuantity(newValue)
    }
  }

  const handleRemove = () => {
    removeProduct(itemId)
  }

  return (
    <div className='quantity-container' role="group" aria-label="Quantidade">
      {quantity <= 1 ? 
        <button className='quantity-button-remove' aria-label="Remover produto do carrinho" onClick={handleRemove}><TrashSimple size={18} style={{ verticalAlign: "middle"}}/></button>
        : <button className='quantity-button' aria-label="Diminuir quantidade" onClick={handleDecrement}>−</button>
      }  
      <span className='quantity-value'>{quantity}</span>
      <button className='quantity-button' aria-label="Aumentar quantidade" onClick={handleIncrement}>+</button>
    </div>
  )
}