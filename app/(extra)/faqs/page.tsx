import Footer from '@/sections/Footer'
import Header from '@/sections/Header'
import FaqsSection from '@/sections/FaqsSection'

const FaqsPage = () => {
  return (
    <div className="bg-primary-light text-center">
      <Header />
      <main className="mx-auto mb-10 mt-6 max-w-7xl px-4 text-sm font-normal">
        <h1 className="playfair-display-regular text-center text-2xl text-primary md:text-3xl">
          FAQs
        </h1>
        <FaqsSection />
      </main>
      <Footer />
    </div>
  )
}

export default FaqsPage
