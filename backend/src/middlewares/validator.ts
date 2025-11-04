import { Request, Response, NextFunction } from "express";
import Joi from "joi";

/** body, params, query 등 원하는 위치를 검증할 수 있게 범용 미들웨어 */
export const validate =
  (schemas: {
    body?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
  }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const { error, value } = schemas.body.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });
        if (error) return res.status(400).json(formatJoiError(error));
        req.body = value;
      }
      if (schemas.params) {
        const { error, value } = schemas.params.validate(req.params, {
          abortEarly: false,
          stripUnknown: true,
        });
        if (error) return res.status(400).json(formatJoiError(error));
        req.params = value as any;
      }
      if (schemas.query) {
        const { error, value } = schemas.query.validate(req.query, {
          abortEarly: false,
          stripUnknown: true,
        });
        if (error) return res.status(400).json(formatJoiError(error));
        req.query = value;
      }
      next();
    } catch (e) {
      next(e);
    }
  };

const formatJoiError = (error: Joi.ValidationError) => ({
  message: "Validation Error",
  details: error.details.map((d) => ({
    path: d.path.join("."),
    type: d.type,
    message: d.message,
  })),
});
