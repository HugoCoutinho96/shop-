import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.json()
  const { items, fromCart } = body

  if (!items || !Array.isArray(items) || items.length === 0) {
    return new Response(JSON.stringify({ error: "Carrinho vazio ou inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const successUrl = `${process.env.NEXT_APP}/product/success?session_id={CHECKOUT_SESSION_ID}${fromCart ? '&clearCart='+fromCart : ''}`
  const cancelUrl = `${process.env.NEXT_APP}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: items.map((item: { priceId: string, quantity: number }) => ({
      price: item.priceId,
      quantity: item.quantity,
    })),
  })

  return new Response(JSON.stringify({ checkoutUrl: checkoutSession.url }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  })
}