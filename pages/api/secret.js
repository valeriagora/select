import { withApiAuthRequried, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequried(function secretRoute(req, res) {
  const session = getSession(req, res);
  const user = session.user;
});
