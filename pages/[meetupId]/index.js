import { DUMMMY_MEETUPS } from "..";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  const { meetupData } = props;
  if (!meetupData) {
    return <div>No data found</div>;
  }

  return <>
  <Head>
    <title>{meetupData.title}</title>
    <meta title="description" content="A meetup page" />
  </Head>
  <MeetupDetail meetupData={meetupData} />;
  </>
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://imobalaz:imobalaz@cluster0.he400wt.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),

    fallback: false,
  };
};

export const getStaticProps = async(context) => {
  const meetupId = context.params.meetupId;
    const client = await MongoClient.connect(
    "mongodb+srv://imobalaz:imobalaz@cluster0.he400wt.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetupData = await meetupsCollection.findOne({_id: ObjectId(meetupId)})


  client.close();
  return {
    props: {
      meetupData: {
        id: meetupData._id.toString(),
        title: meetupData.title,
        image: meetupData.image,
        address: meetupData.address,
        description: meetupData.description
      },
    },
  };
};

export default MeetupDetails;
