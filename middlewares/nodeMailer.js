const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sarbesh39tiwari@gmail.com',
    pass: 'osxpialbinrjkhht'
  }
});


const sendQueryEmail = async (Name, Email, phoneNumber, user_query) => {
  const adminMailOptions = {
    from: 'sarbesh39tiwari@gmail.com',
    to: 'rahul8454454singh@gmail.com',
    subject: 'New User Query Received',
    text: `
        Dear Team,

        We have received a new query from a user. Below are the details:

        Name: ${Name}
        Phone Number: ${phoneNumber}
        Email: ${Email}

        Message:
        ${user_query}

        Best regards,
        Star Estate,
        Riana Aurum 4th floor,
        plot no. 111, Sector 136 Noida,
        U.P. 201304
        +91 70884 70884
        
            `,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <title>New User Query Received</title>
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  box-sizing: border-box;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  background-color: #ffffff;
              }
              .header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding-bottom: 20px;
              }
              .header img {
                  max-width: 150px;
              }
              .header .company-info {
                  text-align: right;
              }
              .banner {
                  width: 100%;
                  height: auto;
                  margin-bottom: 20px;
              }
              .content {
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  background-color: #f9f9f9;
              }
              table {
                  width: 100%;
                  border: 1px solid black;
                  border-collapse: collapse;
              }
              table td {
                  border: 1px solid black;
                  padding: 8px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <!-- Header -->
              <div class="header">
                  <img src="https://www.starestate.in/assets/images/logo-starestate.png" style="max-width: 120px; alt="Company Logo">
                  <div class="company-info">
                      <strong>Star Estate</strong><br>
                      Riana Aurum 4th floor,<br>
                      plot no. 111, Sector 136 Noida,<br> 
                      U.P. 201304<br>
                      +91 70884 70884
                  </div>
              </div>
             
              <!-- Main Content -->
              <div class="content">
                  <strong>Dear Team,</strong>
                  <p>We have received a new query from a user. Below are the details:</p>
                  <table>
                      <tr>
                          <td><strong>Name:</strong></td>
                          <td>${Name}</td>
                      </tr>
                      <tr>
                          <td><strong>Phone Number:</strong></td>
                          <td>${phoneNumber}</td>
                      </tr>
                      <tr>
                          <td><strong>Email:</strong></td>
                          <td>${Email}</td>
                      </tr>
                      <tr>
                          <td><strong>Message:</strong></td>
                          <td>${user_query}</td>
                      </tr>
                  </table>
                  <p>Best regards,<br><img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Signature Image" style="max-width: 120px;"></p>
              </div>
          </div>
      </body>
      </html>
          `
      };



      const userMailOptions = {
        from: 'sarbesh39tiwari@gmail.com',
        to: Email,
        subject: 'We Have Received Your Query',
        text: `
    Dear ${Name},
    
    Thank you for reaching out to us. We have received your query and will get back to you as soon as possible.
    
    Here are the details of your query:
    
    Phone Number: ${phoneNumber}
    Email: ${Email}
    
    Message:
    ${user_query}
    
    Best regards,
    Star Estate,
        Riana Aurum 4th floor,
        plot no. 111, Sector 136 Noida,
        U.P. 201304
        +91 70884 70884
        `,
        html: `
    <!DOCTYPE html>
    <html>
    <head>
        <title>We Have Received Your Query</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                box-sizing: border-box;
                border: 1px solid #ddd;
                border-radius: 5px;
                background-color: #ffffff;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 20px;
            }
            .header img {
                max-width: 150px;
            }
            .header .company-info {
                text-align: right;
            }
            .banner {
                width: 100%;
                height: auto;
                margin-bottom: 20px;
            }
            .content {
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            table {
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
            }
            table td {
                border: 1px solid black;
                padding: 8px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                  <img src="https://www.starestate.in/assets/images/logo-starestate.png" style="max-width: 120px; alt="Company Logo">
                  <div class="company-info">
                       <strong>Star Estate</strong><br>
                      Riana Aurum 4th floor,<br>
                      plot no. 111, Sector 136 Noida,<br> 
                      U.P. 201304<br>
                      +91 70884 70884
                  </div>
              </div>
            <!-- Banner -->
            <img src="https://www.starestate.in/assets/images/homebanner/banner-new-4k.webp" alt="Banner Image" class="banner">
            <!-- Main Content -->
            <div class="content">
                <p>Dear <strong>${Name}</strong>,</p>
                <p>Thank you for reaching out to us. We have received your query and will get back to you as soon as possible.</p>
                <p>Here are the details of your query:</p>
                <table>
                    <tr>
                        <td><strong>Phone Number:</strong></td>
                        <td>${phoneNumber}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>${Email}</td>
                    </tr>
                    <tr>
                        <td><strong>Message:</strong></td>
                        <td>${user_query}</td>
                    </tr>
                </table>
                <p>Best regards,<br><img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Signature Image" style="max-width: 120px;"></p>
            </div>
        </div>
    </body>
    </html>
        `
    };
    

  try {
    // Send email to admin
    await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent successfully');
    
    // Send email to user
    await transporter.sendMail(userMailOptions);
    console.log('User email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendLuxuryQueryEmail = async (Name, Email, phoneNumber, projectName, user_query) => {
    const adminMailOptions = {
      from: 'sarbesh39tiwari@gmail.com',
      to: 'rahul8454454singh@gmail.com',
      subject: 'New User Query Received in Luxury Project',
      text: `
          Dear Team,
  
          We have received a new query from a user. Below are the details:
  
          Name: ${Name}
          Phone Number: ${phoneNumber}
          Email: ${Email}
          Project Name: ${projectName}
  
          Message:
          ${user_query}
  
          Best regards,
          Star Estate,
          Riana Aurum 4th floor,
          plot no. 111, Sector 136 Noida,
          U.P. 201304
          +91 70884 70884
          
              `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <title>New User Query Received in Luxury Project</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #ffffff;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 20px;
                }
                .header img {
                    max-width: 150px;
                }
                .header .company-info {
                    text-align: right;
                }
                .banner {
                    width: 100%;
                    height: auto;
                    margin-bottom: 20px;
                }
                .content {
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                table {
                    width: 100%;
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                table td {
                    border: 1px solid black;
                    padding: 8px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <img src="https://www.starestate.in/assets/images/logo-starestate.png" style="max-width: 120px; alt="Company Logo">
                    <div class="company-info">
                        <strong>Star Estate</strong><br>
                        Riana Aurum 4th floor,<br>
                        plot no. 111, Sector 136 Noida,<br> 
                        U.P. 201304<br>
                        +91 70884 70884
                    </div>
                </div>
               
                <!-- Main Content -->
                <div class="content">
                    <strong>Dear Team,</strong>
                    <p>We have received a new query from a user. Below are the details:</p>
                    <table>
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>${Name}</td>
                        </tr>
                        <tr>
                            <td><strong>Phone Number:</strong></td>
                            <td>${phoneNumber}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>${Email}</td>
                        </tr>
                        <tr>
                            <td><strong>Project Name:</strong></td>
                            <td>${projectName}</td>
                        </tr>
                        <tr>
                            <td><strong>Message:</strong></td>
                            <td>${user_query}</td>
                        </tr>
                    </table>
                    <p>Best regards,<br><img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Signature Image" style="max-width: 120px;"></p>
                </div>
            </div>
        </body>
        </html>
            `
        };
  
  
  
        const userMailOptions = {
          from: 'sarbesh39tiwari@gmail.com',
          to: Email,
          subject: 'We Have Received Your Query',
          text: `
      Dear ${Name},
      
      Thank you for reaching out to us. We have received your query and will get back to you as soon as possible.
      
      Here are the details of your query:
      
      Phone Number: ${phoneNumber}
      Email: ${Email}
      Project Name: ${projectName}
      
      Message:
      ${user_query}
      
      Best regards,
      Star Estate,
          Riana Aurum 4th floor,
          plot no. 111, Sector 136 Noida,
          U.P. 201304
          +91 70884 70884
          `,
          html: `
      <!DOCTYPE html>
      <html>
      <head>
          <title>We Have Received Your Query</title>
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  box-sizing: border-box;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  background-color: #ffffff;
              }
              .header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding-bottom: 20px;
              }
              .header img {
                  max-width: 150px;
              }
              .header .company-info {
                  text-align: right;
              }
              .banner {
                  width: 100%;
                  height: auto;
                  margin-bottom: 20px;
              }
              .content {
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  background-color: #f9f9f9;
              }
              table {
                  width: 100%;
                  border: 1px solid black;
                  border-collapse: collapse;
              }
              table td {
                  border: 1px solid black;
                  padding: 8px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <!-- Header -->
              <div class="header">
                    <img src="https://www.starestate.in/assets/images/logo-starestate.png" style="max-width: 120px; alt="Company Logo">
                    <div class="company-info">
                         <strong>Star Estate</strong><br>
                      Riana Aurum 4th floor,<br>
                      plot no. 111, Sector 136 Noida,<br> 
                      U.P. 201304<br>
                      +91 70884 70884
                    </div>
                </div>
              <!-- Banner -->
              <img src="https://www.starestate.in/assets/images/homebanner/banner-new-4k.webp" alt="Banner Image" class="banner">
              <!-- Main Content -->
              <div class="content">
                  <p>Dear <strong>${Name}</strong>,</p>
                  <p>Thank you for reaching out to us. We have received your query and will get back to you as soon as possible.</p>
                  <p>Here are the details of your query:</p>
                  <table>
                      <tr>
                          <td><strong>Phone Number:</strong></td>
                          <td>${phoneNumber}</td>
                      </tr>
                      <tr>
                          <td><strong>Email:</strong></td>
                          <td>${Email}</td>
                      </tr>
                      <tr>
                            <td><strong>Project Name:</strong></td>
                            <td>${projectName}</td>
                        </tr>
                      <tr>
                          <td><strong>Message:</strong></td>
                          <td>${user_query}</td>
                      </tr>
                  </table>
                  <p>Best regards,<br><img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Signature Image" style="max-width: 120px;"></p>
              </div>
          </div>
      </body>
      </html>
          `
      };
      
  
    try {
      // Send email to admin
      await transporter.sendMail(adminMailOptions);
      console.log('Admin email sent successfully');
      
      // Send email to user
      await transporter.sendMail(userMailOptions);
      console.log('User email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };



const sendCareerEmail = async (Name, Email, phoneNumber,  category, location) => {
  const adminMailOptions = {
    from: 'sarbesh39tiwari@gmail.com',
    to: 'rahul8454454singh@gmail.com',
    subject: 'New Job Application',
    text: `
        Dear Team,

        We have received a new Job application. Below are the details:

        Name: ${Name}
        Phone Number: ${phoneNumber}
        Email: ${Email}
        Job Category: ${category}
        Location: ${location}

        Best regards,
        Star Estate,
        Riana Aurum 4th floor,
        plot no. 111, Sector 136 Noida,
        U.P. 201304
        +91 70884 70884
    `,
    html: `
        <!DOCTYPE html>
        <html>
        <head>
            <title>New Job Application</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #ffffff;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 20px;
                }
                .header img {
                    max-width: 150px;
                }
                .header .company-info {
                    text-align: right;
                }
                .banner {
                    width: 100%;
                    height: auto;
                    margin-bottom: 20px;
                }
                .content {
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                table {
                    width: 100%;
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                table td {
                    border: 1px solid black;
                    padding: 8px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <img src="https://www.starestate.in/assets/images/logo-starestate.png" style="max-width: 120px; alt="Company Logo">
                    <div class="company-info">
                        <strong>Star Estate</strong><br>
                            Riana Aurum 4th floor,<br>
                            plot no. 111, Sector 136 Noida,<br> 
                            U.P. 201304<br>
                            +91 70884 70884
                    </div>
                </div>
                <!-- Banner -->
                <img src="https://www.starestate.in/assets/images/homebanner/banner-new-4k.webp" alt="Banner Image" class="banner">
                <!-- Main Content -->
                <div class="content">
                    <p><strong>Dear Team,</strong></p>
                    <p>We have received a new Job application. Below are the details:</p>
                    <table>
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>${Name}</td>
                        </tr>
                        <tr>
                            <td><strong>Phone Number:</strong></td>
                            <td>${phoneNumber}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>${Email}</td>
                        </tr>
                        <tr>
                            <td><strong>Job Category:</strong></td>
                            <td>${category}</td>
                        </tr>
                        <tr>
                            <td><strong>Location:</strong></td>
                            <td>${location}</td>
                        </tr>
                    </table>
                    <p>Best regards,<br><img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Signature Image" style="max-width: 120px;"></p>
                </div>
            </div>
        </body>
        </html>
            `
};


const userMailOptions = {
  from: 'sarbesh39tiwari@gmail.com',
  to: Email,
  subject: 'Application Confirmation',
  text: `
        Dear ${Name},

        Thank you for applying at Star Estate. We have received your application and will get back to you with further details shortly.

        Best regards,
        Star Estate
        Riana Aurum 4th floor,
        plot no. 111, Sector 136 Noida,
        U.P. 201304
        +91 70884 70884
  `,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Appointment Confirmation</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #ffffff;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .header .company-info {
            text-align: right;
        }
        .banner {
            width: 100%;
            height: auto;
            margin-bottom: 20px;
        }
        .content {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        table {
            width: 100%;
            border: 1px solid black;
            border-collapse: collapse;
        }
        table td {
            border: 1px solid black;
            padding: 8px;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="https://www.starestate.in/assets/images/logo-starestate.png" style="max-width: 120px; alt="Company Logo">
            <div class="company-info">
                <strong>Star Estate</strong><br>
                        Riana Aurum 4th floor,<br>
                        plot no. 111, Sector 136 Noida,<br> 
                        U.P. 201304<br>
                        +91 70884 70884
            </div>
        </div>
        <!-- Banner -->
        <img src="https://www.starestate.in/assets/images/homebanner/banner-new-4k.webp" alt="Banner Image" class="banner">
        <!-- Main Content -->
        <div class="content">
            <p>Dear <strong>${Name}</strong>,</p>
            <p>Thank you for applying for the ${category} position at Star Estate. We appreciate your interest in joining our team.</p>
            <p>We have received your application and will be reviewing it carefully. If your qualifications and experience align with the needs of the position, we will be in touch to discuss the next steps. Please allow us to review all applications and get back to you.</p>
            <p>In the meantime, if you have any questions or need further information, feel free to contact us at info@starestate.in.</p>
            <p>Thank you again for considering a career with Star Estate. We wish you the best of luck in your job search and look forward to the possibility of working together.<p>
            
            <strong>Best regards<br><img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Signature Image" style="max-width: 120px;"></strong>
        </div>
    </div>
    </body>
    </html>
    `
    };


  try {
      // Send email to admin
      await transporter.sendMail(adminMailOptions);
      console.log('Admin email sent successfully');
      
      // Send email to user
      await transporter.sendMail(userMailOptions);
      console.log('User email sent successfully');
  } catch (error) {
      console.error('Error sending email:', error);
  }
};



  module.exports = {sendQueryEmail, sendLuxuryQueryEmail, sendCareerEmail};