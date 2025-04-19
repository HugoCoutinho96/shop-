'use client';

import { useCart } from '@/context/CartContext';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import ButtonCartComponent from './buttonCart';
import QuantityInput from './quantityInput';
import ButtonBuyProductCart from './buttonBuyProductCart';

export default function Modal() {

  const { cart } = useCart();
  const products = cart.map(item => (
      {
        priceId: item.priceId, 
        quantity: item.quantity
      }
  ))
  const fullPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const priceFormatted = (price:number): string => {
    return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price / 100)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ButtonCartComponent/>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <Dialog.Content
          className='animate-slide-in'
          style={{
            position: 'fixed',
            top: '0%',
            right: '0%',
            background: 'white',
            width: '300px',
            height: '100vh',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: '100vh',
            overflow: 'auto',
            padding: '20px 0',
          }}>
            <div className='px-4'>
              <Dialog.Title style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Carrinho de compras</Dialog.Title>

              {cart.length <= 0 ?
                <Dialog.Description>
                  Seu carrinho está vazio, volte para o catálogo para adicionar items.
                </Dialog.Description> :

                <Dialog.Description>
                  Aqui estão seus produtos para efetuar a compra.
                </Dialog.Description>
              }
            </div>

          <div className='flex flex-col justify-between gap-6 px-2'>
            <div className='flex flex-col gap-2 overflow-auto max-h-full flex-1'>
              {cart.map(item => {
                return (
                  <div className='cart-container' key={item.id}>
                      <Image src={item.imageUrl} alt='' width={80} height={60}/>
                      <div>
                          <h4><strong>{item.name}</strong></h4>
                          <h6>{priceFormatted(item.price)}</h6>
                          <QuantityInput itemId={item.id} initial={item.quantity}/>
                      </div>
                  </div>
              )})}
            </div>
            
          </div>
            <div className='px-4 shrink-0 mt-auto'>
              {cart.length <= 0 ? null :
                  <strong>{`Valor Total: ${priceFormatted(fullPrice)}`}</strong>
                }    

              <div className='buttons-modal-container'>
                {cart.length <= 0 ? null : 
                  <ButtonBuyProductCart items={products}/>
                }

                <Dialog.Close asChild>
                  <button className='buttons-modal-close'>Fechar</button>
                </Dialog.Close>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}