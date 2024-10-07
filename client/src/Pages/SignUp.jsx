import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import OAuth from '../Components/OAuth';

const SignUp = () => {
  const [formData,setFormData] = useState({});
  const [errorMessage,setErrorMessage] = useState(null);
  const [isLoading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
      setFormData({...formData , [e.target.id] : e.target.value.trim()});
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!formData.username || !formData.password || !formData.email){
      return setErrorMessage('Please fill out all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success ===false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin');
      }
    }catch(error){
      setErrorMessage(data.message);
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/*Left Part*/}
        <div className="flex-1">
        <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
            text-white'> <i>Memories</i> & <i>Stories</i></span>
        </Link>
        <div className='text-xl font-medium italic mt-6 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
          A Platform to share your memories & Explain your Stories
        </div>
        </div>
        {/*Right Part*/}
        <div className="flex-1">
          <div>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <Label value='Your username'></Label>
                <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
              </div>
              <div>
                <Label value='Your email'></Label>
                <TextInput type='email' placeholder='example@gmail.com' id='email'onChange={handleChange}/>
              </div>
              <div>
                <Label value='Your password'></Label>
                <TextInput type='password' placeholder='Password' id='password'onChange={handleChange}/>
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={isLoading}>
                {
                  isLoading ? (
                    <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                    </>
                  ) : 'Sign Up'
                }
              </Button>
              <OAuth/>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>
                Have an Account ?
              </span>
              <Link to='/signin' className='text-blue-500'>
                Sign In
              </Link>
            </div>
          </div>
          {
              errorMessage && (
                <Alert className='mt-5' color='failure'>
                  {errorMessage}
                </Alert>
                )
            }
        </div>
      </div>
    </div>
  )
}

export default SignUp