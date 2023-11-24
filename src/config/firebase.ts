import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgNRFLyyQ3ryI3pfcAu6x6G-W5NR_h5Ag",
  authDomain: "todomate-f955d.firebaseapp.com",
  projectId: "todomate-f955d",
  storageBucket: "todomate-f955d.appspot.com",
  messagingSenderId: "978333209103",
  appId: "1:978333209103:web:706f2b0b4c6960974d097a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

{
  /*
  users (collection) : {
    uniqueID (auto generated) : {
      name ( a field for users collection, i doubt if it's necessary ),
        todos (subcollection) : {
          uniqueID (auto generated) : {
            title: string,
            description: string,
            tags: string[],
            createdAt: Date,
            isCompleted: boolean,
          }
        }

        tags (subcollection) : {
          uniqueID (auto generated) : {
            name: string,
          }
        }
    }
  }
  */
  /*
    public
    src
      assets
      components
        Addtags.tsx
        AddTodo.tsx
        CreateTag.tsx
        InputField.tsx
        Navbar.tsx
        Sidebar.tsx
        SidebarItems.tsx
        Tag.tsx
        Todo.tsx
        Todos.tsx
      config
        firebase.ts
      mockData
        todos.ts
      pages
        About.tsx
        Archieve.tsx
        ErrorPage.tsx
        Home.tsx
        Login.tsx
        Overview.tsx
        Settings.tsx
        Today.tsx
        Trash.tsx
      Routing
        PrivateRoutes.tsx
        routes.tsx
      App.css
      App.tsx
      Layout.tsx
      main.tsx
      theme.tsx
    
  */
}
