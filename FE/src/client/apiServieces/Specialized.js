import  request from "../ultils/requests";

export const GetAll = async () =>  {
  
        return await request.get('/Specialized' )
         
     
}
export const getByDeparmentId = async (id) =>  {
  
        return await request.get(`/Specialized/getByDeparmentId/${id}` ) 
}
export const getById = async (id) =>  {
  
        try {
                return await request.get(`/Specialized/getId/${id}` )
        } catch (error) {
                throw Error
        }   
}