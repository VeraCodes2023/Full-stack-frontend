interface User{
    email:string,
    password:string,
}

interface UserLoginProps{
    user:User,
    access_token:string,
    refresh_token:string
}
export default UserLoginProps