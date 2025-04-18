import ClearCart from "@/components/clearCart";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

interface SuccessProps {
  searchParams: Promise<{
    session_id?: string;
    clearCart?: string
  }>;
}

export default async function Success({ searchParams }: SuccessProps) {
  const params = await searchParams
  const sessionId = params.session_id;
  const clear_Cart = params.clearCart
  
  if (!sessionId) {
    redirect("/");
  }
  
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;

  function capitalizeWords(text: string) {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const products = session.line_items?.data.map((lineItem) => {
    const product = lineItem.price?.product as Stripe.Product;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
    };
  }) || [];

  const productLength = products.length
  return (
    <main className="success-container">
      {clear_Cart && <ClearCart/>}
      <h1>Compra efetuada com sucesso!</h1>

      <div className="success-image-container">
        {products.map((product) => (
          <div key={product.id}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={120}
              height={110}
            />
            {productLength > 1 && <strong>{product.name}</strong>}
          </div>
        ))}
      </div>

      <p>
        Uhuul <strong>{!customerName ? null : capitalizeWords(customerName)}</strong>,  
        <strong>
            {products.length === 1 ? ` seu produto: ${products[0].name} já está a caminho da sua casa.` : 
            ` seus ${products.length} produtos já estão a caminho da sua casa.`}
        </strong> 
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </main>
  );
}