import { Roboto } from "next/font/google";
import Image from "next/image";
import logoImg from "@/assets/logo.svg"
import { CartProvider } from "@/context/CartContext";
import Modal from "@/components/cartModal";
import { Toaster } from "sonner"
import "./globals.css"

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'], 
});

export const metadata = {
  title: 'Vibe Shop',
  description: 'Compre as melhores camisetas na nossa loja online!',
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${roboto.className}`}>
        <Toaster position="top-center" richColors />
        <CartProvider>
          <div className="container-layout">
            <header className="header">
              <div>
                <Image src={logoImg} alt={"logo da loja"} priority/>
                <div>
                  <strong>Vibe</strong>
                  <span>shop</span>
                </div>
              </div>

              <Modal/>
            </header>
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
