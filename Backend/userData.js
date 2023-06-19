import bcrypt from "bcryptjs"

let userData = [  /* vedio: 29 */
    {
        name: "sujan",
        email: "sujan@gmail.com",
        password:  bcrypt.hashSync("123456789"),
        isAdmin: true
    },
    {
        name: "surobi",
        email: "surobi@gmail.com",
        password:  bcrypt.hashSync("123456789"),
        isAdmin: false
    },
]

export default userData
