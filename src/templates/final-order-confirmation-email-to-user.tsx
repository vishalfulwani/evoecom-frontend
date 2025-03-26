import BaseLayout from './base-layout';
import { Img } from '@react-email/img';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
// import { z } from 'zod';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';

// Define schema for order details (adapt fields as needed)
// const orderSchema = z.object({
//   orderId: z.string(),
//   customerName: z.string(),
//   totalAmount: z.string(),
//   orderDate: z.string(),
//   status: z.enum(['accepted', 'rejected', 'pending']), // added status
// });

const FinalOrderConfirmationEmailToUser = ({orderId,customerName,totalAmount,orderDate,status}:{orderId:string;customerName:string;totalAmount:string;orderDate:string,status:string}) =>{
  return (
    <BaseLayout
      title="Order Confirmation"
      heading="Order Confirmation"
    >
      <Section className="p-[22px]">
        <Text className="m-0 !text-[18px] !font-medium uppercase">
          <Img
            // src='#' // Add your icon URL here
            src="https://res.cloudinary.com/dheroda8q/image/upload/v1738414559/lwydxsiz7zon9kzvxgxz.jpg" // Add your icon URL here
            className="w-[25px] align-bottom h-[25px] inline"
          />{' '}
          Your Order Confirmation
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Dear <span className="!font-medium">{customerName},</span>
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Thank you for your order! We’ve received your order and are preparing it for shipment. Below are the details:
        </Text>
      </Section>
      <Section className="p-[22px]">
        <Text className="!font-medium text-[18px] m-0 mb-[10px] uppercase">
          Order Details
        </Text>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Order ID:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{orderId}</Text>
          </Column>
        </Row>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Total Amount:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{totalAmount}</Text>
          </Column>
        </Row>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Order Date:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{orderDate}</Text>
          </Column>
        </Row>
      </Section>
      <Section className="p-[22px]">
        <Text className="!font-medium text-[18px] m-0 mb-[10px] uppercase">
          Order Status
        </Text>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Status:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">
              {status === 'accepted' && 'Your order has been accepted and will be processed shortly.'}
              {status === 'rejected' && 'Unfortunately, your order has been rejected. Please contact us for further assistance.'}
              {status === 'pending' && 'Your order is pending. We will update you once the status changes.'}
            </Text>
          </Column>
        </Row>
      </Section>
      <Section className="p-[22px]">
        <Text className="m-0 text-[13px]">
          If you have any questions about your order, please contact us. Thank you for shopping with Evontro!
        </Text>
      </Section>
    </BaseLayout>
  );
}

export default FinalOrderConfirmationEmailToUser
