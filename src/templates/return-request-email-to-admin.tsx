import BaseLayout from './base-layout';
import { Img } from '@react-email/img';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
import { z } from 'zod';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';

// Define schema for return request details (adapt fields as needed)
const ReturnRequestToAdmin = ({
  orderId,
  customerName,
  productName,
  returnReason,
  returnRequestedDate,
}: {
  orderId: string;
  customerName: string;
  productName: string;
  returnReason: string;
  returnRequestedDate: string;
}) => {
  return (
    <BaseLayout
      title="Return Request Notification"
      heading="Return Request Notification"
    >
      <Section className="p-[22px]">
        <Text className="m-0 !text-[18px] !font-medium uppercase">
          <Img
            // src='#' // Add your icon URL here
            src="https://res.cloudinary.com/dheroda8q/image/upload/v1738414559/lwydxsiz7zon9kzvxgxz.jpg" // Add your icon URL here

            className="w-[25px] align-bottom h-[25px] inline"
          />{' '}
          New Return Request
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Dear Admin,
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          A return request has been submitted by a customer. Below are the details:
        </Text>
      </Section>
      <Section className="p-[22px]">
        <Text className="!font-medium text-[18px] m-0 mb-[10px] uppercase">
          Return Request Details
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
              Product Name:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{productName}</Text>
          </Column>
        </Row>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Return Reason:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{returnReason}</Text>
          </Column>
        </Row>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Requested Date:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{returnRequestedDate}</Text>
          </Column>
        </Row>
      </Section>
      <Section className="p-[22px]">
        <Text className="m-0 text-[13px]">
          Please review the return request and take necessary action.
        </Text>
      </Section>
    </BaseLayout>
  );
}

export default ReturnRequestToAdmin