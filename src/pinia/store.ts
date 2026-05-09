import { defineStore } from 'pinia'
import router from '../router'
import { db, auth, storage } from '../firebase/config'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ref as fbRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export const useStore = defineStore('main', {
  state: () => ({ 
    error: null as any, 
    notification: null as any,
    navActive: false,
    langMenuActive: false,
    user: null as any
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    setError(error: any) {
      this.error = error
      setTimeout(() => { this.error = null }, 8000)
    },
    setNotification(notification: any) {
      this.notification = notification
      setTimeout(() => { this.notification = null }, 8000)
    },
    async login(email: any, password: any) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        if (res) {
          this.user = res.user
          router.push('/admin')
        }
      } catch(err: any) {
        this.setError(err)
      }
    },
    async logout() {
      try {
        await signOut(auth)
        this.user = null
        router.push('/login')
      } catch (err: any) {
        this.setError(err)
      }
    },
    async getDocument(colName: string, docName: string) {
      const docRef = doc(db, colName, docName)
      const document = await getDoc(docRef)
      return document.data()
    },
    async getCollection(colName: string, ...otherLevels: string[]) {
      const processedDocs: any[] = []
      try {
        const collectionRef = collection(db, colName, ...otherLevels)
        const documents = await getDocs(collectionRef)
        documents.forEach(doc => {
          processedDocs.push({...doc.data(), id: doc.id})
        })
      } catch(err: any) {
        this.setError(err)        
      }
      return processedDocs
    },
    async storeImage(file: File) {
      try {
        const filePath = `images/${file.name}`
        const storageRef = fbRef(storage, filePath)
        await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(storageRef)
        this.setNotification(downloadURL)
        return downloadURL
      } catch (err: any) {
        this.setError(err)
      }   
    },
    async addItem(newItem: any, url: string) {
      try {
        const items = await this.getCollection('portfolio')
        const maxOrder = items.length > 0 ? Math.max(...items.map((item: any) => item.order)) : 0
        const order = maxOrder + 1
        const collectionRef = collection(db, 'portfolio')
        await addDoc(collectionRef, {
          name: newItem.name,
          tech: newItem.tech,
          href: newItem.href,
          order: order,
          imageUrl: url
        })
      } catch(err: any) {
        this.setError(err)
      }
    },
    async updateItem(item: any) {
      try {
        const docRef = doc(db, 'portfolio', item.id)
        await updateDoc(docRef, item)
        this.setNotification('Zapisano zmiany.')
      } catch (err: any) {
        this.setError(err)
      }
    },
    async deleteItem(id: string) {
      try {
        const docRef = doc(db, 'portfolio', id)
        await deleteDoc(docRef)
        this.setNotification('Dokument skasowany, id: ' + id)
      } catch (err: any) {
        this.setError(err)
      }
    }
  }
})
