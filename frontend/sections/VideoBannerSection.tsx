import Image from 'next/image'

const VideoBannerSection = () => {
  return (
    <section className="pt-20">
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
