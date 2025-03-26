import BaseLayout from './base-layout';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';



const VerificationCodeEmail = ({ name, verificationCode }: { name: string; verificationCode: string }) => {

  return (
    <BaseLayout
      title="Verification Code"
      heading="Verification Code"
    >
      <Section className="p-[22px]">
        <Text className="m-0 !text-[18px] !font-medium uppercase">
          <img
            // src={`${APP_URL}/assets/images/icons/verify.png`}
            src="https://res.cloudinary.com/dheroda8q/image/upload/v1738414559/lwydxsiz7zon9kzvxgxz.jpg" // Add your icon URL here
            // src="https://res.cloudinary.com/dheroda8q/image/upload/v1737734377/uploaded-file-1737734397678-522874.png"
            className="w-[25px] align-bottom h-[25px] inline"
          />{' '}
          Verify Your Account
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Dear <span className="!font-medium">{name},</span>
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Please use the verification code below to verify your account:
        </Text>
        <Section className="p-[22px] text-center bg-gray-100 rounded-md mt-[20px]">
          <Text className="!font-bold text-[24px] text-center text-blue-500">
            {verificationCode}
          </Text>
        </Section>
        <Text className="m-0 text-[13px] mt-[20px]">
          If you did not request this verification code, please ignore this email.
        </Text>
      </Section>
      <Section className="p-[22px]">
        <Text className="m-0 text-[13px]">
          Thank you for choosing Evontro! If you have any questions, feel free to contact our support team.
        </Text>
      </Section>
    </BaseLayout>
  );
}
export default VerificationCodeEmail

