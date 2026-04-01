import mongoose from 'mongoose'
import { Readable } from 'stream'

const { GridFSBucket, ObjectId } = mongoose.mongo

export async function uploadFileToGridFS(buffer: Buffer, filename: string, mimeType: string) {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('MongoDB connection is not ready')
  }
  if (!mongoose.connection.db) {
    throw new Error('MongoDB database connection is not available')
  }
  const bucket = new GridFSBucket(mongoose.connection.db as any, { bucketName: 'uploads' })
  const uploadStream = bucket.openUploadStream(filename, {
    metadata: { mimeType },
  })
  const readableStream = Readable.from(buffer)

  return new Promise((resolve, reject) => {
    readableStream
      .pipe(uploadStream)
      .on('error', reject)
      .on('finish', () => resolve(uploadStream.id))
  })
}

export async function deleteFileFromGridFS(fileId: string) {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('MongoDB connection is not ready')
  }
  if (!mongoose.connection.db) {
    throw new Error('MongoDB database connection is not available')
  }
  const bucket = new GridFSBucket(mongoose.connection.db as any, { bucketName: 'uploads' })
  await bucket.delete(new ObjectId(fileId))
}

export async function getFileFromGridFS(fileId: string) {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('MongoDB connection is not ready')
  }
  if (!mongoose.connection.db) {
    throw new Error('MongoDB database connection is not available')
  }
  const bucket = new GridFSBucket(mongoose.connection.db as any, { bucketName: 'uploads' })
  const downloadStream = bucket.openDownloadStream(new ObjectId(fileId))
  
  return new Promise<{ buffer: Buffer; metadata?: any }>((resolve, reject) => {
    const chunks: Buffer[] = []
    let metadata: any = null
    
    downloadStream
      .on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      .on('error', reject)
      .on('end', () => {
        const buffer = Buffer.concat(chunks)
        resolve({ buffer, metadata })
      })
  })
}
