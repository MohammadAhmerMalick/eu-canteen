import sgMail from '@sendgrid/mail'

class Email {
  static send = async ({ to, name }: { to: string; name: string }) => {
    if (!process.env.SENDGRID_API_KEY) {
      console.log({ email: 'SendGrid key not found' })
      return false
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to,
      from: 'info@poolaster.com',
      subject: 'Welcome to Poolaster!',
      html: `
      <strong> Dear ${name}</strong>,
      
      <p>A warm welcome to Poolaster! We're thrilled that you've signed up with us.</p>
      <p>As a valued student member, you can look forward to exclusive offers, discounts, and a delicious dining experience.</p>
      <p>Thank you for choosing Poolaster! We can't wait to serve you.</p>
      <p>Best regards,</p>
  
      <p>The Poolaster Team</p>`,
    }

    try {
      await sgMail.send(msg)
      console.log({ email: 'success' })
      return true
    } catch (error) {
      console.error({ email: JSON.stringify(error) })
      return false
    }
  }
}

export default Email
