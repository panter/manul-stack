import { PrismaClient } from "@prisma/client";
import { getHashedPassword } from "../graphql/utils/user";

const prisma = new PrismaClient();

const seed = async ({
  adminEmail,
  adminPassword,
}: {
  adminEmail: string;
  adminPassword: string;
}) => {
  if (
    !(await prisma.userRole.findOne({
      where: {
        id: "admin",
      },
    }))
  ) {
    await prisma.userRole.create({ data: { id: "admin" } });
  }
  if ((await prisma.user.count()) === 0) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: await getHashedPassword(adminPassword),
        roles: { connect: { id: "admin" } },
      },
    });
  }
};

const argv = require("minimist")(process.argv.slice(2));

if (process.env.SEED_DISABLED === "1") {
  // eslint-disable-next-line no-console
  console.info("seed disabled");
  process.exit(0);
}
const options = {
  adminEmail: argv.admin_email,
  adminPassword: argv.admin_password,
};

seed(options)
  .then((e) => {
    process.exit(0);
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });
