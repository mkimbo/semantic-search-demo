import BlogUser from "../mongoose/blog/user.js";

export type UserData = {
  username: string;
  email: string;
  password: string;
  roles: string[];
};
export default async (userData: UserData) => {
  BlogUser.create(userData)
    .then(function () {
      console.log("User Created"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};
