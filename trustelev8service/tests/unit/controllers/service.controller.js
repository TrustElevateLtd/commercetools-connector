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
});