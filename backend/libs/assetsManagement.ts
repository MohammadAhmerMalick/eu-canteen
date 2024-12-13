import { join } from 'path'
import { randomUUID } from 'crypto'
import { writeFile } from 'fs/promises'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

// export const assetsBaseUrl =
//   'https://res.cloudinary.com/dnu2o9j8f/image/upload/v1733138863/'
export const assetsBaseUrl =
  'https://res.cloudinary.com/dhpsasm22/image/upload/v1733138863/'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// //////////////////
// Cloudinary Upload
// //////////////////
interface uploadToCloudinayProps {
  name: string
  folder?: string
  imagePath: string
}
export const uploadToCloudinay = async ({
  name,
  imagePath,
  folder = '',
}: uploadToCloudinayProps): Promise<UploadApiResponse | null> => {
  const options = {
    use_filename: true,
    filename_override: name,
    folder: `EU_CANTEEN/${folder}`,
  }

  try {
    return cloudinary.uploader.upload(imagePath, options)
  } catch (error) {
    console.error(error)
  }
  return null
}

// /////////////
// Local Upload
// /////////////
export const storeFileLocally = async (file: File) => {
  // set unique name for file to upload to prevent file name conflict
  const name = `${randomUUID()}_${file.name}`

  const imagePath =
    process.env.NODE_ENV === 'production'
      ? join('/tmp', name)
      : join(process.cwd(), '/tmp', name)

  // upload file to local
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(imagePath, buffer)

  return { imagePath, name }
}
