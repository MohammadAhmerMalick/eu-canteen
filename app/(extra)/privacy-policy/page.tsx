import {
  Para,
  Lists,
  Heading,
  SubHeading,
} from '@/components/common/ExtraaComponents'
import Footer from '@/sections/Footer'
import Header from '@/sections/Header'

const termsandconditionsPage = () => {
  return (
    <div className="bg-primary-light">
      <Header />
      <main className="mx-auto mb-10 mt-6 max-w-7xl px-4 text-sm font-normal">
        <h1 className="playfair-display-regular text-center text-2xl md:text-3xl">
          <span className="text-primary">PRIVACY POLICY</span> <br /> POOLASTER
          WEB APP
        </h1>
        <h2 className="mx-auto mt-4 max-w-xl text-center text-sm font-normal md:text-lg md:font-semibold">
          Information on the processing of personal data pursuant to art. 13 of
          Regulation (EU) no. 2016/679
        </h2>

        <Heading>1. General Information</Heading>
        <Para>
          This web application is licensed to Poolaster Pub Osteria - located at
          Via Comasina 115, 20161 Milan, Italy and is a copyright product of
          Asmeron (Pvt.) Ltd.
        </Para>
        <Heading>2. Collection and Use of Personal Data</Heading>
        <SubHeading>2.1 Data Requirement:</SubHeading>
        <Para>
          When student register, we only require necessary information to manage
          the Poolaster App:
        </Para>
        <Lists>
          <li>Full Name.</li>
          <li>University email address e.g., ( asad@unimib.it ).</li>
          <li>WhatsApp number.</li>
          <li>Matricola number ( student ID ).</li>
        </Lists>
        <Para>
          This data provides access to the app, process orders and manages
          student credits.
        </Para>
        <SubHeading>2.2. Data Use and Management:</SubHeading>
        <Para>
          The personal data is managed by the Poolaster web team and used for
          the following purposes:
        </Para>
        <Lists>
          <li>To enable student online meal ordering system.</li>
          <li>To record student university scholarship meal credits.</li>
          <li>To notify student about order status and updates.</li>
          <li>To provide customer support and prevent technical issues.</li>
          <li>To monitor usage and improve app performance.</li>
        </Lists>
        <Heading>3. Student Data Protection</Heading>
        <Para>
          We handle student data and ensure privacy and confidentiality,
          ensuring compliance with GDPR and the Italian Privacy Code
          (Legislative Decree No. 196/2003).
        </Para>
        <Lists>
          <li>
            Student&apos;s data is only processed for the purpose of using the
            Poolaster App.
          </li>
          <li>
            Data related to scholarship meal credits and orders is kept secure
            and confidential.
          </li>
          <li>
            No personal data is shared with any third parties unless required by
            law.
          </li>
        </Lists>
        <Heading>4. Partnership Agreement</Heading>
        <Para>
          To maintain our web App technical functionality and enable the data
          processing operations, we partner with Asmeron (Pvt.) Ltd who is bound
          to comply with applicable data protection regulations.
        </Para>
        <Heading>5. Contact Information</Heading>
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

export default termsandconditionsPage
