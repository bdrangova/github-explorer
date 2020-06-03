import * as firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);

const githubAuth = async () => {
  await import('firebase/auth');
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope('repo');

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      return result.credential.accessToken;
    })
    .catch((error) => {
      return error;
    });
};

const githubSignout = async () => {
  await import('firebase/auth');
  return firebase
    .auth()
    .signOut()
    .then(() => {
      return {
        status: 'ok',
      };
    })
    .catch((error) => {
      return {
        status: 'error',
      };
    });
};

export const FirebaseService = {
  githubAuth,
  githubSignout,
};
