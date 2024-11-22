import {Button, FileInput , TextInput , Select } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function CreatePost (){

  return <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold bg-clip-text text-transparent
          bg-gradient-to-r from-pink-500 via-purple-600 to-green-500">Create a Post</h1>    
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type="text" placeholder="TITLE" required id="title"
            className="flex-1"/>
            <Select>
              <option value="uncategorized">SELECT CATEGORY</option>
              <option value="javascript">Javascript</option>
              <option value="reactJS">ReactJS</option>  
            </Select>
            {/* <select className='rounded-lg bg-gray-700 outline-none'>
              <option value="someOption">Select a Category</option>
              <option value="Javascript"><FaJsSquare/>Javascript</option>
              <option value="reactJs">ReactJs</option>
              <option value="mongoDB">MongoDB</option>
            </select> */}
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted
        p-3">
          <FileInput type='file' accept="image/*"/>
          <Button type="button" gradientDuoTone='purpleToBlue' size='sm' outline>UPLOAD IMAGE</Button>
        </div>
        <ReactQuill theme="snow" placeholder="Write something..." className='h-72 mb-12' required/>
        <Button type="submit" gradientDuoTone='purpleToPink'>
          PUBLISH
        </Button>
      </form>
    </div>;
}
