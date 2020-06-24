import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as twilio from 'twilio';
import { isContext } from 'vm';

const credentials = functions.config().twilio

const client = new twilio.Twilio(credentials.sid, credentials.token);

const db = admin.firestore();

export const sendText = functions.https.onCall(async (data, context) =>
    console.log(`data: ${data}`);
    console.log(`context: ${context}`);

    const userId = context.auth.uid;

    const userRef = db.doc(`users/${userId}`);

    const userSnap = await userRef.get();
    const number = userSnap.data().phoneNumber;

    return client.messages.create({
       body: data.message,
       to: number,
       from: '+12054966651'
    });

);