import nodemailer from "nodemailer" 


  
 
    
  const transport = nodemailer.createTransport({
     host: "smtp.mailtrap.io",
     port: 2525,
     auth: {
        user: "3055524f7a3205",
        pass: "64f85d462bc0f7"
      }
      });

      export default transport