import { env } from '$env/dynamic/public';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import {
	addDoc,
	collection,
	serverTimestamp,
	connectFirestoreEmulator,
	initializeFirestore,
	CACHE_SIZE_UNLIMITED
} from 'firebase/firestore';

// import type { DocumentReference, DocumentData } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';
import { enableMultiTabIndexedDbPersistence } from 'firebase/firestore';

const config = {
	useEmulators: env?.PUBLIC_USE_EMULATORS || false,
	region: env?.PUBLIC_REGION || '',
	firebase: {
		apiKey: env?.PUBLIC_FIREBASE_FIREBASE_APIKEY || 'AIzaSyAr6APB8WMEFw3I2dhVPOZswreZJnxJasI',
		authDomain: env?.PUBLIC_FIREBASE_AUTH_DOMAIN || 'timetable-m.firebaseapp.com',
		projectId: env?.PUBLIC_FIREBASE_PROJECT_ID || 'timetable-m',
		storageBucket: env?.PUBLIC_FIREBASE_STORAGE_BUCKET || 'timetable-m.appspot.com',
		messagingSenderId: env?.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '644634162185',
		appId: env?.PUBLIC_FIREBASE_APP_ID || '1:644634162185:web:3e2ac4c6d3e792167434d8'
	}
};

let app: FirebaseApp;

let initializedFirestore: any = null;

let connectedFirestoreEmulator = false;
let connectedAuthEmulator = false;

// These functions should be called in onMount when used in components
export const auth = () => {
	const auth = getAuth(app);

	if (config.useEmulators && !connectedAuthEmulator) {
		console.log('👓 Connecting Firebase Auth Emulator');
		connectedAuthEmulator = true;
		connectAuthEmulator(auth, 'http://localhost:9099');
	}

	return auth;
};
export const db = () => {
	if (!initializedFirestore) {
		console.log('🔥 Initializing Firestore');

		initializedFirestore = initializeFirestore(app, {
			cacheSizeBytes: CACHE_SIZE_UNLIMITED
		});
	}

	if (config.useEmulators && !connectedFirestoreEmulator) {
		console.log('👓 Connecting Firestore Emulator');
		connectedFirestoreEmulator = true;
		connectFirestoreEmulator(initializedFirestore, 'localhost', 8090);
	}

	return initializedFirestore;
};

export const initialize = async () => {
	console.log('🔥 Initializing Firebase SDK');
	console.log(config.firebase);
	app = initializeApp(config.firebase);

	try {
		
	} catch (err: any) {
		
		if (err?.code == 'failed-precondition') {
			console.warn("Couldn't enable persistence", err);
		} else if (err?.code == 'unimplemented') {
			console.warn('Persistence mode not implemented', err);
		} else {
			console.warn('Persistence mode error: ', err);
		}
	}
};

export const addMessage = async (name: string, message: string) => {
	const docRef = await addDoc(collection(db(), 'messages'), {
		name,
		message,
		time: serverTimestamp() 
	});
	console.log('Chat message written with ID: ', docRef.id);
	return docRef;
};