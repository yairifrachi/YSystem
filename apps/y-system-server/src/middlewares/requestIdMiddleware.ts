import { NextFunction, Request, Response } from 'express';
import * as httpContext from 'express-http-context';
import { randomUUID } from 'crypto';
import { AppConfig } from '../config/config';

export const REQUEST_ID = AppConfig.headers.requestId;

export const requestIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers[REQUEST_ID]) {
		req.headers[REQUEST_ID] = randomUUID();
	}
	const requestId = req.headers[REQUEST_ID];
	res.setHeader(REQUEST_ID, requestId);
	httpContext.set(AppConfig.httpContextKeys.RequestId, requestId);
	next();
};
