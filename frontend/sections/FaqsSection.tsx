'use client'

import { DisclosureGroup } from 'react-aria-components'

import Accordion from '@/components/common/Accordion'
import { Heading } from '@/components/common/ExtraaComponents'

const url = 'www.poolaster.com'

const FaqsSection = () => {
  return (
    <section>
      <Heading className="mb-2 mt-4">General Information</Heading>
      <DisclosureGroup className="grid gap-4" defaultExpandedKeys={['webApp']}>
        <Accordion id="webApp" heading="1. What is the Poolaster web App?">
          The Poolaster web App is an online platform designed for the
          University of Milano Bicocca students to order Meals, manage Takeaway,
          track Credits and get instant updates through notifications from the
          Poolaster team.
        </Accordion>
        <Accordion
          id="Restaurant"
          heading="2. Who can use the Restaurant web App?"
        >
          Only students with an official university email ID e.g., (
          asad.khan@unimib.it ) can register and use the App.
        </Accordion>
        <Accordion id="freeApp" heading="3. Is the App free to use?">
          Yes, the App is free, but you need sufficient credits in your account
          to make purchases.
        </Accordion>
      </DisclosureGroup>

      <Heading className="mb-2 mt-8">Registration and Login</Heading>
      <DisclosureGroup
        className="grid gap-4"
        defaultExpandedKeys={['register']}
      >
        <Accordion
          id="register"
          heading="4. How can I register on the Poolaster web App?"
        >
          Please submit basic registration details through{' '}
          <a
            className="font-semibold text-primary"
            href={`https://${url}/register`}
          >
            This link
          </a>{' '}
          the “Register Here” button on the website or{' '}
          <a className="font-semibold text-primary" href={`https://${url}`}>
            {url}
          </a>
          . You will receive a notification on your university email with login
          details and a link to set your password.
        </Accordion>
        <Accordion
          id="information"
          heading="5. What information is required for registration?"
        >
          Your Name, University Email, WhatsApp Number, and Matricola Number
          (student ID number) are needed.
        </Accordion>
        <Accordion
          id="emailId"
          heading="6. Can I change my student Email ID after registration?"
        >
          No, the student Email ID used for registration cannot be changed.
        </Accordion>
        <Accordion
          id="password"
          heading="7. What should I do if I forget my password?"
        >
          Use the &quot;Forgot Password&quot; link on the login page to reset
          your password through your official email.
        </Accordion>
        <Accordion
          id="profil"
          heading="8. Can I update my profile information?"
        >
          You can update your Name, WhatsApp Number and Profile photo, if
          necessary.
        </Accordion>
      </DisclosureGroup>

      <Heading className="mb-2 mt-8">Credits</Heading>
      <DisclosureGroup
        className="grid gap-4"
        defaultExpandedKeys={['creditsAccount']}
      >
        <Accordion
          id="creditsAccount"
          heading="9. How do I get credits in my account?"
        >
          Credits are added automatically e.g., ( € 11/day ) if your student
          card is stored at the Poolaster.
        </Accordion>
        <Accordion
          id="enoughCredits"
          heading="10. What happens if I don’t have enough credits?"
        >
          You can not place an order.
        </Accordion>
        <Accordion id="addCredits" heading="11. Can I Add my credits manually?">
          No, credits are managed entirely by the Poolaster Team.
        </Accordion>
      </DisclosureGroup>

      <Heading className="mb-2 mt-8">Ordering Process</Heading>
      <DisclosureGroup className="grid gap-4" defaultExpandedKeys={['order']}>
        <Accordion id="order" heading="12. How do I place an order?">
          Select a product, choose your preferred order type (Dine-In OR
          Takeaway), and place your order if you have enough credits.
        </Accordion>
        <Accordion
          id="placing"
          heading="13. Can I cancel my order after placing it?"
        >
          No, orders cannot be canceled once placed, if you want to cancel the
          order please WhatsApp within 5 minutes.
        </Accordion>
        <Accordion
          id="orderReady"
          heading="14. How will I know if my order is ready?"
        >
          Once you placed your order, you can check your order status in the
          &quot;My Order&quot; section after 10-30 minutes. The restaurant will
          update it to &quot;Ready or Cancel&quot;.
        </Accordion>
        <Accordion
          id="restautant"
          heading="15. What happens if my order is canceled by the restaurant?"
        >
          If an order is canceled by the Poolaster, your credits will be
          refunded automatically in your account.
        </Accordion>
        <Accordion
          id="changeOrder"
          heading="16. Can I change my order after placing it?"
        >
          You can change the order within 5 minutes by sending your order
          screenshot on WhatsApp to Poolaster ( +39 342 050 0567 ). After that,
          it is not possible.
        </Accordion>
      </DisclosureGroup>

      <Heading className="mb-2 mt-8">Notifications</Heading>
      <DisclosureGroup className="grid gap-4" defaultExpandedKeys={['receive']}>
        <Accordion
          id="receive"
          heading="17. How will I receive updates or announcements by Poolaster?"
        >
          Any updates will be sent by the notification section on the App.
        </Accordion>
        <Accordion
          id="notifications"
          heading="18. Can I turn off notifications?"
        >
          No, notifications are managed by the restaurant and are essential for
          updates.
        </Accordion>
      </DisclosureGroup>

      <Heading className="mb-2 mt-8">Data Security and Privacy</Heading>
      <DisclosureGroup className="grid gap-4" defaultExpandedKeys={['secure']}>
        <Accordion id="secure" heading="19. Is my data secure on the App?">
          Yes, all student data is handled in compliance with GDPR and Italian
          data protection laws.
        </Accordion>
        <Accordion id="access" heading="20. Who can access my data?">
          Only authorized team members of the Poolaster project have access to
          your data for operational purposes.
        </Accordion>
      </DisclosureGroup>

      <Heading className="mb-2 mt-8">Technical Issues</Heading>
      <DisclosureGroup
        className="grid gap-4"
        defaultExpandedKeys={['technical']}
      >
        <Accordion
          id="technical"
          heading="21. What should I do if I face technical issues while using the App?"
        >
          Please WhatsApp ( +39 344 547 4757 ) for technical assistance.
        </Accordion>
        <Accordion
          id="device"
          heading="22. Can I access the App from any device?"
        >
          Yes, the App is accessible from any device with an internet
          connection.
        </Accordion>
        <Accordion
          id="registration"
          heading="23. What if I don’t receive my registration email?"
        >
          Check your Spam / Junk folder or WhatsApp ( +39 344 547 4757 ) for
          assistance.
        </Accordion>
      </DisclosureGroup>
    </section>
  )
}

export default FaqsSection
