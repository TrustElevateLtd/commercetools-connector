import CustomError from "../../../src/errors/custom.error.js";

jest.mock('../../../src/client/create.client.js', () => ({
    createApiRoot: jest.fn(() => ({
        carts: jest.fn(() => ({
            withId: jest.fn(() => ({
                post: jest.fn(() => ({
                    statusCode: 200,
                    actions: [{ action: 'setCustomField', name: 'eligible', value: true }],
                })),
            })),
        })),
    })),
}));

import { post } from '../../../src/controllers/service.controller.js';
import { createApiRoot } from '../../../src/client/create.client.js';


describe('post', () => {
    it('should return 200', async () => {
        const req = {body: {id: 1}}
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
            json: jest.fn(),
            body: {
                id: 1
            }
        };
        await post(req, res);
        expect(res.status.mock.calls.length).toBe(1);
        expect(res.status.mock.calls[0][0]).toBe(200);
        expect(res.json.mock.calls.length).toBe(1);
    });
    it('should return 500 if server fails', async () => {
        createApiRoot.mockImplementation(jest.fn(() => ({
            carts: jest.fn(() => ({
                withId: jest.fn(() => ({
                    post: jest.fn(() => ({
                        statusCode: 401,
                        actions: [{ action: 'setCustomField', name: 'eligible', value: true }],
                        message: "Unauthenticated"
                    })),
                })),
            })),
        })))
        expect.assertions(1);
        const req = {body: {id: 1}}
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
            json: jest.fn(),
            body: {
                id: 1
            }
        };
        try {
            await post(req, res);
        } catch (error) {
            expect(error).toBeInstanceOf(CustomError);
        }
    });
});