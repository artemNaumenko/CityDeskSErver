const nodemailer = require('nodemailer');

export async function emailWelcomeService(user: any){
    try{
        await sendEmail(user)
    }catch (e) {
        return e
    }
}

async function sendEmail(user: any){
    const transporter = nodemailer.createTransport({
        host: process.env.emailHOST as string,
        port: parseInt(process.env.emailPORT as string),
        auth: {
            user: process.env.emailUSER as string,
            pass: process.env.emailPASS as string
        }
    })

    const mailOptions = {
        from: process.env.emailUSER as string,
        to: user.email,
        subject: 'Welcome to CityDesk!',
        html: renderHTML(user)
    }

    transporter.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

function renderHTML(user: any){
    let userName
    if(user.name){
        userName = user.name
    } else {
        userName = "ANONYMOUS"
    }

    return `
            <div style="background-color: #f3f3f3; border-radius: 10px; padding: 5%">
                <img src="https://i.ibb.co/1LYstR4/logo.png", alt="CityDesk">
                <h2>Hi ${userName},</h2>
                <p>we are happy you joined us, together we will make city better!</p>
                <br/>
                <p>Regards,<br/>CityDesk team.</p>
                <small>This email was auto generated please do not reply.</small>
            </div>`

}