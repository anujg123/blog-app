import react,{ useState, useEffect } from "react"
import service from "../appwrite/configservice"
import { Container, PostCard } from "../components"


function Home() {
    const [posts, setPosts]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState(null);

    useEffect(()=>{
        service.getPosts()
        .then((post)=>{
            if(post){
                setPosts(post.documents)
            }
            setLoading(false);
        })
        .catch((error)=>{
            setError(error);
            setLoading(false);
        });
    },[]);
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <p>Loading...</p>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <p>Error: {error.message}</p>
                </Container>
            </div>
        );
    }
  if(posts.length=== 0){
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }
  return (
    <div className="w-full" py-8>
        <Container>
            <div className="flex flex-wrap">
                {posts.map((post)=>(
                    <div key={post.$id} className="p-2 w-1/4">
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home;
