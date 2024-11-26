"use client";
import { useEffect, useState } from "react";
import { ArticleT } from "../../config/Types/Articles";
import Card from "@/components/Card/Card";
import axios from "axios";
import Loading from "@/components/Loading/Loading";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function Home() {
  const [Articles, setArticleTs] = useState<ArticleT[]>([]);
  const [Load, setLoad] = useState<boolean>(true);
  const [Search, setSearch] = useState<string>("");

  const [NoData, setNoData] = useState<boolean>(false);

  const [visibleItems, setVisibleItems] = useState(8);

  const loadMore = () => {
    // setLoad(true)
    setVisibleItems((prev) => prev + 8);
    // setLoad(false);
  };

  const GetData = (Filter: string) => {
    axios
      .get("https://dev.to/api/articles")
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            setNoData(false);
            setArticleTs(
              res.data.filter((ele: ArticleT) => ele.title.includes(Filter)),
            );
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
  };
  useEffect(() => {
    AOS.init();
    setLoad(true);
    GetData("");
  }, []);
  function HandleSearch() {
    GetData(Search);
  }
  return (
    <div>
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
        <div className="flex flex-col main">
          {/* Resources and insights  section*/}
          <div className="flex    flex-col justify-center items-center Resourcescard">
            <p className="Our-blog animate__animated animate__fadeIn ">
              Our blog
            </p>
            <h1 className="Title animate__animated animate__backInDown">
              Resources and insights
            </h1>
            <p className="des animate__animated animate__fadeIn">
              The latest industry news, interviews, technologies, and resources.
            </p>
            <div className="flex">
              <input
                className="Searchinput"
                value={Search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="Search"
              />
              {Search && (
                <button
                  className="btnclose animate__animated animate__fadeIn"
                  onClick={() => {
                    setSearch("");
                    GetData("");
                  }}
                >
                  x
                </button>
              )}
            </div>

            {Search && (
              <button
                className="Loadmorebtn animate__animated animate__fadeIn"
                onClick={() => HandleSearch()}
              >
                Search
              </button>
            )}
          </div>

          {Articles.length > 0 ? (
            <div className="flex flex-col items-center pb-16">
              <div className="Cardssection mb-8">
                {Articles.slice(0, visibleItems).map((Article: ArticleT) => {
                  return <Card Article={Article} key={Article.id} />;
                })}
              </div>
              {visibleItems < Articles.length && (
                <button className="Loadmorebtn" onClick={() => loadMore()}>
                  <img src="/Icon.svg" alt="Arrow down" />
                  Load more
                </button>
              )}
            </div>
          ) : (
            <div className="w-full  flex justify-center items-center">
              <Image
                height={1000}
                width={1000}
                style={{ width: "calc(100vh / 3)" }}
                src={"/2953962.jpg"}
                alt="No Data"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
