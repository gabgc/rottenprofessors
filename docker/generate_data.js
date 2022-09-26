const client = require("@prisma/client");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./dummydata.json", "utf8"));

const prisma = new client.PrismaClient();

const main = async () => {
  const uni = await prisma.university.create({
    data: {
      name: "University of Puerto Rico",
      address: "123 A St",
      city: "San Juan",
      rating: 0,
    },
  });

  const dept = await prisma.department.create({
    data: {
      name: "Engineering",
    },
  });

  for (var i = 0; i < data.length; i++) {
    const prof = await prisma.professor.create({
      data: {
        firstName: data[i].firstname,
        lastName: data[i].lastname,
        universityId: uni.id,
        departmentId: dept.id,
      },
    });
    console.log(prof.id);
  }
};

main();
