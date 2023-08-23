import styles from './page.module.css'
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Trick from '@/models/trick';
import { FindCursor, WithId } from 'mongodb';
import TrickCard from '@/components/trick-card';

async function getTricks() {
  try {
    const client = await clientPromise;
    const db = client.db("dev");

    const movies = await db.collection("tricks").find({}).limit(10).toArray();

    return NextResponse.json(movies);
  } catch (e) {
    console.error(e);
  }
}

export default async function Home() {
  let tricks: Trick[] = [];

  const trickData = await getTricks()
  await trickData?.json().then((data) => {
    for (const elem of data) {
      const trick = new Trick(elem.name, elem.category, elem.id);
      tricks.push(trick);

      console.log(tricks);
    }
  }).catch((e) => console.error(e))

  return (<ul>{tricks.map((trick) => (<TrickCard trick={trick} />))}</ul>)
}

