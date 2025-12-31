// 文件位置: src/data/works.ts

// 1. 定义接口，添加 pdf 字段
export interface WorkItem {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  features: string[];
  desc?: string;
  download_url?: string;
  pdf?: string; // <--- 新增这一行：用于存放PDF路径
  function?: {
    name: string;
    img1: string;
    img2?: string;
    img3?: string;
  }[];
}

// 2. 配置数据（已全英化）
export const worksData: WorkItem[] = [
  {
    title: "My Portfolio PDF", // 标题
    description: "This is my detailed portfolio in PDF format. Click the button to view.", // 英文描述
    image: "/images/work2.png", // 确保你有这张图片作为封面
    tech: ["Portfolio", "Design", "PDF"],
    link: "#",
    features: ["UI Design", "User Experience", "Case Studies"], // 英文特性
    pdf: "/portfolio.pdf", // <--- 指向你的 PDF 文件 (放在 public 目录下)
  },
  {
    title: "Personal Website",
    description: "My personal homepage and blog.",
    image: "/images/work1.jpg",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/pyotrhu", // 你的 GitHub 链接
    features: ["Introduction", "Portfolio", "Blog", "Contact"],
  },
];