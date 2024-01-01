interface UserInputProps{
    name:string,
    email: string,
    password: string,
    avatar:	string
    addresses:[{
        street:string
        city:string
        state:string
        postalCode:string
        country:string
    }]
}

export default UserInputProps