import { CONSTANTS } from '@/utils'
import { hashPassword } from '@/libs/bcrypt'

const usersData = [
  {
    name: 'Asad Khan',
    email: 'asad@campus.unimib.it',
    whatsapp: '390000000000',
    matricola: '',
    image: '',
    approved: true,
    password: hashPassword('123123123'),
    roleName: 'admin',
  },
  {
    name: 'John',
    whatsapp: '390000000000',
    matricola: '123123',
    image: '',
    credit: parseFloat('0').toFixed(4),
    approved: true,
    password: hashPassword('123123123'),
    roleName: CONSTANTS.roleName.student,
    email: 'johndoe@campus.unimib.it',
  },
  {
    name: 'Jane',
    whatsapp: '390000000001',
    matricola: '1123122',
    image: '',
    approved: true,
    password: hashPassword('123123123'),
    roleName: CONSTANTS.roleName.student,
    email: 'janesmith@campus.unimib.it',
  },
  {
    name: 'Bob',
    whatsapp: '390000000002',
    matricola: '2123121',
    image: '',
    approved: true,
    password: hashPassword('123123123'),
    roleName: CONSTANTS.roleName.player,
    email: 'bob@gmail.com',
  },
  {
    name: 'Emily',
    whatsapp: '390000000003',
    matricola: '3123120',
    image: '',
    approved: true,
    password: hashPassword('123123123'),
    roleName: CONSTANTS.roleName.player,
    email: 'emily@gmail.com',
  },
  {
    name: 'William',
    whatsapp: '390000000004',
    matricola: '4123119',
    image: '',
    approved: true,
    password: hashPassword('123123123'),
    roleName: CONSTANTS.roleName.player,
    email: 'william@gmail.com',
  },
]

export default usersData
