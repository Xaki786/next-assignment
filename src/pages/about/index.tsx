/** @format */

import Layout from '@components/layout/Layout';
import Link from 'next/link';
import React from 'react';

const About = () => {
  return (
    <Layout>
      <p>This is About Page</p>
      <p>
        <Link href={'/'}>Go To Home Page</Link>
      </p>
    </Layout>
  );
};

export default About;
