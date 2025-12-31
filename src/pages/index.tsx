// 文件位置: src/pages/index.tsx
// (请替换整个文件内容，注意保留头部的 import)

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useTheme } from "@/contexts/ThemeContext";
import SvgIcon from "@/components/SvgIcon";
import ImageModal from "@/components/ImageModal";
import MusicModal from "@/components/MusicModal";
import VideoModal from "@/components/VideoModal";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  tagConfigs,
  ImageModalConfig,
  MusicModalConfig,
  VideoModalConfig,
} from "@/data/tagConfigs";
import { experienceData } from "@/data/experience";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { theme } = useTheme();
  // Modal states
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    title: "",
    images: [] as string[],
    danmakuText: "",
    enableDanmaku: true,
    imageWidth: 500,
    imageHeight: 500,
  });
  const [musicModal, setMusicModal] = useState({
    isOpen: false,
    title: "",
    musicUrl: "",
    cover: "",
    author: "",
    danmakuText: "",
    enableDanmaku: true,
  });
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoUrl: "",
    danmakuText: "",
    enableDanmaku: true,
  });

  // Typewriter effect states
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // *** 修改点 1: 名字改成你的 ***
  const fullText = "Hello, I'm Zitong Hu"; 

  // Typewriter effect logic
  useEffect(() => {
    const typeSpeed = 150;
    const deleteSpeed = 100;
    const pauseTime = 2000;
    const restartPause = 1000;

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < fullText.length) {
            setDisplayText(fullText.slice(0, currentIndex + 1));
            setCurrentIndex(currentIndex + 1);
          } else {
            setTimeout(() => {
              setIsDeleting(true);
            }, pauseTime);
          }
        } else {
          if (currentIndex > 0) {
            setDisplayText(fullText.slice(0, currentIndex - 1));
            setCurrentIndex(currentIndex - 1);
          } else {
            setTimeout(() => {
              setIsDeleting(false);
            }, restartPause);
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, fullText]);

  const handleTagClick = (tagName: string) => {
    const tagConfig = tagConfigs[tagName];
    if (!tagConfig) return;

    switch (tagConfig.type) {
      case "image":
        setImageModal(tagConfig.config as ImageModalConfig);
        break;
      case "music":
        setMusicModal(tagConfig.config as MusicModalConfig);
        break;
      case "video":
        setVideoModal(tagConfig.config as VideoModalConfig);
        break;
      case "link":
        const linkConfig = tagConfig.config as { url: string };
        window.open(linkConfig.url, "_blank");
        break;
      default:
        break;
    }
  };

  const handleGithubClick = () => {
    window.open("https://github.com/pyotrhu", "_blank"); // 记得换成你的 GitHub
  };

  const handleQQClick = () => {
    setImageModal({
      isOpen: true,
      title: "Contact", // 英文标题
      images: ["/images/qq.jpg"],
      danmakuText: "Contact",
      enableDanmaku: true,
      imageWidth: 500,
      imageHeight: 500,
    });
  };

  // Tags (ensure these are what you want)
  const tags = [
    { name: "Game Design" },
    { name: "Video Production" },
    { name: "Anime" },
    { name: "Post-Modern" },
    { name: "Writing" },
    { name: "Steins;Gate" },
    { name: "Unity" },
    { name: "Arknights" },
    { name: "Persona 3" },
    { name: "Hatsune Miku" },
    { name: "Disco Elysium" },
    { name: "Danganronpa" },
    { name: "Hollow Knight" },
    { name: "Yu-Gi-Oh" },
    { name: "On my way to the South Pole" },
  ];

  const express = experienceData;

  return (
    <>
      <Head>
        <title>Home - Zixiang Zhou&apos;s Web</title>
        <meta name="description" content="Zixiang Zhou's homepage" />
      </Head>
      <div className="relative">
        <ImageModal
          isOpen={imageModal.isOpen}
          onClose={() => setImageModal({ ...imageModal, isOpen: false })}
          title={imageModal.title}
          images={imageModal.images}
          danmakuText={imageModal.danmakuText}
          enableDanmaku={imageModal.enableDanmaku}
          imageWidth={imageModal.imageWidth}
          imageHeight={imageModal.imageHeight}
        />

        <MusicModal
          isOpen={musicModal.isOpen}
          onClose={() => setMusicModal({ ...musicModal, isOpen: false })}
          title={musicModal.title}
          musicUrl={musicModal.musicUrl}
          author={musicModal.author}
          cover={musicModal.cover}
          danmakuText={musicModal.danmakuText}
          enableDanmaku={musicModal.enableDanmaku}
        />

        <VideoModal
          isOpen={videoModal.isOpen}
          onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
          videoUrl={videoModal.videoUrl}
          danmakuText={videoModal.danmakuText}
          enableDanmaku={videoModal.enableDanmaku}
        />

        <div className={`${geistSans.className} ${geistMono.className} items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] flex justify-center px-4 md:px-0 `}>
          <div className="flex flex-col w-full max-w-3xl h-[100vh] md:h-auto overflow-y-auto md:overflow-y-visible custom-scrollbar pb-20 md:pb-0 hide-scrollbar">
            <div className="flex gap-[10px] flex-col md:flex-row pt-[100px] md:pt-0">
              <div className="relative w-full md:w-[250px] flex justify-center items-center mx-auto md:mx-0">
                <Image
                  src="/images/avatar.jpg"
                  alt="Avatar"
                  width={200}
                  height={200}
                  className="rounded-[50%] shadow-lg w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
                />
                {theme !== "dark" && (
                  <Image
                    src="/images/smoke.png"
                    alt="Effect"
                    width={200}
                    height={200}
                    className="top-[-135px] md:top-[-180px] left-[50%] translate-x-[-50%] absolute w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
                  />
                )}
              </div>
              <div className="flex flex-col gap-[10px] text-center md:text-left px-4 md:px-0">
                <div className="text-[28px] md:text-[40px] font-bold text-[#fff] text-shadow-sm">
                  <span className="inline-block">
                    {displayText}
                    <span className="animate-pulse text-[#3d85a9]">|</span>
                  </span>
                </div>
                {/* *** 修改点 2: 英文职业 *** */}
                <div className="text-shadow-sm text-[#fff] text-[14px] md:text-[16px]">
                  <span className="bg-gradient-to-br from-[#1b2c55] to-[#3d85a9] bg-clip-text text-transparent text-[16px] md:text-[18px]">
                    Student
                  </span>{" "}
                   (Computer Science & Mathematics)
                </div>
                {/* *** 修改点 3: 英文年龄 *** */}
                <div className="text-shadow-sm text-[#fff] text-[14px] md:text-[16px]">
                  <span className="bg-gradient-to-br from-[#1b2c55] to-[#3d85a9] bg-clip-text text-transparent text-[16px] md:text-[18px]">
                    20
                  </span>{" "}
                  years old
                </div>
                {/* *** 修改点 4: 英文经验 *** */}
                <div className="text-shadow-sm text-[#fff] text-[14px] md:text-[16px]">
                  <span className="bg-gradient-to-br from-[#1b2c55] to-[#3d85a9] bg-clip-text text-transparent text-[16px] md:text-[18px]">
                    1
                  </span>{" "}
                  year research experience
                </div>
                <div className="flex mt-[10px] gap-[10px] justify-center md:justify-start">
                  <div className="bg-[rgba(0,0,0,.5)] rounded-[5px] p-[8px] cursor-pointer" onClick={handleGithubClick}>
                    <SvgIcon name="github" width={20} height={20} color="#fff" />
                  </div>
                  <div className="bg-[rgba(0,0,0,.5)] rounded-[5px] p-[8px] cursor-pointer" onClick={handleQQClick}>
                    <SvgIcon name="qq" width={20} height={20} color="#fff" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-[10px] mt-[20px] flex-col md:flex-row px-4 md:px-0">
              <div className="flex order-2 md:order-1 w-full md:w-auto">
                <div className="flex flex-col gap-[10px] w-full md:w-[250px]">
                  <div className="flex gap-[10px] flex-col flex-row">
                    <div className="bg-[rgba(0,0,0,.3)] rounded-[5px] p-[10px] text-[#fff] text-[14px] gap-[10px] flex flex-col flex-1">
                      <div className="flex items-center gap-[5px]">
                        <SvgIcon name="address" width={20} height={20} color="#fff" />
                        Shanghai
                      </div>
                      <div className="flex items-center gap-[5px]">
                        <SvgIcon name="work" width={20} height={20} color="#fff" />
                        SJTU
                      </div>
                    </div>
                    <div className="bg-[rgba(0,0,0,.3)] rounded-[5px] p-[10px] text-[#fff] text-[14px] gap-[10px] flex flex-col flex-1">
                      <div className="flex items-center gap-[5px]">
                        <SvgIcon name="address" width={20} height={20} color="#fff" />
                        Shanghai
                      </div>
                      <div className="flex items-center gap-[5px]">
                        <SvgIcon name="home" width={20} height={20} color="#fff" />
                        Home
                      </div>
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,.3)] rounded-[5px] p-[10px] text-[#fff] gap-[10px] flex flex-wrap text-[12px]">
                    {tags.map((tag) => (
                      <div className="bg-[rgba(255,255,255,.1)] rounded-[5px] p-[5px] w-fit cursor-pointer hover:bg-[rgba(255,255,255,.2)] transition-all duration-200 transform hover:scale-105" key={tag.name} onClick={() => handleTagClick(tag.name)}>
                        {tag.name}
                      </div>
                    ))}
                  </div>
                  <div className="bg-[rgba(0,0,0,.3)] rounded-[5px] p-[10px] text-[#fff] text-[14px] gap-[10px] flex flex-col">
                    <div className="relative">
                      {express.map((item, index) => (
                        <div key={index} className="relative flex items-start last:mb-0">
                          <div className="relative flex flex-col items-center mr-[15px]">
                            <div className={`w-[12px] h-[12px] rounded-full border-2 border-white ${index === express.length - 1 ? "bg-[#3d85a9]" : "bg-[#1b2c55]"}`}></div>
                            {index < express.length - 1 && (
                              <div className="w-[2px] h-[40px] bg-gradient-to-b from-[#1b2c55] to-[#3d85a9] mt-[5px]"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-[#fff] mb-[2px] text-[13px] md:text-[14px]">{item.name}</div>
                            <div className="text-[11px] md:text-[12px] text-[rgba(255,255,255,0.7)]">{item.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-[10px] order-1 md:order-2 w-full md:w-auto">
                <div className="bg-[rgba(0,0,0,.3)] rounded-[5px] p-[10px] text-[#fff] text-[14px] gap-[10px] flex flex-col">
                  <div className="font-bold text-[16px] flex items-center gap-[5px]">
                    <SvgIcon name="site" width={20} height={20} color="#fff" />
                    <div className="flex flex-col">
                      Navigation
                      <span className="text-[11px] font-[400]">Links</span>
                    </div>
                  </div>
                  <div className="flex gap-[10px] flex-col sm:flex-row">
                    <Link href="/works" className="bg-[rgba(0,0,0,.3)] rounded-[5px] p-[10px] text-[#fff] text-[14px] gap-[10px] flex flex-col cursor-pointer flex-1">
                      <div className="flex justify-between items-center">
                        Portfolio
                        <SvgIcon name="zuopin" width={25} height={25} color="#fff" />
                      </div>
                      <span className="text-[12px]">My Projects</span>
                    </Link>
                    <Link href="/blog" className="bg-[rgba(0,0,0,.3)] rounded-[5px] p-[10px] text-[#fff] text-[14px] gap-[10px] flex flex-col cursor-pointer flex-1">
                      <div className="flex justify-between items-center">
                        Blog
                        <SvgIcon name="docs" width={25} height={25} color="#fff" />
                      </div>
                      <span className="text-[12px]">My Thoughts</span>
                    </Link>
                  </div>
                  <div className="text-[12px] md:text-[14px]">
                    Good morning 2026
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-8 right-8 z-10">
            <Link href="/works" className="bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.7)] rounded-[5px] p-[8px] cursor-pointer transition-all duration-200 flex items-center gap-2 text-white backdrop-blur-sm">
              <span className="text-sm">Portfolio</span>
              <SvgIcon name="right" width={20} height={20} color="#fff" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}