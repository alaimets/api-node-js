// tests/api.spec.ts
import {test, expect} from '@playwright/test';
import {StatusCodes} from "http-status-codes";
let baseURL: string = 'http://localhost:3000/users';


test('find user: should return a user by ID', async ({ request }) => {
    const createUserResponse = await request.post(`${baseURL}`);
    const createdUser = await createUserResponse.json();
    expect(createUserResponse.status()).toBe(StatusCodes.CREATED);

    const response = await request.get(`${baseURL}/${createdUser.id}`);
    expect(response.status()).toBe(StatusCodes.OK);
});

test('find user: should return 404 if user not found', async ({ request }) => {
    // always more than 100, id > 100
    const nonExistingUserId = 101;
    const response = await request.get(`${baseURL}/${nonExistingUserId}`);
    expect(response.status()).toBe(StatusCodes.NOT_FOUND);
});

test('create user: should add a new user', async ({ request }) => {
    const createUserResponse = await request.post(`${baseURL}`);
    const createdUser = await createUserResponse.json();
    expect(createUserResponse.status()).toBe(StatusCodes.CREATED);

    expect (typeof createdUser.id).toBe('number');
    expect (typeof createdUser.name).toBe('string');
    expect (typeof createdUser.email).toBe('string');
    expect (typeof createdUser.phone).toBe('string');
    console.log('Created user:', createdUser);
});

test('delete user: should delete a user by ID', async ({ request }) => {
    const createUserResponse = await request.post(`${baseURL}`);
    const createdUser = await createUserResponse.json();
    expect(createUserResponse.status()).toBe(StatusCodes.CREATED);

    const deleteResponse = await request.delete(`${baseURL}/${createdUser.id}`);
    expect(deleteResponse.status()).toBe(StatusCodes.OK);
});

test('delete user: should return 404 if user not found', async ({ request }) => {
    // always more than 100, id > 100
    const nonExistingUserId = 101;
    const deleteResponse = await request.delete(`${baseURL}/${nonExistingUserId}`);
    expect(deleteResponse.status()).toBe(StatusCodes.NOT_FOUND);
});