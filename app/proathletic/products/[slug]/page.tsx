import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/data/store';
import { ProProductDetail } from '@/components/proathletic/ProProductDetail';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProProductPage({ params }: Props) {
  const product = await getProductBySlug('proathletic', params.slug);
  if (!product) {
    notFound();
  }

  const allPro = await getProducts({ brandSlug: 'proathletic' });
  const relatedProducts = allPro.filter((p) => p.id !== product.id);

  return <ProProductDetail product={product} relatedProducts={relatedProducts} />;
}
