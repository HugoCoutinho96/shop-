import Image from "next/image";

import "keen-slider/keen-slider.min.css"
import { stripe } from "@/lib/stripe";
import Slider from "@/components/slider";
import Stripe from "stripe";
import Link from "next/link";
import AddToCartButton from "@/components/buttonAddCart";



export default async function Home() {

  const resolve = await stripe.products.list({
    expand: ["data.default_price"],
    active: true
  })

  const products = resolve.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      priceDefault: price,
      price: new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
    }
  })

  return (
    <Slider>
      {products.map(product => {
        return(
          <div key={product.id} className="keen-slider__slide products-container">
            <Link href={`/product/${product.id}`}>
                <div className="product">
                  <Image src={product.imageUrl} width={520} height={480} alt=""/> 
    
                  <footer>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </footer>
                </div>

              </Link>

              <div className="buttons-product">
                {product.priceDefault.unit_amount !== null && 
                <AddToCartButton id={product.id} name={product.name} price={product.priceDefault.unit_amount} priceId={product.priceDefault.id} imageUrl={product.imageUrl}/> }
              </div>
          </div>
            
        )
      })}
    </Slider>
  );
}

export const revalidate = 7200;