import clientPromise from '../lib/mongodb'

export async function Fetch() {
  try {
    await clientPromise // `await clientPromise` will use the default database passed in the MONGODB_URI

    return {
      isConnected: true
    }
  } catch(e) {
    console.error(e)

    return {
      isConnected: false
    }
  }
}