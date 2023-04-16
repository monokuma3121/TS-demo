import superagent from "superagent";
import cheerio from "cheerio";
import path from "path"; //路径模块
import fs from "fs"; //读取存储模块

interface TitleArr {
  title: string;
}

interface JsonInfo {
  time: number;
  data: TitleArr[];
}

interface Content {
  [propName: number]: TitleArr[];
}

class Reptile {
  //抓取的url
  private url = "https://www.qidian.com/rank/hotsales/";

  //存储目录的文件路径
  private filePath = path.resolve(__dirname, "./data/data.json");

  //请求url获取到的内容
  async getHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  //获取的内容，放入对象
  getJsonInfo(html: string) {
    const $ = cheerio.load(html);
    const item = $(".intro");
    const titleArr: TitleArr[] = [];
    item.map((index, el) => {
      const title = $(el).text();
      titleArr.push({
        title,
      });
    });
    return {
      time: new Date().getTime(),
      data: titleArr,
    };
  }

  //存入到目录（判断：当前目录有没有）
  getNewContent(jsonInfo: JsonInfo) {
    let fileContent: Content = {};
    if (fs.existsSync(this.filePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    }
    fileContent[jsonInfo.time] = jsonInfo.data;
    return fileContent;
  }

  //写入内容
  writeFile(fileContent: string) {
    fs.writeFileSync(this.filePath, fileContent);
  }

  //运行所有的项目方法
  async init() {
    const html = await this.getHtml();
    const jsonInfo = this.getJsonInfo(html);
    const fileContent = this.getNewContent(jsonInfo);
    this.writeFile(JSON.stringify(fileContent));
  }

  constructor() {
    this.init();
  }
}

new Reptile();

/**
 * 执行了new Reptile()，就会执行constructor()，就会执行init()
 */
