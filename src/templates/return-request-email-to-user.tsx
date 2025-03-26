import BaseLayout from './base-layout';
import { Img } from '@react-email/img';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';

// Define schema for return request to user details
const ReturnRequestToUser = ({
  orderId,
  productId,
  customerName,
  returnReason,
  returnRequestedDate,
}: {
  orderId: string;
  productId: string;
  customerName: string;
  returnReason: string;
  returnRequestedDate: string;
}) => {
  return (
    <BaseLayout
      title="Return Request Received"
      heading="Return Request Received"
    >
      <Section className="p-[22px]">
        <Text className="m-0 !text-[18px] !font-medium uppercase">
          <Img
            // src='#' // Add your icon URL here
            src="https://res.cloudinary.com/dheroda8q/image/upload/v1738414559/lwydxsiz7zon9kzvxgxz.jpg" // Add your icon URL here

            className="w-[25px] align-bottom h-[25px] inline"
          />{' '}
          Return Request Received
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Dear <span className="!font-medium">{customerName},</span>
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          We’ve received your return request. Below are the details of your request:
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
              Product ID:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{productId}</Text>
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
          We will review your request and notify you once it has been processed. Thank you for your patience.
        </Text>
      </Section>
    </BaseLayout>
  );
}

export default ReturnRequestToUser
