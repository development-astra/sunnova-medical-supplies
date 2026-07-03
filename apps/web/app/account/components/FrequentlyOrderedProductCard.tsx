import { RotateCcw, ShoppingCart } from 'lucide-react';
import type { FrequentlyOrderedProduct } from '@/lib/account/mock-customer-dashboard-data';
import { formatCurrency } from '@/lib/account/mock-customer-dashboard-data';
import { ProductThumbnail } from './ProductThumbnail';

export function FrequentlyOrderedProductCard({ product }: { product: FrequentlyOrderedProduct }) {
  const buyAgain = product.action === 'Buy Again';
  return (
    <article className="pf-product">
      <ProductThumbnail alt={`${product.name}, ${product.variant}`} />
      <div style={{ flex: 1 }}>
        <p className="pf-product-name">{product.name}</p>
        <p className="pf-product-variant">{product.variant}</p>
      </div>
      <p className="pf-product-price">{formatCurrency(product.price)}</p>
      <button type="button" className={`pf-btn ${buyAgain ? 'pf-btn-accent' : 'pf-btn-primary'}`}>
        {buyAgain ? <RotateCcw size={14} /> : <ShoppingCart size={14} />}
        {product.action}
      </button>
    </article>
  );
}
