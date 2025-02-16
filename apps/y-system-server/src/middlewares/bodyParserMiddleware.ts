import { json } from 'body-parser';
import { NextFunction, Request, Response } from 'express';

const parseJson = json({ limit: '50mb' });

export const bodyParserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	parseJson(req, res, next);
};
