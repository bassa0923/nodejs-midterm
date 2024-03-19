const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fetchStudents() {
  try {
    const students = await prisma.students.findMany();
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

async function addStudent(name, surname, age) {
  try {
    const newStudent = await prisma.students.create({
      data: {
        name,
        surname,
        age,
      },
    });
    return newStudent;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { fetchStudents, addStudent };
