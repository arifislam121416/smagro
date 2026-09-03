import { CartProvider } from "@/context/CartContext";
import "./globals.css";




export const metadata = {
  title: "SMAGRO | Livestock & Poultry Products",
  description:
    "Quality livestock, poultry and agricultural products from SMAGRO.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
