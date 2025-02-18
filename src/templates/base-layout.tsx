// import Separator from './_components/separator'

import { Html } from '@react-email/html'
import { Head } from '@react-email/head'
import { Font } from '@react-email/font'
import { Tailwind } from '@react-email/tailwind'
import { Container } from '@react-email/container'
import { Link } from '@react-email/link'
import { Section } from '@react-email/section'
import { Img } from '@react-email/img'
import { APP_URL } from '../../constants'
// import { APP_URL } from '@/app/_lib/constants'

interface LayoutProps {
  children: React.ReactNode
  title: string
  heading?: string
  showLoginLink?: boolean
  footerMessage?: boolean
  youMightAlsoLove?: boolean
}

export default function BaseLayout({
  children,
  title,
  heading,
  showLoginLink,
  footerMessage,
  youMightAlsoLove,
}: LayoutProps) {
  return (
    <Html
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="x-apple-disable-message-reformatting" />
        {title ? <title>{title}</title> : ''}
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={500}
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                theme: '#235171',
                primary: '#597080',
                secondary: '#cbc1b5',
                dark: '#000',
                neutral: '#00000080',
                'dark-olive-green': '#235171',
                'light-steel-blue': '#b0d0e966',
              },
              fontFamily: {
                ['roboto']: ['Roboto'],
              },
            },
          },
        }}
      >
        <body className="bg-white m-[0px] p-[1px] text-[14px] font-roboto font-normal text-dark-olive-green">
          <Container className="!w-full !max-w-[600px] bg-white">
            <Section className="py-[15px]">
              <Link 
            //   href={APP_URL}
            href=''
              >
                <Img
                  // src={${APP_URL}images/logo.png}
                //  src=""
                //  src={`https://res-console.cloudinary.com/dheroda8q/media_explorer_thumbnails/66be46e94f92f9fb45b99c10e7f3aeee/card?v=1738404016`}
                  src="https://res.cloudinary.com/dheroda8q/image/upload/v1738404016/agy2twbbl38rzq9zskea.png"
                  alt="logo.png"
                  width="380"
                  className="m-auto"
                />
              </Link>
            </Section>
            <Section>{children}</Section>
          </Container>
        </body>
      </Tailwind>
    </Html>
  )
}