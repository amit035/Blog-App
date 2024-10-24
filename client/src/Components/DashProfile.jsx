import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage'
import { app } from '../Firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
  const {currentUser} = useSelector(state=>state.user);
  const [imageFile,setImageFile] = useState(null);
  const [imageFileUrl,setImageFileUrl] = useState(null);
  const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError,setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
    {/**setImageFile(e.target.files[0]);*/}
  };
  {/**console.log(imageFile,imageFileUrl);*/}
  useEffect(()=>{
    if(imageFile){
      uploadImage();
    }
  },[imageFile]);

  const uploadImage = async () =>{
    {/**
      service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read;
        allow write: if 
        request.resource.size < 2*1024 * 1024 &&
        request.resource.contentType.matches('image/.*')
      }
    }
  }
      */}
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) =>{
        setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () =>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL);
        });
      }
    );
  };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-bold text-3xl italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        {/** Upload File */}
        <input type='file' accept='image/*' onClick={handleImageChange} ref={filePickerRef} hidden/>
        {/** Profile Picture code  ↓ */}
        <div className='relative w-32 h-32 self-center cursor-pointer' onClick={()=>filePickerRef.current.click()}>
           {imageFileUploadProgress && (
            <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
            strokeWidth={5}
            styles={{
              root : {
                width:'100',
                height:'100',
                position:'absolute',
                top :0,
                left : 0,
              },
              path : {
                stroke : `rgba(62,152,199,${imageFileUploadProgress/100})`,
              },
            }}
            />
           )}
           {/** Profile Picture ↓ */}
          <img src={imageFileUrl || currentUser.photoUrl} 
          alt="user" 
          className={`rounded-full w-full h-full border-8 border-[#36454f] object-cover 
          ${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-60'}`}/>
        </div>
        {/** Profile Picture code  ↑ */}
        {imageFileUploadError && (
          <Alert color='failure'>
              {imageFileUploadError}
          </Alert>
        )}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' gradientDuoTone='purpleToBlue'>
            update
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile