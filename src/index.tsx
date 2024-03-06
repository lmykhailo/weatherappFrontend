import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'
import { Firestore, getFirestore } from 'firebase/firestore'

const app = initializeApp({
  apiKey: 'AIzaSyDe6ta55WZFUNC-0VbKBcf3DkbIXIm7PDs',
  authDomain: 'weatherappproject-bc43d.firebaseapp.com',
  projectId: 'weatherappproject-bc43d',
  storageBucket: 'weatherappproject-bc43d.appspot.com',
  messagingSenderId: '813744487005',
  appId: '1:813744487005:web:af46ce7542182fd50febb4',
  measurementId: 'G-DQLWGY3H64',
})

type ContextType = {
  firebase: FirebaseApp
  firestore: Firestore
  auth: Auth
}

export const Context = createContext<ContextType | null>(null)

const auth = getAuth()
const firestore = getFirestore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Context.Provider value={{ firebase: app, firestore, auth }}>
    <App />
  </Context.Provider>
)
