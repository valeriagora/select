import React from 'react';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

const Scenarios = () => {
  return <div>Scenarios</div>;
};

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/scenarios',
  async getServerSideProps(ctx: any) {
    // access the user session
    const session = await getSession(ctx.req, ctx.res);
    console.log('s', session);
    return { props: { customProp: 'bar' } };
  },
});

export default Scenarios;
