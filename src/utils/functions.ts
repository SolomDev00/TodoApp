import axiosInstance from "../config/axios.config";
import Cookies from "universal-cookie";
import { format, parseISO } from "date-fns";
import { faker } from "@faker-js/faker";

const cookie = new Cookies();
const userData = cookie.get("userLogged");

export const onGenerateTodos = async () => {
  for (let i = 0; i < 50; i++) {
    try {
      await axiosInstance.post(
        "/todos",
        {
          data: {
            title: faker.word.words(5),
            description: faker.lorem.paragraph(2),
            user: [userData.user.id],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
};

export const formatCreatedAt = (createdAt: string): string => {
  const dateObject = parseISO(createdAt);
  const formattedDate = format(dateObject, "yyyy-MM-dd");
  return formattedDate;
};
