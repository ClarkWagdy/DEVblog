'use client'
import Loading from "@/components/Loading/Loading";
import axios from "axios";
 
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
 
import { useEffect, useState } from "react";
import { ArticleT } from "../../../../config/Types/Articles";
import { formatDate } from "../../../../config/Methods/Getdate";

export default   function Page( ) {
  const params = useParams();
  console.log(params);
   const [Load, setLoad] = useState<boolean>(true);
  const [NoData, setNoData] = useState<boolean>(false);

   const [Articles, setArticleTs] = useState<ArticleT>();
   const [Comments, setComments] = useState<ArticleT[]>([]);
  const [src, setsrc] = useState(
    Articles?.cover_image
      ? Articles.cover_image
      : "/11242056.jpg",
  );
  useEffect(() => {
     axios
       .get(`https://dev.to/api/articles/${params.id}`)
       .then((res) => {
         if (res.status === 200) {
     
           if (res.data) {
             setNoData(false);
             setArticleTs(res.data);
             setsrc(res.data.cover_image);
           } else {
             setNoData(true);
           }

           setLoad(false);
         }
       })
       .catch(() => {
         setLoad(false);
         setNoData(true);
       });

          axios
            .get(`https://dev.to/api/comments?a_id=${params.id}`)
            .then((res) => {
              if (res.status === 200) {
                if (res.data.length>0) {
                  
                    setComments(res.data);
                }  

              
              }
            })
            .catch(() => {
             
              
            });
  }, []);
  return (
    <>
      {Load ? (
        <div className="h-screen w-screen flex justify-center items-center LoadingScreen">
          <Loading />
        </div>
      ) : NoData ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Image
            height={1000}
            width={1000}
            style={{ width: "calc(100vh / 2)" }}
            src={"/2953962.jpg"}
            alt="No Data"
          />
        </div>
      ) : (
        <>
        
            <header className="bg-white shadow-md ">
              <div className="container mx-auto flex items-center justify-between p-4">
                {/*Logo */}
                <Link
                  href="/"
                  className="text-2xl font-bold text-blue-600"
                  style={{ color: "#42307D" }}
                >
                  Blog
                </Link>
              </div>
            </header>
            {/* Main Container */}
            <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
              {/* Header */}
              <div className="border-b pb-4 mb-6">
                <a
                  href={Articles?.url}
                  target="_blank"
                  className="text-3xl font-bold text-gray-800"
                >
                  {Articles?.title}
                </a>
                <div className="mt-2 text-sm text-gray-500">
                  <span>
                    By{" "}
                    <strong className="text-gray-700">
                      {Articles?.user.name}
                    </strong>
                  </span>{" "}
                  |
                  <span>
                    Published on {formatDate(Articles?.published_at + "")}
                  </span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="mb-6">
                <img
                  src={src}
                  alt="Post Cover"
                  className="w-full rounded-lg shadow-sm"
                  onError={() => {
                    setsrc("/11242056.jpg");
                  }}
                />
              </div>

              {/* Post Content */}
              <div
                className="space-y-4 text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: Articles?.body_html + "" }}
              ></div>

              {/* Tags Section */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {Articles?.tags.map((ele, index) => {
                    console.log(ele);
                    return (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                      >
                        #{ele}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Comments Section */}

              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                <div className="space-y-6">
                  {/* Single Comment */}
                  {Comments.length === 0 && (
                    <div className="flex items-center justify-center ">
                      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xs text-center">
                        <p className="text-lg font-semibold text-gray-700">
                          No Comment
                        </p>
                        <p className="text-sm text-gray-500">
                          There are no comments yet.
                        </p>
                      </div>
                    </div>
                  )}
                  {Comments.length > 0 &&
                    Comments.map((ele, index) => {
                      return (
                        <div key={ele.id_code} className="flex space-x-4">
                          <img
                            src={ele.user.profile_image}
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <div className="font-medium text-gray-800">
                              {ele.user.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatDate(ele.created_at)}
                            </div>
                            <div
                              className="mt-2 text-gray-700"
                              dangerouslySetInnerHTML={{
                                __html: ele?.body_html + "",
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
         
        </>
      )}
    </>
  );
}
