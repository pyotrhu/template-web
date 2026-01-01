import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import SvgIcon from "@/components/SvgIcon";
import { useState } from "react";
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

interface Work {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  features: string[];
  pdf?: string;
}

export default function Works() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ title: "", image: "" });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  
  // 现在的作品集只有一个
  const work = worksData[0];

  const openImageModal = (imageInfo: { title: string; image: string }) => {
    setSelectedImage(imageInfo);
    setIsImageModalOpen(true);
  };

  const openDrawer = (item: Work) => {
    setSelectedWork(item);
    setIsDrawerOpen(true);
  };

  const [isQQModalOpen, setIsQQModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Portfolio - Zitong Hu&apos;s web</title>
      </Head>

      {/* 图片预览模态框 */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title={selectedImage.title}
        images={[selectedImage.image]}
        enableDanmaku={false}
        imageHeight={1000}
        imageWidth={1000}
      />

      <ImageModal
        isOpen={isQQModalOpen}
        onClose={() => setIsQQModalOpen(false)}
        title="Contact"
        images={["/images/qq.jpg"]}
        enableDanmaku={false}
        imageWidth={300}
        imageHeight={300}
      />

      {/* 详情抽屉：显示 PDF 内容 */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-11 flex items-end">
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
          <div className="relative w-full h-[90vh] bg-[rgba(0,0,0,0.5)] rounded-t-3xl pb-[100px]">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-[rgba(255,255,255,0.1)]">
              <h2 className="text-xl md:text-2xl font-bold text-white">{selectedWork?.title}</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="bg-[rgba(255,255,255,0.1)] rounded-full p-2 cursor-pointer">
                <SvgIcon name="close" width={24} height={24} color="#fff" />
              </button>
            </div>
            <div className="p-4 md:p-6 h-full overflow-y-auto custom-scrollbar">
              {selectedWork?.pdf && (
                <div className="w-full h-[60vh] md:h-[80vh]">
                  <iframe src={selectedWork.pdf} className="w-full h-full rounded-xl border-0" title="PDF Preview" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="relative min-h-screen bg-black">
        {/* 返回按钮 */}
        <div className="fixed top-4 left-4 z-10">
          <Link href="/" className="bg-[rgba(0,0,0,.5)] rounded-[5px] p-2 flex items-center gap-2 text-white backdrop-blur-sm">
            <SvgIcon name="left" width={16} height={16} color="#fff" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>

        {/* 核心展示区 */}
        <div className={`${geistSans.className} flex flex-col items-center justify-center min-h-screen px-4`}>
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">{work.title}</h1>
              <p className="text-lg text-[rgba(255,255,255,0.8)]">{work.description}</p>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {work.tech.map((tech, i) => (
                    <span key={i} className="bg-[rgba(255,255,255,0.1)] text-white text-sm px-4 py-2 rounded-full border border-[rgba(255,255,255,0.2)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => openDrawer(work)} className="bg-gradient-to-br from-[#1b2c55] to-[#3d85a9] text-white py-3 px-6 rounded-lg flex items-center gap-2 font-medium cursor-pointer">
                  <SvgIcon name="docs" width={18} height={18} color="#fff" />
                  View PDF Details
                </button>
                <button onClick={() => window.open(work.pdf, "_blank")} className="bg-[rgba(255,255,255,0.1)] text-white py-3 px-6 rounded-lg border border-[rgba(255,255,255,0.2)] cursor-pointer">
                  Open in New Tab
                </button>
              </div>
            </div>

            <div className="relative h-64 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => openImageModal({ title: work.title, image: work.image })}>
              <Image src={work.image} alt={work.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:opacity-50 transition-opacity" />
            </div>
          </div>

          {/* 底部联系栏 */}
          <div className="mt-20 text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">Interested in <span className="text-[#3d85a9]">my work?</span></h2>
            <div className="flex justify-center gap-6">
              <button onClick={() => window.open("https://github.com/996wuxian", "_blank")} className="bg-[rgba(255,255,255,0.1)] p-3 rounded-xl cursor-pointer">
                <SvgIcon name="github" width={30} height={30} color="#fff" />
              </button>
              <button onClick={() => setIsQQModalOpen(true)} className="bg-[rgba(255,255,255,0.1)] p-3 rounded-xl cursor-pointer">
                <SvgIcon name="qq" width={30} height={30} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}