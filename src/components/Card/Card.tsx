 
"use client"
import Link from "next/link";
 
import React, { useState } from "react";
import { ArticleT } from "../../../config/Types/Articles";
 
import Image from "next/image";
import { formatDate } from "../../../config/Methods/Getdate";
interface Props{
  Article: ArticleT;
}
export  default function Card(props: Props) {
  const [src, setsrc] = useState(
    props.Article.cover_image ? props.Article.cover_image : "/11242056.jpg",
  );
  return (
    <div className="card " data-aos="fade-up">
      <Image
        width={1000}
        height={1000}
        className="w-full mb-6 cover_image"
        src={src}
        onError={() => {
          setsrc("/11242056.jpg");
        }}
        alt=""
      />

      <div className="flex flex-col items-start justify-between  h-full">
        <div className="flex flex-col items-start gap-3 w-full ">
          <div className="  category">{props.Article.organization?.name}</div>

          <div className="flex flex-col items-start gap-3 w-full ">
            <div className=" flex w-full justify-between items-center">
              <h1 className=" cardtitle">{props.Article.title}</h1>
              {/* props.Article.url */}
              <Link
                href={`/blog/${props.Article.id}`}
                // target="_blank"
                className="cardlink"
              >
                <img
                  className="Iconwrap"
                  alt="Icon wrap"
                  src={"/icon-wrap.svg"}
                />
              </Link>
            </div>

            <p className=" Carddesc">{props.Article.description}</p>
          </div>
        </div>

        <div className="cardauth  ">
          <img
            className="cardauthimg  "
            alt="Icon wrap"
            src={props.Article.user.profile_image}
          />

          <div className="cardauthdata ">
            <h2 className=" cardauthname">{props.Article.user.name}</h2>

            <p className="cardauthdate ">
              {formatDate(props.Article.published_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
