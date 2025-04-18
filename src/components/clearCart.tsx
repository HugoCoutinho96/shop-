'use client'
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function ClearCart(){
    const { clearCart } = useCart()

    useEffect(() => {
        clearCart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return null
}