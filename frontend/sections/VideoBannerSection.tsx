const VideoBannerSection = () => {
  return (
    <section className="-mx-96 my-10 bg-black md:my-20">
      <div className="">
        <video
          muted
          controls
          autoPlay
          width="1200"
          height="384"
          className="mx-auto w-full max-w-96"
        >
          <source src="/images/banners/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}

export default VideoBannerSection
