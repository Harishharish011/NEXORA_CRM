import React from 'react';
import PageWrapper from '../components/PageWrapper';
import EmailBuilderComponent from '../components/email-builder/EmailBuilder';

const EmailBuilder = () => {
  return (
    <PageWrapper
      title="Email Builder"
      description="Create professional email campaigns with our powerful drag-and-drop builder"
    >
      <EmailBuilderComponent />
    </PageWrapper>
  );
};

export default EmailBuilder;
