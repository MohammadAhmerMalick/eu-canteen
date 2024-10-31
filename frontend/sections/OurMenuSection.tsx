import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'

const menu = [
  {
    id: 1,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
  },
  {
    id: 2,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
  },
  {
    id: 3,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
  },
]
const OurMenuSection = () => {
  return (
    <section className="grid justify-center gap-4 text-center">
      <SectionHeading>Our Menu</SectionHeading>
      <div className="grid gap-1">
        <p>Menu completo: primo + secondo + contorno e acqua = 11€</p>
        <p>Menu primo: primo + acqua = 6€</p>
        <p>Menu secondo: secondo + contorno + acqua = 8€</p>
        <p>Menu studenti: Piatto unico = 7,50€</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {menu.map(({ id }) => (
          <div key={id} className="w-full rounded-3xl bg-white p-1 shadow-lg">
            <h3>PRIMI €5</h3>
            <p>Gnocchi burro e salvia Gnocchi with butter and sage</p>
            <p>Mezze manic he al ragu Pasta al ragu</p>
            <Button>Buy Now</Button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurMenuSection
