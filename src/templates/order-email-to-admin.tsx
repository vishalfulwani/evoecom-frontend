// import BaseLayout from './base-layout';
// import { Img } from '@react-email/img';
// import { Column } from '@react-email/column';
// import { Row } from '@react-email/row';
// import { z } from 'zod';
// import { Section } from '@react-email/section';
// import { Text } from '@react-email/text';

// // Define schema for order details (adapt fields as needed)
// const OrderEmailToAdmin = ({
//   orderId,
//   customerName,
//   customerEmail,
//   totalAmount,
//   orderDate,
// }: {
//   orderId: string;
//   customerName: string;
//   customerEmail: string;
//   totalAmount: string;
//   orderDate: string;
// }) => {
//   return (
//     <BaseLayout
//       title="New Order Placed"
//       heading="New Order Placed"
//     >
//       <Section className="p-[22px]">
//         <Text className="m-0 !text-[18px] !font-medium uppercase">
//           <Img
//             src='#' // Add your icon URL here
//             className="w-[25px] align-bottom h-[25px] inline"
//           />{' '}
//           New Order Notification
//         </Text>
//         <Text className="m-0 text-[13px] mt-[20px]">
//           Dear <span className="!font-medium">Admin,</span>
//         </Text>
//         <Text className="m-0 text-[13px] mt-[20px]">
//           A new order has been placed on evontro. Below are the order details:
//         </Text>
//       </Section>
//       <Section className="p-[22px]">
//         <Text className="!font-medium text-[18px] m-0 mb-[10px] uppercase">
//           Order Details
//         </Text>
//         <Row className="max-w-full m-0">
//           <Column className="w-[40%]">
//             <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
//               Order ID:
//             </Text>
//           </Column>
//           <Column className="w-[60%]">
//             <Text className="m-0 text-[14px]">{orderId}</Text>
//           </Column>
//         </Row>
//         <Row className="max-w-full m-0">
//           <Column className="w-[40%]">
//             <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
//               Customer Name:
//             </Text>
//           </Column>
//           <Column className="w-[60%]">
//             <Text className="m-0 text-[14px]">{customerName}</Text>
//           </Column>
//         </Row>
//         <Row className="max-w-full m-0">
//           <Column className="w-[40%]">
//             <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
//               Customer Email:
//             </Text>
//           </Column>
//           <Column className="w-[60%]">
//             <Text className="m-0 text-[14px]">{customerEmail}</Text>
//           </Column>
//         </Row>
//         <Row className="max-w-full m-0">
//           <Column className="w-[40%]">
//             <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
//               Total Amount:
//             </Text>
//           </Column>
//           <Column className="w-[60%]">
//             <Text className="m-0 text-[14px]">{totalAmount}</Text>
//           </Column>
//         </Row>
//         <Row className="max-w-full m-0">
//           <Column className="w-[40%]">
//             <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
//               Order Date:
//             </Text>
//           </Column>
//           <Column className="w-[60%]">
//             <Text className="m-0 text-[14px]">{orderDate}</Text>
//           </Column>
//         </Row>
//       </Section>
//     </BaseLayout>
//   );
// }

// export default OrderEmailToAdmin







import BaseLayout from './base-layout';
import { Img } from '@react-email/img';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';

interface Product {
  productId:string
  productName: string;
  price: string;
  quantity: number;
  image: string;
  selectedSize:string;
  selectedColor:string;
  category:string;
}

const OrderEmailToAdmin = ({
  orderId,
  customerName,
  customerEmail,
  totalAmount,
  orderDate,
  products,
}: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  totalAmount: string;
  orderDate: string;
  products: Product[];
}) => {
  return (
    <BaseLayout title="New Order Placed" heading="New Order Placed">
      <Section className="p-[22px] text-center">
        <Text className="m-0 !text-[18px] !font-medium uppercase">
          <Img
            src="https://res.cloudinary.com/dheroda8q/image/upload/v1738414559/lwydxsiz7zon9kzvxgxz.jpg" // Add your icon URL here
            className="w-[25px] align-bottom h-[25px] inline"
          />{' '}
          New Order Notification
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Dear <span className="!font-medium">Admin,</span>
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          A new order has been placed on evontro. Below are the order details:
        </Text>
      </Section>

      {/* Order Details */}
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
              Customer Name:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{customerName}</Text>
          </Column>
        </Row>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Customer Email:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{customerEmail}</Text>
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

      {/* Products List */}
      <Section className="p-[22px]">
        <Text className="!font-medium text-[18px] m-0 mb-[10px] uppercase">
          Ordered Products
        </Text>
        {products.map((product, index) => (
          // <Row key={index} className="border-b border-gray-300 pb-[10px] mb-[10px]">
          //   <Column className="w-[25%]">
          //     <Img
          //       src={product.image}
          //       alt={product.productName}
          //       className="w-[60px] h-[60px] object-cover rounded"
          //     />
          //   </Column>
          //   <Column className="w-[50%]">
          //     <Text className="m-0 font-medium text-[14px]">{product.productName}</Text>
          //     <Text className="m-0 font-medium text-[14px]">{product.category}</Text>
          //     <Text className="m-0 text-[12px]">Quantity: {product.quantity}</Text>
          //   </Column>
          //   <Column className="w-[25%]">
          //     <Text className="m-0 text-[14px] text-right">${product.price}
          //     {product.selectedSize && ` | Size: ${product.selectedSize}`}
          //     {product.selectedColor && ` | Color: ${product.selectedColor}`}
          //     </Text>
          //   </Column>
          // </Row>
          <Row key={index} className="border-b border-gray-300 pb-3 mb-3 flex items-center">
  {/* Product Image */}
  <Column className="w-[20%] flex justify-center">
    <Img
      src={product.image}
      alt={product.productName}
      className="w-[70px] h-[70px] object-cover rounded"
    />
  </Column>

  {/* Product Details */}
  <Column className="w-[55%] pl-3">
    <Text className="m-0 font-semibold text-[15px]">{product.productName}</Text>
    <Text className="m-0 text-[13px] text-gray-600">{product.category}</Text>
    <Text className="m-0 text-[12px] text-gray-500">ProductId: {product.productId}</Text>
    {product.selectedSize && (
      <Text className="m-0 text-[12px] text-gray-500">Size: {product.selectedSize}</Text>
    )}
    {product.selectedColor && (
      <Text className="m-0 text-[12px] text-gray-500">Color: {product.selectedColor}</Text>
    )}
  </Column>

  {/* Price Section */}
  <Column className="w-[25%] text-right">
    <Text className="m-0 text-[14px] font-semibold">${product.price}</Text>
    <Text className="m-0 text-[12px] text-gray-500">Quantity: {product.quantity}</Text>
  </Column>
</Row>

        ))}
      </Section>
    </BaseLayout>
  );
};

export default OrderEmailToAdmin;
