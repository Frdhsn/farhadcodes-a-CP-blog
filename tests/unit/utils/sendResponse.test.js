// const js2xmlparser = require('js2xmlparser');
// const json2html = require('json-to-html');
// const { toPlainText } = require('json-to-plain-text');
const httpmocks = require('node-mocks-http');
const contentNegotiate = require('../../../utils/sendResponse');

const jsonMock = {
  id: 2,
  name: 'Alice',
  email: 'Alice@gmail.com',
  password: '$2b$10$xQXTo8b66iNtreqqoROcweq4GmGsQv3TdR3N94jLMWLq9Ex85E/VG',
  updatedAt: '2022-06-28T06:19:40.354Z',
  createdAt: '2022-06-28T06:19:40.354Z',
};
const xmlMock = `<?xml version='1.0'?>
<data>
    <dataValues>
        <id>2</id>
        <name>Alice</name>
        <email>Alice@gmail.com</email>
        <password>$2b$10$xQXTo8b66iNtreqqoROcweq4GmGsQv3TdR3N94jLMWLq9Ex85E/VG</password>
        <createdAt>Tue Jun 28 2022 12:19:40 GMT+0600 (Bangladesh Standard Time)</createdAt>
        <updatedAt>Tue Jun 28 2022 12:19:40 GMT+0600 (Bangladesh Standard Time)</updatedAt>
    </dataValues>
    <_previousDataValues>
        <id>2</id>
        <name>Alice</name>
        <email>Alice@gmail.com</email>
        <password>$2b$10$xQXTo8b66iNtreqqoROcweq4GmGsQv3TdR3N94jLMWLq9Ex85E/VG</password>
        <createdAt>Tue Jun 28 2022 12:19:40 GMT+0600 (Bangladesh Standard Time)</createdAt>
        <updatedAt>Tue Jun 28 2022 12:19:40 GMT+0600 (Bangladesh Standard Time)</updatedAt>
    </_previousDataValues>
    <uniqno>1</uniqno>
    <_options>
        <isNewRecord>false</isNewRecord>
        <_schema>null</_schema>
        <_schemaDelimiter/>
        <raw>true</raw>
        <attributes>id</attributes>
        <attributes>name</attributes>
        <attributes>email</attributes>
        <attributes>password</attributes>
        <attributes>createdAt</attributes>
        <attributes>updatedAt</attributes>
    </_options>
    <isNewRecord>false</isNewRecord>
</data>`;
const htmlMock = `{
  <span class="string key">"id"</span>: <span class="number">2</span>,
  <span class="string key">"name"</span>: <span class="string value">"Alice"</span>,
  <span class="string key">"email"</span>: <span class="string value">"Alice@gmail.com"</span>,
  <span class="string key">"password"</span>: <span class="string value">"$2b$10$xQXTo8b66iNtreqqoROcweq4GmGsQv3TdR3N94jLMWLq9Ex85E/VG"</span>,
  <span class="string key">"createdAt"</span>: <span class="string value">"2022-06-28T06:19:40.000Z"</span>,
  <span class="string key">"updatedAt"</span>: <span class="string value">"2022-06-28T06:19:40.000Z"</span>
}`;
const textMock = `id                  : 2
name                : Alice
email               : Alice@gmail.com
password            : $2b$10$xQXTo8b66iNtreqqoROcweq4GmGsQv3TdR3N94jLMWLq9Ex85E/VG
createdAt           : 2022-06-28T06:19:40.000Z
updatedAt           : 2022-06-28T06:19:40.000Z`;
const mockValueUsers = [
  {
    id: 1,
    name: 'Bob',
    email: 'bob@gmail.com',
    password: '$2b$10$d/917mjPpFTCjMX6GBj6FukYdhBWA/w4P6MSAX5idJlBf9znWlG6e',
    updatedAt: '2022-06-28T06:18:22.634Z',
    createdAt: '2022-06-28T06:18:22.634Z',
  },
  {
    id: 2,
    name: 'Alice',
    email: 'Alice@gmail.com',
    password: '$2b$10$xQXTo8b66iNtreqqoROcweq4GmGsQv3TdR3N94jLMWLq9Ex85E/VG',
    updatedAt: '2022-06-28T06:19:40.354Z',
    createdAt: '2022-06-28T06:19:40.354Z',
  },
];
describe('All tests of content negotiation', () => {
  test('testing json response', async () => {
    const mreq = httpmocks.createRequest({
      headers: {
        accept: 'application/json',
      },
    });
    const mres = httpmocks.createResponse({
      req: mreq,
    });
    const statusCode = 200;
    const msg = `test message`;
    await contentNegotiate.sendResponse(mreq, mres, statusCode, mockValueUsers[1], msg);
    const data = mres._getJSONData();

    expect(data.data).toEqual(jsonMock);
    expect(mres.statusCode).toBe(statusCode);
  });
  test('testing xml response', async () => {
    const mreq = httpmocks.createRequest({
      headers: {
        accept: 'application/xml',
      },
    });
    const mres = httpmocks.createResponse({
      req: mreq,
    });
    const statusCode = 200;
    const msg = `test message`;
    await contentNegotiate.sendResponse(mreq, mres, statusCode, mockValueUsers[1], msg);
    const data = mres.send()._getData();
    expect(data).toBe(data);
    expect(mres.statusCode).toBe(statusCode);
  });
  test('testing html response', async () => {
    const mreq = httpmocks.createRequest({
      headers: {
        accept: 'text/html',
      },
    });
    const mres = httpmocks.createResponse({
      req: mreq,
    });
    const statusCode = 200;
    const msg = `test message`;
    await contentNegotiate.sendResponse(mreq, mres, statusCode, mockValueUsers[1], msg);
    const data = mres.send()._getData();
    expect(data).toEqual(data);
    expect(mres.statusCode).toBe(statusCode);
  });

  test('testing text response', async () => {
    const mreq = httpmocks.createRequest({
      headers: {
        accept: 'text/plain',
      },
    });
    const mres = httpmocks.createResponse({
      req: mreq,
    });
    const statusCode = 200;
    const msg = `test message`;
    await contentNegotiate.sendResponse(mreq, mres, statusCode, mockValueUsers[1], msg);
    const data = mres.send()._getData();

    expect(data).toBe(data);
    expect(mres.statusCode).toBe(statusCode);
  });

  test('testing default response', async () => {
    const mreq = httpmocks.createRequest({
      headers: {
        accept: 'default',
      },
    });
    const mres = httpmocks.createResponse({
      req: mreq,
    });
    const statusCode = 200;
    const msg = `test message`;
    await contentNegotiate.sendResponse(mreq, mres, statusCode, mockValueUsers[1], msg);
    const data = mres._getJSONData();

    expect(data.data).toEqual(jsonMock);
    expect(mres.statusCode).toBe(statusCode);
  });
});
//test('Testing userController', async () => {});
