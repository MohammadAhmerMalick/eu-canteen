import Image from 'next/image'

const VideoBannerSection = () => {
  return (
    <section className="my-10 md:my-20">
      <Image
        width={1920}
        height={900}
        alt="Video"
        src="/images/banners/video.png"
      />
    </section>
  )
}

export default VideoBannerSection
