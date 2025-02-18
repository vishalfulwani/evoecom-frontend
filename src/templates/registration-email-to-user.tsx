import BaseLayout from './base-layout';
import { Img } from '@react-email/img';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
import { z } from 'zod';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';

// Define schema for registration details (adapt based on your schema)
const registrationSchema = z.object({
  name: z.string(),
  email: z.string(),
  registrationDate: z.string(), // Adjust this field as needed
});

const RegistrationEmailToUser = ({name,email,registrationDate}:{name:string;email:string;registrationDate:string}) => {
  return (
    <BaseLayout
      title="Welcome to Evontro!"
      heading="Welcome to Evontro!"
    >
      <Section className="p-[22px] text-center">
        <Text className="m-0 !text-[18px] !font-medium uppercase">
          <Img
            // src='#' // Add your icon URL here
            src="https://res.cloudinary.com/dheroda8q/image/upload/v1738414559/lwydxsiz7zon9kzvxgxz.jpg" // Add your icon URL here

            className="w-[25px] align-bottom h-[25px] inline"
          />{' '}
          Welcome to Evontro!
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Dear <span className="!font-medium">{name},</span>
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Thank you for registering with Evontro! We're excited to have you join our platform.
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Below are the details of your registration:
        </Text>
      </Section>
      <Section className="p-[22px]">
        <Text className="!font-medium text-[18px] m-0 mb-[10px] uppercase">
          Your Registration Details
        </Text>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Name:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{name}</Text>
          </Column>
        </Row>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Email:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{email}</Text>
          </Column>
        </Row>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Registration Date:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{registrationDate}</Text>
          </Column>
        </Row>
      </Section>
      <Section className="p-[22px]">
        <Text className="m-0 text-[13px]">
          If you have any questions or need assistance, feel free to reach out to our support team.
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Welcome aboard, and we hope you have a great experience with Evontro!
        </Text>
      </Section>
    </BaseLayout>
  );
}

export default RegistrationEmailToUser