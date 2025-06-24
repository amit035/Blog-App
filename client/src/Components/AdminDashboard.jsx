import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import { FaUsers } from "react-icons/fa";
import { AiFillCaretUp } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import { AiFillFileImage } from "react-icons/ai";
import {Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react';
import {Link} from 'react-router-dom'

export default function AdminDashboard() {
  const [users,setUsers] = useState([]);
  const [comments,setComments] = useState([]);
  const [posts,setPosts] = useState([]);
  const [totalUsers,setTotalUsers] = useState(0);
  const [totalPosts , setTotalPosts] = useState(0);
  const [totalComments,setTotalComments] = useState(0);
  const [lastMonthUsers , setLastMonthUsers] = useState(0);
  const [lastMonthComments , setLastMonthComments] = useState(0);
  const [lastMonthPosts , setLastMonthPosts] = useState(0);
  const {currentUser} = useSelector((state) => state.user)
  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/get-users?limit=5');
        const data = await res.json();
        if(res.ok){
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        // console.log(error.message);
      }
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/get-post?limit=5');
        const data = await res.json();
        if(res.ok){
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/get-comments?limit=5');
        const data = await res.json();
        if(res.ok){
          setComments(data.comments);
          setTotalUsers(data.totalPosts);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if(currentUser.isAdmin){
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  },[currentUser]);
  return (
    <div className="p-3 md:mx-auto">
      {/* Three Cards */}
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div>
            <h3 className="text-gray-500 text-base uppercase">Total Users</h3>
            <p className="text-2xl">{totalUsers}</p>
          </div>
          <FaUsers className="bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg"/>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-green-500 flex items-center">
            <AiFillCaretUp />
          </span>
          {lastMonthUsers}
          <div className="text-gray-500">Last Month</div>
      </div>
      </div>
      <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div>
            <h3 className="text-gray-500 text-base uppercase">Total Comments</h3>
            <p className="text-2xl">{totalComments}</p>
          </div>
          <LiaCommentSolid className="bg-indigo-500 text-white rounded-full text-5xl p-3 shadow-lg"/>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-green-500 flex items-center">
            <AiFillCaretUp />
          </span>
          {lastMonthComments}
          <div className="text-gray-500">Last Month</div>
      </div>
      </div>
      <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div>
            <h3 className="text-gray-500 text-base uppercase">Total Posts</h3>
            <p className="text-2xl">{totalPosts}</p>
          </div>
          <AiFillFileImage className="bg-lime-500 text-white rounded-full text-5xl p-3 shadow-lg"/>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-green-500 flex items-center">
            <AiFillCaretUp />
          </span>
          {lastMonthPosts}
          <div className="text-gray-500">Last Month</div>
      </div>
      </div>
      </div>
      {/* overview */}
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800  ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=users'}>
                View all
              </Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>user image</TableHeadCell>
              <TableHeadCell>username</TableHeadCell>
            </TableHead>
            {users && users.map((user) => (
              <TableBody key={user._id} className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    <img
                      src={user.photoUrl}
                      alt="user"
                      className="w-10 h-10 rounded-full bg-gray-500"
                    ></img>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
        {/*Recent Comments*/}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800  ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=comments'}>
                View all
              </Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Comment</TableHeadCell>
              <TableHeadCell>No of Likes</TableHeadCell>
            </TableHead>
            {comments && comments.map((comment) => (
              <TableBody key={comment._id} className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="w-96">
                    <p className="line-clamp-2">{comment.content}</p>
                  </TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
        {/*Recent Posts*/}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800  ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=posts'}>
                View all
              </Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Post's Picture</TableHeadCell>
              <TableHeadCell>Post's Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
            </TableHead>
            {posts && posts.map((post) => (
              <TableBody key={post._id} className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    <img
                      src={post.image}
                      alt="user"
                      className="w-14 h-10 rounded-md bg-gray-500"
                    ></img>
                  </TableCell>
                  <TableCell className="w-96">{post.title}</TableCell>
                  <TableCell className="w-5">{post.category}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  )
}
