import {
  Para,
  Lists,
  Heading,
  SubHeading,
} from '@/components/common/ExtraaComponents'
import Footer from '@/sections/Footer'
import Header from '@/sections/Header'

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-primary-light">
      <Header />
      <main className="mx-auto mb-10 mt-6 max-w-7xl px-4 text-sm font-normal">
        <h1 className="playfair-display-regular text-center text-2xl md:text-3xl">
          <span className="text-primary">TERMS & CONDITIONS</span> <br />{' '}
          POOLASTER WEB APP
        </h1>

        <Heading>1. Acceptance of Terms</Heading>
        <Para>
          By registering and using the Poolaster Pub Osteria web App, Student
          agree to these Terms and Conditions. Please read them carefully before
          registration.
        </Para>
        <Heading>2. Eligibility</Heading>
        <Para>
          Only student&apos;s with official university email address e.g. (
          asad@unimib.it ) can register. Registration is subject to Poolaster
          team approval.
        </Para>
        <Heading>3. Registration and Account Management</Heading>
        <SubHeading>3.1 Account Registration:</SubHeading>
        <Lists>
          <li>
            Student account can be registered using the Student Name, University
            Email, WhatsApp number and Matricola number.
          </li>
          <li>
            After registration, student will receive an email having login
            password and instructions to set a new password.
          </li>
        </Lists>
        <SubHeading>3.2 Profile Updates:</SubHeading>
        <Para>
          Student can update profile picture, Name, and WhatsApp number.
          However, student Email ID and Matricola number cannot be changed after
          registration.
        </Para>
        <Heading>4. University Meal Credit System</Heading>
        <Lists>
          <li>
            Credits are updated daily if the student card is stored at the
            Poolaster restaurant.
          </li>
          <li>
            Orders can only be placed online if student have sufficient credits.
          </li>
        </Lists>
        <Heading>5. Notifications</Heading>
        <Para>
          All required updates and announcements will be shared through the
          App&apos;s notification tab.
        </Para>
        <Heading>6. Data Protection</Heading>
        <Para>
          Student data is handled as per our Privacy Policy and in compliance
          with GDPR and Italian privacy laws.
        </Para>
        <Heading>7. Termination</Heading>
        <Para>
          We reserve the right to terminate accounts that violate these terms or
          misuse the Poolaster App.
        </Para>
        <Heading>8. Contact Information</Heading>
        <Para>
          If you have any query regarding terms and conditions, please contact
          us at:{' '}
          <span className="">
            <a
              className="font-semibold text-primary"
              href="mailto:info@poolaster.com"
            >
              info@poolaster.com
            </a>{' '}
            |{' '}
            <a className="font-semibold text-primary" href="tel:+393420500567">
              +39 342 050 0567
            </a>
            .
          </span>
        </Para>
      </main>
      <Footer />
    </div>
  )
}

export default PrivacyPolicyPage
