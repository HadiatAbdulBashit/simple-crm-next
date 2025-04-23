import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

const dir = path.join('src', 'constant');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// make dummy data
const generateCustomer = () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    company: faker.company.name(),
    status: faker.helpers.arrayElement(['Active', 'Inactive', 'Prospect']),
    tags: faker.helpers.arrayElements(['VIP', 'Hot Lead', 'New', 'Follow Up'], faker.number.int({ min: 1, max: 3 })),
    lastContact: faker.date.recent(30).toISOString(),
    createdAt: faker.date.past(1).toISOString(),
    assignedTo: faker.person.fullName(),
});

const customers = Array.from({ length: 50 }, generateCustomer);

const filePath = path.join(dir, 'customers.constant.json');
fs.writeFileSync(filePath, JSON.stringify(customers, null, 2));

console.log('✔ Dummy customer data generated!');
