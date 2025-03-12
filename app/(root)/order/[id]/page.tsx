import { getOrderById } from '@/lib/actions/order.actions';
import { notFound } from 'next/navigation';
import { ShippingAddress } from '@/types';
import OrderDetailsTable from './order-details-table';

export const metadata = {
  title: 'Order Details',
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;

  const { id } = params;

  const order = await getOrderById(id);
  if (!order) notFound();

  return <><OrderDetailsTable
  order={{
    ...order,
    shippingAddress: order.shippingAddress as ShippingAddress,
  }}
  paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
/></>;
};

export default OrderDetailsPage;