const productsData = (ids: { id: string }[]) =>
  Array(6)
    .fill(0)
    .map(() => ({
      name: 'Chinese Yakisbo ',
      image: '',
      description:
        'Lorem ipsum dolor sit amet consectetur. Nisl ipsum sit erat auctor mi tristique.',
      price: '12.00',
      categoryId: [ids[0].id],
    }))

export default productsData
