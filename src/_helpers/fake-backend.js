import { Role } from "./role";

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem("users")) || [];

export function configureFakeBackend() {
  let realFetch = window.fetch;

  window.fetch = function (url = "", data = {}) {
    const { method, headers } = data;
    let authHeader = "";
    let isLoggedIn = false;
    let roleString = false;
    let role = null;

    if (method !== undefined && headers !== undefined) {
      authHeader = headers["Authorization"];
      isLoggedIn = authHeader && authHeader.startsWith("Bearer fake-jwt-token");
      roleString = isLoggedIn && authHeader.split(".")[1];
      role = roleString ? Role[roleString] : null;
    }

    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500);

      function handleRoute() {
        switch (true) {
          case url.endsWith("/users/authenticate") && method === "POST":
            return authenticate();
          case url.endsWith("/users/register") && method === "POST":
            return register();
          case url.endsWith("/users") && method === "GET":
            return getUsers();
          case url.match(/\/users\/\d+$/) && method === "PUT":
            return update();
          case url.match(/\/users\/\d+$/) && method === "GET":
            return userById();
          case url.match(/\/users\/\d+$/) && method === "DELETE":
            return deleteUser();
          default:
            // pass through any requests not handled above
            return realFetch(url, data)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      }

      // route functions

      function authenticate() {
        const params = JSON.parse(data.body);

        const admin = users.find((a) => a.role === "Admin");

        if (!admin) {
          users.push({
            id: 1,
            username: "admin",
            password: "admin",
            firstName: "Admin",
            lastName: "Admin",
            role: Role.Admin,
          });
        }

        const user = users.find(
          (x) =>
            x.username === params.username && x.password === params.password
        );
        if (!user) return error("Usuario o contraseña incorrecta.");
        return ok({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          token: `fake-jwt-token.${user.role}`,
        });
      }

      function register() {
        const user = JSON.parse(data.body);
        if (users.find((x) => x.username === user.username)) {
          return error(`Usuario  ${user.username} ya se encuentra registrado.`);
        }

        // assign user id and a few other properties then save
        user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        return ok();
      }

      function update() {
        const user = JSON.parse(data.body);

        const currentUser = users.find((x) => x.id === user.id);

        user.username !== "" && (currentUser.username = user.username);
        user.firstName !== "" && (currentUser.firstName = user.firstName);
        user.lastName !== "" && (currentUser.lastName = user.lastName);
        user.password !== "" && (currentUser.password = user.password);
        user.role !== "" && (currentUser.role = user.role);

        users = users.filter((x) => x.id !== currentUser.id);
        users.push(currentUser);
        // localStorage.removeItem("users");
        localStorage.setItem("users", JSON.stringify(users));

        return ok(user);
      }

      function userById() {
        if (!isLoggedIn) return unauthorized();

        // get id from request url
        let urlParts = url.split("/");
        let id = parseInt(urlParts[urlParts.length - 1]);

        // only allow normal users access to their own record
        const currentUser = users.find((x) => x.role === role);
        if (id !== currentUser.id && role !== Role.Admin) return unauthorized();

        const user = users.find((x) => x.id === id);
        return ok(user);
      }

      function getUsers() {
        if (role !== Role.Admin) return unauthorized();
        return ok(users);
      }

      function deleteUser() {
        if (!isLoggedIn) return unauthorized();

        users = users.filter((x) => x.id !== idFromUrl());
        localStorage.setItem("users", JSON.stringify(users));
        return ok();
      }

      //helper functions

      function ok(body) {
        resolve({
          ok: true,
          text: () => Promise.resolve(JSON.stringify(body)),
        });
      }

      function unauthorized() {
        resolve({
          status: 401,
          text: () =>
            Promise.resolve(JSON.stringify({ message: "Unauthorized" })),
        });
      }

      function error(message) {
        resolve({
          status: 400,
          text: () => Promise.resolve(JSON.stringify({ message })),
        });
      }

      function idFromUrl() {
        const urlParts = url.split("/");
        return parseInt(urlParts[urlParts.length - 1]);
      }
    });
  };
}
