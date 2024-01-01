interface  UpdateProfileProps{
    name:string,
    avatar:	string,
    addresses:[{
        street:string
        city:string
        state:string
        postalCode:string
        country:string
    }]
}
export default UpdateProfileProps