import prisma from "@/lib/prisma";

export async function createContactUs(data) {
  return await prisma.contactUs.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    },
  });
}
