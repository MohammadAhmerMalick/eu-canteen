import { genSaltSync, hashSync } from 'bcryptjs'

export const hashPassword = (password: string) =>
  hashSync(password, genSaltSync(10))
