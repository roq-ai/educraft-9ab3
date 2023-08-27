import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { ownerValidationSchema } from 'validationSchema/owners';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOwners();
    case 'POST':
      return createOwner();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOwners() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.owner
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'owner'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createOwner() {
    await ownerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.app?.length > 0) {
      const create_app = body.app;
      body.app = {
        create: create_app,
      };
    } else {
      delete body.app;
    }
    if (body?.app_administrator?.length > 0) {
      const create_app_administrator = body.app_administrator;
      body.app_administrator = {
        create: create_app_administrator,
      };
    } else {
      delete body.app_administrator;
    }
    if (body?.app_developer?.length > 0) {
      const create_app_developer = body.app_developer;
      body.app_developer = {
        create: create_app_developer,
      };
    } else {
      delete body.app_developer;
    }
    const data = await prisma.owner.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
