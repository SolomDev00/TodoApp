import { faker } from "@faker-js/faker";
import axiosInstance from "../config/axios.config";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const userData = cookie.get("userLogged");

export const onGenerateTodos = async () => {
  for (let i = 0; i < 100; i++) {
    try {
      await axiosInstance.post(
        "/todos",
        {
          data: {
            title: faker.word.words(5),
            description: faker.lorem.paragraph(2),
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
