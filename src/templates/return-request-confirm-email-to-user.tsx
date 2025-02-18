import BaseLayout from './base-layout';
import { Img } from '@react-email/img';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
import { z } from 'zod';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';

const ReturnRequestConfirmation = ({
  orderId,
  productName,
  returnStatus,
  returnConfirmedDate,
}: {
  orderId: string;
  productName: string;
  returnStatus: string;
  returnConfirmedDate: string;
}) => {
  return (
    <BaseLayout
      title="Return Request Confirmation"
      heading="Return Request Confirmation"
    >
      <Section className="p-[22px]">
        <Text className="m-0 !text-[18px] !font-medium uppercase">
          <Img
            // src='#' // Add your icon URL here
            src="https://res.cloudinary.com/dheroda8q/image/upload/v1738414559/lwydxsiz7zon9kzvxgxz.jpg" // Add your icon URL here

            className="w-[25px] align-bottom h-[25px] inline"
          />{' '}
          Return Request Status Update
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Dear Customer,
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          We are happy to inform you that your return request has been processed. Below are the details:
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
              Return Status:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{returnStatus}</Text>
          </Column>
        </Row>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Confirmation Date:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{returnConfirmedDate}</Text>
          </Column>
        </Row>
      </Section>
      <Section className="p-[22px]">
        <Text className="m-0 text-[13px]">
          If you have any questions, please don't hesitate to reach out.
        </Text>
      </Section>
    </BaseLayout>
  );
}

export default ReturnRequestConfirmation
