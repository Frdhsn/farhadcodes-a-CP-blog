const UserTable = require('../../../models/usermodel');
const UserService = require('../../../services/userServices');

//const User = db.users;

const userService = new UserService(UserTable);
// mock value for all users
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

describe('All tests of user service', () => {
  test('testing createUser', async () => {
    jest.spyOn(UserTable, 'create').mockImplementation((x) => {
      return x;
    });
    const users = await userService.createUser(mockValueUsers[0]);
    const { id, name, email, password } = mockValueUsers[0];
    expect(users).toBe({ id, name, email, password });
  });
  test('getAllUser', async () => {
    jest.spyOn(UserTable, 'findAll').mockReturnValue(mockValueUsers);
    const users = await userService.getAllUser();
    expect(users).toBe(mockValueUsers);
  });

  test('getUser', async () => {
    jest.spyOn(UserTable, 'findOne').mockReturnValue(mockValueUsers[1]);
    const user = await userService.getUser(1);
    expect(user).toBe(mockValueUsers[1]);
  });

  test('updateUser', async () => {
    jest.spyOn(UserTable, 'update').mockReturnValue(1);
    const user = await userService.updateUser(1, mockValueUsers[0]);
    expect(user).toBe(1);
  });

  test('deleteUser', async () => {
    jest.spyOn(UserTable, 'destroy').mockReturnValue();
    const user = await userService.deleteUser(1);
    expect(user).toBe();
  });
});
