// 文件位置: src/pages/works.tsx
// (请替换整个文件内容)

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import SvgIcon from "@/components/SvgIcon";
import { useState, useEffect } from "react";
import ImageModal from "@/components/ImageModal";
import Head from "next/head";
import Link from "next/link";
import { worksData } from "@/data/works";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface WorkFunction {
  name: string;
  img1?: string;
  img2?: string;
  img3?: string;
}

interface Work {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  features: string[];
  download_url?: string;
  function?: WorkFunction[];
  desc?: string;
  pdf?: string; // <--- 确保类型定义包含 pdf
}

export default function Works() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    title: string;
    image: string;
  }>({ title: "", image: "" });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const works = worksData;

  useEffect(() => {
    if (!scrollContainer) return;
    const handleScroll = () => {
      const scrollY = scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;
      const newSection = Math.round(scrollY / containerHeight);
      setCurrentSection(newSection);
    };
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [scrollContainer]);

  const scrollToSection = (index: number) => {
    if (!scrollContainer) return;
    scrollContainer.scrollTo({
      top: index * scrollContainer.clientHeight,
      behavior: "smooth",
    });
  };

  const totalSections = works.length + 1;

  const openImageModal = (imageInfo: { title: string; image: string }) => {
    setSelectedImage(imageInfo);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const openDrawer = (work: Work) => {
    setSelectedWork(work);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedWork(null);
  };

  const [isQQModalOpen, setIsQQModalOpen] = useState(false);

  const handleQQClick = () => {
    setIsQQModalOpen(true);
  };

  const closeQQModal = () => {
    setIsQQModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Portfolio - Zitong Hu&apos;s web</title>
        <meta name="description" content="Portfolio page" />
      </Head>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        title={selectedImage.title}
        images={[selectedImage.image]}
        enableDanmaku={false}
        imageHeight={1000}
        imageWidth={1000}
      />

      <ImageModal
        isOpen={isQQModalOpen}
        onClose={closeQQModal}
        title="Contact"
        images={["/images/qq.jpg"]}
        enableDanmaku={false}
        imageWidth={300}
        imageHeight={300}
      />

      {isDrawerOpen && (
        <div className="fixed inset-0 z-11 flex items-end">
          <div
            className="absolute inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"
            onClick={closeDrawer}
          />

          <div className="relative w-full h-[90vh] bg-[rgba(0,0,0,0.5)] rounded-t-3xl pb-[100px]">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-[rgba(255,255,255,0.1)]">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {selectedWork?.title}
              </h2>
              <button
                onClick={closeDrawer}
                className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] rounded-full p-2 transition-all duration-200 cursor-pointer"
              >
                <SvgIcon name="close" width={24} height={24} color="#fff" />
              </button>
            </div>

            <div className="p-4 md:p-6 h-full overflow-y-auto custom-scrollbar">
              {selectedWork && (
                <div className="space-y-6">
                  {/* *** 修改核心：支持 PDF 展示 *** */}
                  <div className="relative rounded-xl overflow-hidden flex justify-center">
                    {selectedWork.pdf ? (
                      <div className="w-full h-[60vh] md:h-[80vh]">
                        <iframe 
                          src={selectedWork.pdf} 
                          className="w-full h-full rounded-xl border-0"
                          title="PDF Preview"
                        />
                        <div className="md:hidden text-center mt-2">
                          <a href={selectedWork.pdf} target="_blank" className="text-white text-sm underline opacity-80">
                            Tap here if PDF doesn't load
                          </a>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={selectedWork.image}
                        alt={selectedWork.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full md:w-[50%] h-auto rounded-xl"
                      />
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      Description
                    </h3>
                    <p className="text-[rgba(255,255,255,0.8)] leading-relaxed text-sm md:text-base">
                      {selectedWork.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {selectedWork.tech.map((tech: string, index: number) => (
                        <span key={index} className="bg-[rgba(0,0,0,.5)] text-white text-xs md:text-sm px-3 md:px-4 py-2 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      Features
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedWork.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 text-[rgba(255,255,255,0.8)] bg-[rgba(255,255,255,0.05)] p-3 rounded-lg">
                          <div className="w-2 h-2 bg-gradient-to-br from-[#1b2c55] to-[#3d85a9] rounded-full flex-shrink-0" />
                          <span className="text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedWork.function && selectedWork.function.length > 0 && (
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        Functions
                      </h3>
                    )}
                    {selectedWork.desc && (
                      <div>
                        <p className="text-[rgba(255,255,255,0.8)] leading-relaxed text-sm md:text-base">
                          {selectedWork.desc}
                        </p>
                      </div>
                    )}
                    <div className="space-y-6">
                      {selectedWork.function?.map((func: WorkFunction, index: number) => (
                        <div key={index} className="space-y-3">
                          <h4 className="text-sm md:text-base font-medium text-white">
                            {func.name}
                          </h4>
                          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
                            {[func.img1, func.img2, func.img3].filter(Boolean).map((img, i) => (
                              <div key={i} className="flex-shrink-0">
                                {img!.endsWith(".mp4") ? (
                                  <video src={img} controls className="w-64 md:w-84 h-auto rounded-lg" preload="metadata">
                                    Your browser does not support video playback.
                                  </video>
                                ) : (
                                  <Image
                                    src={img!}
                                    alt={`${func.name} - Image ${i + 1}`}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-64 md:w-84 h-auto rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
                                    onClick={() => openImageModal({ image: img!, title: `${func.name} - Image ${i + 1}` })}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <div className="fixed top-2 md:top-4 left-2 md:left-4 z-10 font-[family-name:var(--font-geist-sans)]">
          <Link href="/" className="bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.7)] rounded-[5px] p-[6px] md:p-[8px] cursor-pointer transition-all duration-200 flex items-center gap-1 md:gap-2 text-white backdrop-blur-sm">
            <SvgIcon name="left" width={16} height={16} color="#fff" className="md:w-5 md:h-5" />
            <span className="text-xs md:text-sm">Back to Home</span>
          </Link>
        </div>

        <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10 flex flex-col gap-2 md:gap-3">
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`w-1 h-2 md:h-3 rounded-full transition-all duration-300 ${
                currentSection === index ? "bg-gradient-to-br from-[#1b2c55] to-[#3d85a9] scale-125" : "bg-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.8)]"
              }`}
              title={index < works.length ? `Project ${index + 1}` : "Contact"}
            />
          ))}
        </div>

        <div ref={setScrollContainer} className={`${geistSans.className} ${geistMono.className} font-[family-name:var(--font-geist-sans)] custom-scrollbar`} style={{ scrollSnapType: "y mandatory", overflowY: "scroll", height: "100vh" }}>
          {works.map((work, index) => (
            <section key={index} className="h-screen flex items-center justify-center px-4 md:px-8" style={{ scrollSnapAlign: "start" }}>
              <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
                <div className={`space-y-4 md:space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="space-y-3 md:space-y-4">
                    <div className="text-xs md:text-sm text-[rgba(255,255,255,0.6)] font-medium">
                      Project {index + 1} / {works.length}
                    </div>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#fff] text-shadow-sm">
                      {work.title}
                    </h1>
                    <p className="text-sm md:text-lg text-[rgba(255,255,255,0.8)] leading-relaxed">
                      {work.description}
                    </p>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-base md:text-lg font-semibold text-[#fff]">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {work.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-[rgba(0,0,0,.5)] text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[rgba(255,255,255,0.2)] backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-base md:text-lg font-semibold text-[#fff]">Features</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {work.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-[rgba(255,255,255,0.8)]">
                          <div className="w-2 h-2 bg-gradient-to-br from-[#1b2c55] to-[#3d85a9] rounded-full flex-shrink-0" />
                          <span className="text-xs md:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                    <button onClick={() => openDrawer(work)} className="bg-gradient-to-br from-[#1b2c55] to-[#3d85a9] hover:from-[#2a3d66] hover:to-[#4e96ba] text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium cursor-pointer text-sm md:text-base">
                      <SvgIcon name="docs" width={16} height={16} color="#fff" className="md:w-[18px] md:h-[18px]" />
                      View Details
                    </button>

                    {work.link !== "#" && (
                      <button onClick={() => window.open(work.link, "_blank")} className="bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.7)] text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 border border-[rgba(255,255,255,0.2)] backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base">
                        <SvgIcon name="github" width={16} height={16} color="#fff" className="md:w-[18px] md:h-[18px]" />
                        View Project
                      </button>
                    )}

                    {work.download_url && (
                      <button onClick={() => window.open(work.download_url, "_blank")} className="bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.7)] text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 border border-[rgba(255,255,255,0.2)] backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base">
                        <SvgIcon name="down" width={16} height={16} color="#fff" className="md:w-[18px] md:h-[18px]" />
                        Download
                      </button>
                    )}
                    
                     {/* *** 如果配置了 PDF，也给一个直接打开的入口 *** */}
                    {work.pdf && (
                       <button onClick={() => window.open(work.pdf, "_blank")} className="bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.7)] text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 border border-[rgba(255,255,255,0.2)] backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base">
                        <SvgIcon name="docs" width={16} height={16} color="#fff" className="md:w-[18px] md:h-[18px]" />
                        Open PDF
                      </button>
                    )}
                  </div>
                </div>

                <div className={`relative order-first lg:order-none ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => openImageModal({ title: work.title, image: work.image })}>
                    <Image src={work.image} alt={work.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-50 transition-opacity duration-700 cursor-pointer" />
                  </div>
                  <div className="absolute -top-2 md:-top-4 -right-2 md:-right-4 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-br from-[#1b2c55] to-[#3d85a9] rounded-full opacity-20 blur-xl" />
                  <div className="absolute -bottom-2 md:-bottom-4 -left-2 md:-left-4 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-br from-[#3d85a9] to-[#1b2c55] rounded-full opacity-20 blur-xl" />
                </div>
              </div>
            </section>
          ))}

          <section className="h-screen flex items-center justify-center px-4 md:px-8" style={{ scrollSnapAlign: "start" }}>
            <div className="text-center max-w-2xl mx-auto space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#fff] text-shadow-sm">
                  Interested in
                  <span className="bg-gradient-to-br from-[#1b2c55] to-[#3d85a9] bg-clip-text text-transparent"> my work?</span>
                </h2>
                <p className="text-sm md:text-lg text-[rgba(255,255,255,0.8)] leading-relaxed">
                  If you are interested in my work or want to cooperate, please contact me!
                </p>
              </div>

              <div className="flex justify-center gap-4 md:gap-6">
                <button onClick={() => window.open("https://github.com/996wuxian", "_blank")} className="bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.7)] rounded-xl p-2 md:p-3 cursor-pointer transition-all duration-300 backdrop-blur-sm border border-[rgba(255,255,255,0.2)] group">
                  <SvgIcon name="github" width={24} height={24} color="#fff" className="md:w-[30px] md:h-[30px]" />
                </button>
                <button onClick={handleQQClick} className="bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.7)] rounded-xl p-2 md:p-3 cursor-pointer transition-all duration-300 backdrop-blur-sm border border-[rgba(255,255,255,0.2)] group">
                  <SvgIcon name="qq" width={24} height={24} color="#fff" className="md:w-[30px] md:h-[30px]" />
                </button>
              </div>
            </div>
          </section>
        </div>

        <Link href="/blog" className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-10">
          <button className="bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.7)] rounded-[5px] p-[6px] md:p-[8px] cursor-pointer transition-all duration-200 flex items-center gap-1 md:gap-2 text-white backdrop-blur-sm">
            <span className="text-xs md:text-sm">Blog</span>
            <SvgIcon name="right" width={16} height={16} color="#fff" className="md:w-5 md:h-5" />
          </button>
        </Link>
      </div>
    </>
  );
}