import Head from 'next/head'
import { Box, Button, Code, Flex, Heading, Icon, Text, Link } from "@chakra-ui/react"

import { useAuth } from '@/lib/auth'

export default function Home() {
  const auth = useAuth()
  // console.log('auth ', auth)
  // console.log('auth.signinWithGithub ', auth.signinWithGithub())

  return (
    <div >

      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        maxW="400px"
        margin="0 auto"
      >
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                  window.location.href = "/dashboard"
                }
              `
            }}
          />
          <title>Fast Feedback</title>
        </Head>
        <Icon viewBox="0 0 46 32" color="black" boxSize={12} name="logo" mb={2}>
          <path
            fill="currentColor"
            d="M19.557.113C11.34.32 9.117 8.757 9.03 12.95c1.643-2.67 4.62-3.08 6.931-3.08 2.825.085 10.27.205 17.458 0C40.61 9.663 44.802 3.28 46 .112c-5.391-.085-18.228-.205-26.443 0zM14.422 14.234C3.332 14.234-.468 24.76.045 31.948c3.594-6.418 7.617-7.53 9.243-7.445h6.675c5.956 0 11.039-6.846 12.836-10.27H14.422z"
          />          
        </Icon>
        <Text mb={4}>
          <Text as="span" fontWeight="bold" display="inline">
            Fast Feedback
          </Text>
          {' is being built as part of '}
          <Link
            href="https://react2025.com"
            isExternal
            textDecoration="underline"
          >
            React 2025
          </Link>
          {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
        </Text>
      {auth.user ? (
        <Button as="a" size="sm" fontWeight="medium" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button
          mt={4}
          size="sm"
          fontWeight="medium"
          onClick={(e) => auth.signinWithGithub()}
        >
          Sign In
        </Button>
      )}
      </Flex>
    </div>
  )
}
