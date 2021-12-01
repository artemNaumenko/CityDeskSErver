import {getProblemById} from "./getProblemById";
import {getUserById} from "./getUserById";
import {getOrganizationById} from "./getOrganizationById";

const nodemailer = require('nodemailer');

export async function emailService(id: string){
    try{
        const problem = await getProblemById(id)
        const size = problem.responsibleOrganizations.length
        if(size > 0){
            const user = await getUserById(problem.authorID)
            for(let i = 0; i < size; i++){
                const organizationId = problem.responsibleOrganizations[i]
                const organization = await getOrganizationById(organizationId)
                await sendEmail(organization, problem, user)
            }
        }
    }catch (e) {
        return e
    }
}

async function sendEmail(organization: any, problem: any, user: any){
    const destinationEmail = organization.email
    if(destinationEmail == "none"){
        return
    }

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
        to: destinationEmail,
        subject: 'New problem in the city',
        html: renderHTML(problem, user, organization.name)
    }

    transporter.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

function renderHTML(problem: any, user: any, organizationName: string){
    let userName
    if(user.name){
        userName = user.name
    } else {
        userName = "ANONYMOUS"
    }

    return `<h2>Hi ${organizationName},</h2>
            <p>user of CityDesk ${userName} (${user.email}), reported a new problem in the city:</p>
            <br/>
            <div>
                <h4>${problem.title}</h4>
                <h5>longitude: ${problem.longitude}  latitude: ${problem.latitude}</h5>
                <h5>${problem.context}</h5>
                <img alt="photo" src="${problem.photoURL}" style="max-width: 40%">
            </div>
            <br/>
            <p>Regards,<br/>CityDesk team.</p>
            <small>This email was auto generated please do not reply.</small>`

}