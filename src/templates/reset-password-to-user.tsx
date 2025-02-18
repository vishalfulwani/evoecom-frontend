import BaseLayout from './base-layout';
import { Img } from '@react-email/img';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
import { z } from 'zod';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';


const ResetPasswordEmail = ({
  resetLink,
  userName,
}: {
  resetLink: string;
  userName: string;
}) => {
  return (
    <BaseLayout
      title="Password Reset Request"
      heading="Password Reset Request"
    >
      <Section className="p-[22px] text-center">
        <Text className="m-0 !text-[18px] !font-medium uppercase">
          <Img
            // src='#' // Add your icon URL here
            src="https://res.cloudinary.com/dheroda8q/image/upload/v1738414559/lwydxsiz7zon9kzvxgxz.jpg" // Add your icon URL here

            className="w-[25px] align-bottom h-[25px] inline"
          />{' '}
          Password Reset Request
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Dear <span className="!font-medium">{userName},</span>
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          We received a request to reset your password. If you did not request a password reset, please ignore this email. Otherwise, click the link below to reset your password:
        </Text>
      </Section>
      <Section className="p-[22px]">
        <Text className="m-0 !font-medium text-[18px] mb-[10px]">
          Reset Your Password
        </Text>
        <Row className="max-w-full m-0">
          <Column className="w-[100%]">
            <Text className="m-0 text-center text-[14px]">
              <a
                href={resetLink}
                className="inline-block py-[10px] px-[20px] bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                Reset Password
              </a>
            </Text>
          </Column>
        </Row>
      </Section>
      <Section className="p-[22px]">
        <Text className="m-0 text-[13px]">
          If you have any issues, please contact our support team. Thank you for being with us.
        </Text>
      </Section>
    </BaseLayout>
  );
}


export default ResetPasswordEmail