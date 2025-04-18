'use client'

import { useCart } from "@/context/CartContext"
import { ShoppingCartSimple } from "phosphor-react"
import { forwardRef } from "react"

const ButtonCartComponent = forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  (props, ref) => {
    const { cart } = useCart()
    const quantity: number = cart.reduce((total, item) => total + item.quantity, 0)

    return (
      <button className="button-cart-style" ref={ref} {...props}>
        <ShoppingCartSimple size={32} />
        {quantity > 0 ?
          <span>{quantity}</span> : null
        }
      </button>
    )
  }
)

ButtonCartComponent.displayName = 'ButtonCartComponent'
export default ButtonCartComponent