const functions = require('firebase-functions');
const LINKS_PER_PAGE  = 5;

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://hooks-news-application.firebaseio.com"
});

const db = admin.firestore();
const linkRef = db.collection('links');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/linksPagination

exports.linksPagination = functions.https.onRequest((request, response) => {
    const offset = Number(request.query.offset);
    linkRef
        .orderBy('created', 'desc')
        .limit(LINKS_PER_PAGE)
        .offset(offset)
        .get()
        .then(snapshot => {
            const links = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });
            response.json(links);
        });

    response.set('Access-Control-Allow-Origin', '*');
});
