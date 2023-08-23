import clientPromise from '../lib/mongodb'

export async function CheckConnection() {
  try {
    await clientPromise // `await clientPromise` will use the default database passed in the MONGODB_URI

    return true
  } catch(e) {
    console.error(e)

    return false
  }
}