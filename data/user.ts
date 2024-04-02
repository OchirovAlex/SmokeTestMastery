import { faker } from '@faker-js/faker';
import {User} from './interface'

let password = createRandomUser().password
export const user = {
    email: createRandomUser().email.toLowerCase(),
    password: password,
    passwordConfirm: password,
    name: createRandomUser().username
}
export const user1 = {
    email: createRandomUser().email.toLowerCase(),
    password: password,
    passwordConfirm: password,
    name: createRandomUser().username
}
export const user2 = {
    email: createRandomUser().email.toLowerCase(),
    password: password,
    passwordConfirm: password,
    name: createRandomUser().username
}

export const user3 = {
  email: createRandomUser().email.toLowerCase(),
  password: password,
  passwordConfirm: password,
  name: createRandomUser().username
}
export const user4 = {
    email: createRandomUser().email.toLowerCase(),
    password: password,
    passwordConfirm: password,
    name: createRandomUser().username
}
export const user5 = {
    email: createRandomUser().email.toLowerCase(),
    password: password,
    passwordConfirm: password,
    name: createRandomUser().username
}
export function createRandomUser():User{
    return {
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
}