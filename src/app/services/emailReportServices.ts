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

    return `<div style="background-color: #f3f3f3; border-radius: 10px; padding: 5%">
                <img src="https://i.ibb.co/1LYstR4/logo.png" alt="CityDesk">
                <h2>Hi ${organizationName},</h2>
                <p>user of CityDesk ${userName} (${user.email}), reported a new problem in the city:</p>
                <br/>
                <div style="background-color: white; border-radius: 10px; padding: 5%; width: 70%; margin: auto">
                    <h3>${problem.title}</h3>
                    <a href="https://www.google.com/maps/place/3416+12,+044+10+Ge%C4%8Da/@${problem.latitude},${problem.longitude},18z/data=!4m5!3m4!1s0x473f21237c6536ef:0x874b1a26ed762ddd!8m2!3d${problem.latitude}!4d${problem.longitude}">
                        <div style="overflow: hidden">
                            <h5 style="display: inline-block; margin: 0">latitude: ${problem.latitude}</h5>
                            <h5 style="display: inline-block; float: right; margin: 0;">longitude: ${problem.longitude}</h5>
                            <h4 style="margin-top: 5px">${problem.address}</h4>
                        </div>
                    </a>
                    
                    
                    <h4>${problem.context}</h4>
                    <div style="margin: auto; max-width: 50%">
                        <a href="${problem.photoURL}">
                            <img alt="photo" src="${problem.photoURL}" style="width: 100%;">
                        </a>
                    </div>
                </div>
                <br/>
                <p>Regards,<br/>CityDesk team.</p>
                <small>This email was auto generated please do not reply.</small>
            </div>`

}