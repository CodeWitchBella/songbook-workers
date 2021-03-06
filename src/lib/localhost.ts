import { ApolloServer } from 'apollo-server'
import config from './server-config'
import type { MyContext } from './context'
import type { Request, Response } from 'express'
import { createSetSessionCookieHeader, parseSessionCookie } from './cookie'
import { getLoader } from './firestore'

const server = new ApolloServer({
  ...config,
  context: ({ res, req }: { req: Request; res: Response }): MyContext => {
    return {
      sessionCookie: parseSessionCookie(req.get('cookie')),
      setSessionCookie(cookie, duration) {
        res.set(...createSetSessionCookieHeader(cookie, duration))
      },
      url: req.originalUrl,
      loader: getLoader(),
    }
  },
})
server.listen(3000)
