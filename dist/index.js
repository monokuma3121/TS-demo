"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
const cheerio_1 = __importDefault(require("cheerio"));
const path_1 = __importDefault(require("path")); //路径模块
const fs_1 = __importDefault(require("fs")); //读取存储模块
class Reptile {
    //请求url获取到的内容
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield superagent_1.default.get(this.url);
            return result.text;
        });
    }
    //获取的内容，放入对象
    getJsonInfo(html) {
        const $ = cheerio_1.default.load(html);
        const item = $(".intro");
        const titleArr = [];
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
    getNewContent(jsonInfo) {
        let fileContent = {};
        if (fs_1.default.existsSync(this.filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(this.filePath, "utf-8"));
        }
        fileContent[jsonInfo.time] = jsonInfo.data;
        return fileContent;
    }
    //写入内容
    writeFile(fileContent) {
        fs_1.default.writeFileSync(this.filePath, fileContent);
    }
    //运行所有的项目方法
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this.getHtml();
            const jsonInfo = this.getJsonInfo(html);
            const fileContent = this.getNewContent(jsonInfo);
            this.writeFile(JSON.stringify(fileContent));
        });
    }
    constructor() {
        //抓取的url
        this.url = "https://www.qidian.com/rank/hotsales/";
        //存储目录的文件路径
        this.filePath = path_1.default.resolve(__dirname, "./data/data.json");
        this.init();
    }
}
new Reptile();
/**
 * 执行了new Reptile()，就会执行constructor()，就会执行init()
 */
