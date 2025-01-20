import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { signInSuccess,signInFailure,signInStart } from '../Redux/User/userSlice'
import OAuth from '../Components/OAuth'

const SignIn = () => {
  const [formData,setFormData] = useState({});
  {/*const [errorMessage,setErrorMessage] = useState(null);
  const [isLoading,setLoading] = useState(false);*/}
  const {loading , error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const handleChange = (e) => {
      setFormData({...formData , [e.target.id] : e.target.value.trim()});
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!formData.password || !formData.email){
      {/* setErrorMessage('Please fill out all fields');*/}
      return dispatch(signInFailure('Please fill out all fields'));
    }
    try {
      dispatch(signInStart());
      {/*setLoading(true);
      setErrorMessage(null);*/}
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success ===false){
        {/*return setErrorMessage(data.message);*/}
        dispatch(signInFailure(data.message));
      }
      {/*setLoading(false);*/}
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    }catch(error){
      {/*setErrorMessage(data.message);
      setLoading(false);}*/}
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/*Left Part*/}
        <div className="flex-1">
        <Link to="/" className='dark:text-white'>
            <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            satisfy-regular-xs font-bold py-5 text-center'> Memories & Stories</h1>
        </Link>
        <div className='text-xl font-medium italic mt-1 text-transparent bg-clip-text 
        bg-gradient-to-r to-emerald-600 from-sky-400 underline decoration-sky-500'>
          A Platform to share your memories & Explain your Stories
        </div>
        </div>
        {/*Right Part*/}
        <div className="flex-1">
          <div>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <Label value='Your email'></Label>
                <TextInput type='email' placeholder='example@gmail.com' id='email'onChange={handleChange}/>
              </div>
              <div>
                <Label value='Your password'></Label>
                <TextInput type='password' placeholder='*****' id='password'onChange={handleChange}/>
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                {
                  loading ? (
                    <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                    </>
                  ) : 'Sign In'
                }
              </Button>
              <OAuth/>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>
                Don't Have an Account ?
              </span>
              <Link to='/signup' className='text-blue-500'>
                Sign Up
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

export default SignIn