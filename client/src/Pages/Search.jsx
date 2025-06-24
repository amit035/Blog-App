import {Button, Select, TextInput} from 'flowbite-react'
import { useEffect, useState } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import PostCard from '../Components/PostCard';

export default function Search() {
  const [searchData , setSearchData] = useState({
    searched:'',
    sort:'desc',
    category:'uncategorized',
  });
  console.log(searchData);

  const [posts , setPosts] = useState([]);
  const [loading , setLoading] = useState(false);
  const [showMore , setShowMore] = useState(false);
  const location = useLocation();
  const navigate = new useNavigate();

  useEffect (() => {
    const urlParams = new URLSearchParams(location.search);
    const searchKeyWordFromURL = urlParams.get('search');
    const sortFromURL = urlParams.get('sort');
    const categoryFromURL = urlParams.get('category');
    if(searchKeyWordFromURL || sortFromURL || categoryFromURL){
      setSearchData({
        ...searchData,
        searched:searchKeyWordFromURL,
        sort:sortFromURL,
        category:categoryFromURL,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      console.log(searchQuery);
      const res = await fetch(`/api/post/get-post?${searchQuery}`);
      if(!res.ok){
        setLoading(false);
        return;
      }
      if(res.ok){
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if(data.posts.length === 9){
          setShowMore(true);
        }else{
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  },[location.search]);

  const searchFunction = (e) => {
    if(e.target.id === 'search'){
      setSearchData({ ...searchData , searched : e.target.value});
    }
    if(e.target.id === 'sort'){
      const order = e.target.value || 'desc';
      setSearchData({...searchData , sort:order})
    }
    if(e.target.id === 'category'){
      const category = e.target.value || 'uncategorized';
      setSearchData({...searchData, category});
    }
  };

  const submitFunction = (e) => {

    e.preventDefault();
    const URLParams = new URLSearchParams(location.search);
    URLParams.set('search',searchData.searched);
    URLParams.set('sort',searchData.sort);
    URLParams.set('category',searchData.category);
    const searchQuery = URLParams.toString();
    navigate(`/search?${searchQuery}`);

  };

  const showMoreFunction = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex',startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/get-post?${searchQuery}`);
    if(!res.ok){
      return;
    }

    if(res.ok){
      const data = await res.json();
      setPosts([...posts,...data.posts]);
      if(data.posts.length === 9){
        setShowMore(true);
      }else{
        setShowMore(false);
      }
    }

  }

  return <div className='flex flex-col md:flex-row'>
    <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500"> 
      <form className='flex flex-col gap-8' onSubmit={submitFunction}>
        <div className='flex items-center gap-2'>
          <label className='whitespace-nowrap font-semibold'>
            Search Keyword
          </label>
          <TextInput placeholder='Search...'
          id='search'
          type='text'
          value={searchData.searched}
          onChange={searchFunction}
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='font-semibold'>Sort:</label>
          <Select onChange={searchFunction} defaultValue={searchData.sort} id='sort'>
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <label className='font-semibold'>Category:</label>
          <Select onChange={searchFunction} defaultValue={searchData.category} id='category'>
            <option value="uncategorized">Uncategorized</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
            <option value="javascript">Javascript</option>
          </Select>
        </div>
      <Button type='submit' outline gradientDuoTone='purpleToPink'>
          Search
      </Button>
      </form>
    </div>
    {/**Search Results*/}
    <div className='w-full'>
       <h1 className='text-3xl lobster-regular font-semibold sm:border-b border-gray-500 p-3 mt-5'>Search Results</h1>
       <div className='p-7 flex flex-wrap gap-4'>
          {
            !loading && posts.length === 0 && (<p className='text-xl text-gray-500'>
              No Post Found !
            </p>
          )}
          {
            loading && 
              <p className='text-xl text-gray-500'>Loading...</p>
          }
          {
            !loading && posts && posts.map((post)=><PostCard key={post._id} post={post}/>)
          }
          {
            showMore && <button className='text-teal-500 text-lg hover:underline p-7 w-full lobster-regular'
            onClick={showMoreFunction}>
              Show More
            </button>
          }
       </div> 
    </div>
  </div>
}
