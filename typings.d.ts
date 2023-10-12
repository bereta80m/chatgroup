import * as admin from 'firebase-admin'


export interface Message {
    text:string;
    createdAt:admin.firestore.Timestamp.now;
    user:{
      _id:createdAt;
      name:createdAt;
      avatar:createdAt;
  }
  }
  
  export interface MyItem {
    hidden: {
      x: number;
      transition: {
        duration: number;
      };
      opacity: number;
    };
    visible: {
      x: number;
      transition: {
        type: string;
        damping: number;
        stiffness: number;
      };
      opacity: number;
    };
  }