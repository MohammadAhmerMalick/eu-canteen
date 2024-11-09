// import fs from 'fs'
import path from 'path'
import { FormEvent } from 'react'
import { randomUUID } from 'crypto'
import { writeFile } from 'fs/promises'

export const classnames = (...args: unknown[]) => {
  return args
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim()
}

export const allowOnlyNumber = (event: FormEvent<HTMLInputElement>) => {
  const target = event?.currentTarget
  const value = target?.value

  target.value = value.replace(/\D/g, '')
}

export const getCookie = (name: string): string => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts?.pop()?.split(';').shift() || ''
  return ''
}

// store file locally
export const storeFileLocally = async (
  file: File,
  directoryFolder: string = ''
) => {
  // set unique name for file to upload to prevent file name conflict
  const destinationFileName = `${randomUUID()}_${file.name}`

  const directory = `public/images/${directoryFolder}`

  // // create directory if it does not exist
  // if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true })

  const fileLocalPath = path.join(
    process.cwd(),
    `${directory}${destinationFileName}`
  )

  // upload file to local
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(fileLocalPath, buffer)

  return { fileLocalPath, destinationFileName }
}
