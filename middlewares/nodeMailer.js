const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sarbesh39tiwari@gmail.com',
    pass: 'osxpialbinrjkhht'
  }
});


const sendQueryEmail = async ( Name, Email, phoneNumber, projectName, utm_source, utm_medium, utm_campaign, utm_term, utm_content) => {
    
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
        Project Name:  ${projectName}
        UTM Source: ${utm_source}
        UTM Medium: ${utm_medium}
        UTM Campaign: ${utm_campaign}
        UTM Term: ${utm_term}
        UTM Content: ${utm_content}
      
       

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
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2px solid #F7941E;
                padding-bottom: 15px;
            }
            .header img {
                max-width: 150px;
            }
            .company-info {
                text-align: right;
                color: #666;
                font-size: 12px;
            }
            .content {
                margin-top: 20px;
            }
            .content strong {
                font-size: 16px;
                color: #333;
            }
            .content p {
                font-size: 14px;
                color: #555;
                line-height: 1.6;
            }
            table {
                width: 100%;
                margin-top: 20px;
                border-collapse: collapse;
                font-size: 14px;
                color: #333;
            }
            table th, table td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
            }
            table th {
                background-color: #f9f9f9;
                font-weight: bold;
            }
            .footer {
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #ddd;
                text-align: center;
            }
            .footer img {
                margin-top: 10px;
                max-width: 120px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Company Logo">
                <div class="company-info">
                    <strong>Star Estate</strong><br>
                    Riana Aurum, 4th Floor<br>
                    Plot No. 111, Sector 136 Noida<br>
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
                        <th>Name</th>
                        <td>${Name}</td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>${phoneNumber}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>${Email}</td>
                    </tr>
                    <tr>
                        <th>UTM Source</th>
                        <td>${utm_source}</td>
                    </tr>
                    <tr>
                        <th>UTM Medium</th>
                        <td>${utm_medium}</td>
                    </tr>
                    <tr>
                        <th>UTM Campaign</th>
                        <td>${utm_campaign}</td>
                    </tr>
                    <tr>
                        <th>UTM Term</th>
                        <td>${utm_term}</td>
                    </tr>
                    <tr>
                        <th>UTM Content</th>
                        <td>${utm_content}</td>
                    </tr>
                    <tr>
                        <th>Project Name</th>
                        <td>${projectName}</td>
                    </tr>
                </table>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p>Best regards,</p>
                <img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Star Estate Logo">
            </div>
        </div>
    </body>
    </html>`
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
            
            Project Name:
            ${projectName}
            
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
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 40px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #F7941E;
                    padding-bottom: 15px;
                }
                .header img {
                    max-width: 150px;
                }
                .company-info {
                    text-align: right;
                    font-size: 12px;
                    color: #666;
                }
                .banner {
                    width: 100%;
                    height: auto;
                    margin: 20px 0;
                    border-radius: 5px;
                    overflow: hidden;
                }
                .content {
                    margin-top: 20px;
                }
                .content p {
                    font-size: 14px;
                    color: #555;
                    line-height: 1.6;
                }
                table {
                    width: 100%;
                    margin-top: 20px;
                    border-collapse: collapse;
                    font-size: 14px;
                    color: #333;
                }
                table th, table td {
                    padding: 10px;
                    border: 1px solid #ddd;
                    text-align: left;
                }
                table th {
                    background-color: #f9f9f9;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                }
                .footer img {
                    margin-top: 10px;
                    max-width: 120px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Company Logo">
                    <div class="company-info">
                        <strong>Star Estate</strong><br>
                        Riana Aurum, 4th Floor<br>
                        Plot No. 111, Sector 136 Noida<br>
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

                    <!-- Query Details Table -->
                    <table>
                        <tr>
                            <th>Phone Number</th>
                            <td>${phoneNumber}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${Email}</td>
                        </tr>
                        <tr>
                            <th>Project Name</th>
                            <td>${projectName}</td>
                        </tr>
                    </table>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <p>Best regards,</p>
                    <img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Signature Image">
                </div>
            </div>
        </body>
        </html>`
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

const sendContactUsEmail = async (Name, Email, phoneNumber, user_query, utm_source, utm_medium, utm_campaign, utm_term, utm_content) => {
    
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
        UTM Source: ${utm_source}
        UTM Medium: ${utm_medium}
        UTM Campaign: ${utm_campaign}
        UTM Term: ${utm_term}
        UTM Content: ${utm_content}

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
                    <img src="https://www.starestate.in/assets/images/logo-starestate.png" style="max-width: 120px;" alt="Company Logo">
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
                            <td><strong>UTM Source:</strong></td>
                            <td>${utm_source}</td>
                        </tr>
                        <tr>
                            <td><strong>UTM Medium:</strong></td>
                            <td>${utm_medium}</td>
                        </tr>
                        <tr>
                            <td><strong>UTM Campaign:</strong></td>
                            <td>${utm_campaign}</td>
                        </tr>
                        <tr>
                            <td><strong>UTM Term:</strong></td>
                            <td>${utm_term}</td>
                        </tr>
                        <tr>
                            <td><strong>UTM Content:</strong></td>
                            <td>${utm_content}</td>
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
        </html>`
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
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 40px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 2px solid #F7941E;
                        padding-bottom: 15px;
                    }
                    .header img {
                        max-width: 120px;
                    }
                    .company-info {
                        text-align: right;
                        font-size: 12px;
                        color: #666;
                    }
                    .banner {
                        width: 100%;
                        height: auto;
                        margin: 20px 0;
                        border-radius: 5px;
                        overflow: hidden;
                    }
                    .content {
                        margin-top: 20px;
                    }
                    .content p {
                        font-size: 14px;
                        color: #555;
                        line-height: 1.6;
                    }
                    table {
                        width: 100%;
                        margin-top: 20px;
                        border-collapse: collapse;
                        font-size: 14px;
                        color: #333;
                    }
                    table th, table td {
                        padding: 12px;
                        border: 1px solid #ddd;
                        text-align: left;
                    }
                    table th {
                        background-color: #f9f9f9;
                        font-weight: bold;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                    }
                    .footer img {
                        margin-top: 10px;
                        max-width: 120px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <!-- Header -->
                    <div class="header">
                        <img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Company Logo">
                        <div class="company-info">
                            <strong>Star Estate</strong><br>
                            Riana Aurum, 4th Floor<br>
                            Plot No. 111, Sector 136 Noida<br>
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

                        <!-- Query Details Table -->
                        <table>
                            <tr>
                                <th>Phone Number</th>
                                <td>${phoneNumber}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>${Email}</td>
                            </tr>
                            <tr>
                                <th>Message</th>
                                <td>${user_query}</td>
                            </tr>
                        </table>
                    </div>

                    <!-- Footer -->
                    <div class="footer">
                        <p>Best regards,</p>
                        <img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Signature Image">
                    </div>
                </div>
            </body>
            </html>`
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

const sendCareerEmail = async (Name, Email, phoneNumber,  category, location, utm_source, utm_medium, utm_campaign, utm_term, utm_content) => {
  
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
        UTM Source: ${utm_source}
        UTM Medium: ${utm_medium}
        UTM Campaign: ${utm_campaign}
        UTM Term: ${utm_term}
        UTM Content: ${utm_content}

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
                         <tr>
                        <td><strong>UTM Source:</strong></td>
                        <td>${utm_source}</td>
                    </tr>
                    <tr>
                        <td><strong>UTM Medium:</strong></td>
                        <td>${utm_medium}</td>
                    </tr>
                    <tr>
                        <td><strong>UTM Campaign:</strong></td>
                        <td>${utm_campaign}</td>
                    </tr>
                    <tr>
                        <td><strong>UTM Term:</strong></td>
                        <td>${utm_term}</td>
                    </tr>
                    <tr>
                        <td><strong>UTM Content:</strong></td>
                        <td>${utm_content}</td>
                    </tr>
                    </table>
                    <p>Best regards,<br><img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Signature Image" style="max-width: 120px;"></p>
                </div>
            </div>
        </body>
    </html>`
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
            <title>Application Received</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 30px auto;
                    padding: 20px;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: #ffffff;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #ddd;
                }
                .header img {
                    max-width: 120px;
                }
                .company-info {
                    text-align: right;
                    font-size: 14px;
                    color: #555;
                }
                .content {
                    padding-top: 20px;
                }
                .content p {
                    font-size: 16px;
                    color: #333;
                    line-height: 1.6;
                }
                .footer {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    text-align: center;
                }
                .footer img {
                    max-width: 120px;
                    margin-top: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Star Estate Logo">
                    <div class="company-info">
                        <strong>Star Estate</strong><br>
                        Riana Aurum 4th floor,<br>
                        Plot No. 111, Sector 136 Noida,<br> 
                        U.P. 201304<br>
                        +91 70884 70884
                    </div>
                </div>

                <!-- Main Content -->
                <div class="content">
                    <p>Dear <strong>${Name}</strong>,</p>
                    <p>Thank you for your interest in the <strong>${category}</strong> position at Star Estate. We have received your application and will review it carefully.</p>
                    <p>If your qualifications align with our needs, we will reach out to discuss the next steps. Please allow us some time to review all applications.</p>
                    <p>In the meantime, if you have any questions or require further information, feel free to contact us at <a href="mailto:info@starestate.in">info@starestate.in</a>.</p>
                    <p>Thank you again for considering a career with us. We wish you the best of luck in your job search and hope to connect with you soon.</p>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <strong>Best regards,</strong><br>
                    The Star Estate Team<br>
                    <img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Star Estate Signature">
                </div>
            </div>
        </body>
        </html>`
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


module.exports = {sendQueryEmail, sendContactUsEmail, sendCareerEmail};