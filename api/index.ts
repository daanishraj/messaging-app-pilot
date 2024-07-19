import express, { Request, Response } from 'express';
import twilio from 'twilio';
import cron from 'node-cron';
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const twilioWhatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER!;
const destinationPhoneNumber = process.env.DESTINATION_PHONE_NUMBER!;

console.log({ accountSid, authToken, twilioPhoneNumber, destinationPhoneNumber})

const client = twilio(accountSid, authToken);

console.log({ client })

// const sendMessage = () => {
//     const message = "For God and Guru";

//     console.log(`message: ${message}`)
//     console.log({ client })


    
//     // when using whatsapp
//     // client.messages
//     //   .create({
//     //     body: message,
//     //     from: `whatsapp:${twilioWhatsappNumber}`,
//     //     to: `whatsapp:${destinationPhoneNumber}`,
//     //   }
//     // )
//       client.messages
//       .create({
//         body: message,
//         from: twilioPhoneNumber,
//         to: destinationPhoneNumber,
//       })
//       .then((message) => {
//         const now = new Date();
//         const formattedDate = now.toLocaleString()
//         console.log(`Message sent: ${message.sid} at ${ now }`)
//       }).catch((error) => console.error('Error sending message:', error));
//   };

const sendMessage = async () => {
  const message = "For God and Guru";

  console.log(`message: ${message}`);
  console.log({ client });

  try {
      const response = await client.messages.create({
          body: message,
          from: twilioPhoneNumber,
          to: destinationPhoneNumber,
      });

      const now = new Date();
      const formattedDate = now.toLocaleString();
      console.log(`Message sent: ${response.sid} at ${formattedDate}`);
      console.log('Response:', response);
  } catch (error) {
      console.error('Error sending message:', error);
  }
};

  cron.schedule('30 */1 * * *', () => {
    console.log('executing cron job')
  // cron.schedule('*/10 * * * *', () => {
    sendMessage();
  });


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/send-message', (req, res) => {
    console.log('/send-message')
    sendMessage();
    res.send('Message sent!');
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
