import { sendEmailService } from "../services/EmailService.js"



export const sendEmailController = async (req, res) => {
  try{
      const { email } = req.body
      if(email) {
          const response = await sendEmailService(email)
          return res.json(response)
      }
      return res.json({
          status: 'err',
          message: 'The email is required'
      })
  }catch(e){
      console.log(e)
      return res.json({
          status: 'err',
      })
  }
}
