import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({ 
  username, 
  otp 
}: VerificationEmailProps) => (
  <Html>
    <Head>
      <title>Verification Code</title>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily={["Verdana"]}
        webFont={{
          url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>Here's your verification code: {otp}</Preview>
    <Section>
      <Row>
        <Heading as="h2">Hello {username},</Heading>
      </Row>
      <Row>
        <Text>
          Thank you for registering. Please use the following verification code to complete your registration:
        </Text>
      </Row>
      <Row>
        <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {otp}
        </Text>
      </Row>
      <Row>
        <Text>
          If you didn't request this code, please ignore this email.
        </Text>
      </Row>
    </Section>
  </Html>
);

export default VerificationEmail;