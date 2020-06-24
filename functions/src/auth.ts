import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const createUserRecord = functions.auth
    .user()
    .onCreate((user, context) => {
        const userRef = db.doc(`users/${user.uid}`);
        console.log(context);
        console.log(user);

        return userRef.set({
            name: user.displayName,
            createdAt: context.timestamp,
            userObj: user,
            contextObj: context,
            nickname: 'bubba'
        });
    });