'use client'

import { useCart } from '@/context/CartContext'

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
  }

  return (
    <button
      onClick={handleAdd}
    >
      Adicionar ao carrinho
    </button>
  )
}