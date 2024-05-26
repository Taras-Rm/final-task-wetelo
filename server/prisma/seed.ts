import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // create admin
  const admin = await prisma.user.create({
    data: {
      name: "Tom",
      phone: "1234567890",
      email: "tarasromaniuk555@gmail.com",
      password: "$2b$10$4V9lz1TPB5Tb6dYOK./W4eA5pnFm4uLAKEb.moQIk2Z.CP5Vu2ttC",
      isVerified: true,
      role: "admin",
    },
  });

  console.log(admin);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
