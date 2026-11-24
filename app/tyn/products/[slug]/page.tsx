import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/data/store';
import { TynProductDetail } from '@/components/tyn/TynProductDetail';

interface Props {
  params: {
    slug: string;
  };
}

export default async function TynProductPage({ params }: Props) {
  const product = await getProductBySlug('tyn', params.slug);
  if (!product) {
    notFound();
  }

  const allTyn = await getProducts({ brandSlug: 'tyn' });
  const relatedProducts = allTyn.filter((p) => p.id !== product.id);

  return <TynProductDetail product={product} relatedProducts={relatedProducts} />;
}
