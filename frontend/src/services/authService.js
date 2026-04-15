export const login = async (email, password) => {

    if (email === "admin@bonpland.com" && password === "123456") {
        return {
            token: "fake-jwt",
            user: { role: "admin", name: "Admin" }
        };
    }else if (email === "user@bonpland.com" && password === "123456") {
        return {
            token: "fake-jwt",
            user: { role: "user", name: "User" }
        };
    }


    throw new Error("Invalid credentials");
};