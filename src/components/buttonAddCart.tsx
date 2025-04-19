'use client'

import { useCart } from '@/context/CartContext'
import { toast } from "sonner"
 
type AddToCartButtonProps = {
  id: string
  name: string
  price: number
  priceId: string
  imageUrl: string
}

export default function AddToCartButton({ id, name, price, priceId, imageUrl }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  if(!price) return

  const handleAdd = () => {
    addToCart({
      id,
      name,
      price,
      priceId,
      quantity: 1,
      imageUrl
    })
    toast.success(`Produto ${name} adicionado ao carrinho!`)
  }

  return (
    <button
      onClick={handleAdd}
    >
      Adicionar ao carrinho
    </button>
  )
}