export interface User{
      userId?: string 
      username?: string
      email: string
      avatar?: string
      password: string
      birthdate?: Date
      registeredAt?: Date
      passwordConfirm?: string
      name?:string
}


export interface Tour{
      name: string,
      duration: number,
      description: string,
      maxGroupSize: number,
      summary: string,
      difficulty: string,
      price: number,
      rating: number,
      imageCover: string,
      ratingsAverage: number,
      guides: object,
      startDates: [x:string],
      location: {
            latitude: number,
            longitude: number,
            description: string,
            address: string,
      },
      startLocation: {
          type: string,
          coordinates: [x:number, y:number],
      }
}