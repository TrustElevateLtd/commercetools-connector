import CustomError from '../errors/custom.error.js';
import { apiSuccess } from '../api/success.api.js';
import {createApiRoot} from "../client/create.client.js";

export const post = async (request, response) => {
  try {
    const data = await createApiRoot()
        .carts()
        .withId({ID: request.body.id})
        .post({body: {actions: [{action: "setCustomField", name: "eligible", value: request.body.eligible}]}})

    if (data && data.statusCode === 200) {
      apiSuccess(200, data.actions, response);
      return;
    }
    throw new CustomError(
      data ? data.statusCode : 400,
      JSON.stringify(data)
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      throw new CustomError(500, error.message);
    }
  }
};
