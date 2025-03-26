import BaseLayout from './base-layout'
import { Img } from '@react-email/img'
import { Column } from '@react-email/column'
import { Row } from '@react-email/row'
// import { z } from 'zod'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'

const ContactEmailToAdmin = ({name,email,phoneNumber,message}:{name:string;email:string;phoneNumber:string;message:string}) => {
  return ( 
    <BaseLayout
      title="New Contact Us Message Submitted"
      heading="New Contact Us Message Submitted"
    >
      <Section className="p-[22px] text-center">
        <Text className="m-0 !text-[18px] !font-medium uppercase">
          <Img
            // src={APP_URL + 'images/check.png'}
            // src='#'
            src="https://res.cloudinary.com/dheroda8q/image/upload/v1738414559/lwydxsiz7zon9kzvxgxz.jpg" // Add your icon URL here

            className="w-[25px] align-bottom h-[25px] inline"
          />{' '}
          New Contact Us Message Submitted
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          Dear <span className="!font-medium">Admin,</span>
        </Text>
        <Text className="m-0 text-[13px] mt-[20px]">
          A new Contact Us message has been submitted to evontro
        </Text>
      </Section>
      <Section className="p-[22px]">
        <Text className="!font-medium text-[18px] m-0 mb-[10px] uppercase">
          Message Details
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
            <Text className="m-0 text-[14px]"> {email}</Text>
          </Column>
        </Row>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Phone Number:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{phoneNumber}</Text>
          </Column>
        </Row>
        <Row className="max-w-full m-0">
          <Column className="w-[40%]">
            <Text className="m-0 font-medium text-[14px] py-[4px] capitalize">
              Message:
            </Text>
          </Column>
          <Column className="w-[60%]">
            <Text className="m-0 text-[14px]">{message}</Text>
          </Column>
        </Row>
      </Section>
    </BaseLayout>
  )
}

export default ContactEmailToAdmin