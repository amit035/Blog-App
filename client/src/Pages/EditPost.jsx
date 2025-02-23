import {Button, FileInput , TextInput , Select, Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../Firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate , useParams} from 'react-router-dom';
import { useSelector } from "react-redux";

export default function EditPost (){
  const [files,setFiles] = useState(null);
  const [imageUploadProgress,setImageUploadProgress] = useState(null);
  const [imageUploadError,setImageUploadError] = useState(null);
  const [formData,setFormData] = useState({});
  const [publishError , setPublishError] = useState(null);
  // const {postId} = useParams();
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user);
  const id = window.location.pathname.split("/").pop();

  const resetValue = async() =>{
    navigate('/dashboard?tab=posts');
  }

  const handleUploadImage = async (e) => {
    e.preventDefault();
    try {
      if(!files){
        setImageUploadError('Please upload an Image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + files.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,files);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));

        },
        (error) => {
          setImageUploadError('Image upload Failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({...formData , image: downloadURL});
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload Failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //formData.id from DB
      //currentUser.id from Browser
      const res = await fetch (`/api/post/edit-post/${id}/${currentUser.id}`,{
      // const res = await fetch (`/api/post/edit-post/${currentUser._id}/${formData._id}`,{
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message)
        console.log(data.message);
        return;
      }
      if(res.ok){
        setPublishError(null);
        navigate(`/post/${data.slug}`);
        console.log(data.message);
      }
    } catch (error) {
      setPublishError('Something went wrong');
      console.log(error.message);
    }
};

  useEffect(()=>{
    try {
        const fetchDataFromAPI = async() => {  
            // const res = await fetch(`/api/post/get-post?_id=${id}`); 
            const res = await fetch(`/api/post/get-post?_id=${id}`);
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
                setPublishError(data.message);
                return;
            }
            if(res.ok){
              setPublishError(null);
              setFormData(data.posts[0]);
              // console.log(data.posts[0]);
            }
        }
        fetchDataFromAPI();
    } catch (error) {
        console.log(error.message);
    }
  }, []);

  return (
  <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold bg-clip-text text-transparent
          bg-gradient-to-r from-pink-500 via-purple-600 to-green-500">Edit Post</h1>    
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput value={formData.title} type="text" placeholder="EDIT TITLE" required id="title"
            className="flex-1 font-medium"
            onChange={(e)=>
              setFormData({...formData , title: e.target.value})
            }
            />
            <Select
              onChange={(e)=>
                setFormData({...formData , category : e.target.value})
              }
              value={formData.category}
              className="font-medium"
            >
              <option value="uncategorized">SELECT CATEGORY</option>
              <option value="javascript">Javascript</option>
              <option value="reactJS">ReactJS</option>  
            </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted
        p-3">
          <FileInput type='file' accept="image/*" onChange={(e)=>setFiles(e.target.files[0])}/>
          <Button type="button" gradientDuoTone='purpleToBlue' size='sm' outline
          onClick={handleUploadImage} disabled={imageUploadProgress}>
          {
            imageUploadProgress ? (
            <div className="w-16 h-16">
              <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
            </div>
            ) : (
              'UPLOAD IMAGE'
            )
          }  
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {
          formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          )
        }
        <ReactQuill theme="snow" value={formData.content} placeholder="Write something..." id='ContentData' className='h-72 mb-12' required
          onChange={(value) => {
            setFormData({...formData , content : value});
          }}
        />
        <Button type="submit" gradientDuoTone='purpleToPink'>
          SAVE
        </Button>
        <Button gradientDuoTone='pinkToOrange' onClick={resetValue}>
          CANCEL
        </Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  )
}
