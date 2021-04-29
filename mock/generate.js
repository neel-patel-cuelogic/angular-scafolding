var faker = require("faker");

var database = { users: [], studies: [] };

for (var i = 1; i <= 300; i++) {
  database.users.push({
    id: i,
    userId: i,
    clientName: faker.name.firstName() + " " + faker.name.lastName(),
    requesterName: faker.name.firstName() + " " + faker.name.lastName(),
    accessCode: faker.random.alphaNumeric(6),
    accessStartDate: new Date(faker.date.past()).getTime(),
    accessEndDate: new Date(faker.date.future()).getTime(),
    accessStatus: i % 7 == 0 ? "unblock" : "block",
    accessReason: faker.lorem.lines(1),
    createdAt: new Date(faker.date.past()).getTime(),
    updatedAt: new Date(faker.date.past()).getTime(),
    lastLoggedIn: new Date(faker.date.past()).getTime(),
    userMetaInfo:
      i % 7 == 0
        ? null
        : {
            ipAddress: faker.internet.ip(),
          },
  });
}

console.log(JSON.stringify(database));
