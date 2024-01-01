interface  UserListProps{
    id:string,
    email:string,
    password:string,
    name:string,
    role:string,
    avatar:string,
    addresses:[{
        street:string
        city:string
        state:string
        postalCode:string
        country:string
        isDefault:true
    }]
}

export default UserListProps


