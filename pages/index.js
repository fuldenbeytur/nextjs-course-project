import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react/cjs/react.production.min";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of higly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  // data fetching for prerendering

  const client = await MongoClient.connect(
    "mongodb+srv://fuldenbeytur:SDWAHaZzo4BW5XwJ@cluster0.1ats3.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  // TODO: hwo to use meetups API?
  // const response = await fetch('api/meetups/');

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// alternative
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   // unlike getStaticProps(), this is gonna run in every incoming request
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage;
