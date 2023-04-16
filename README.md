# TS-demo
TypeScript练习demo，爬虫

TypeScript 练习 demo，爬取起点中文网畅销榜小说简介

# 分析项目

```ts
class 大类{
  属性:
    第一个属性:url
    第二个属性:目录(data)
  方法:

    init：运行所有的项目方法
    getHtml：请求url获取到的内容
    getJsonInfo：获取的内容，放入对象
    getNewContent：存入到目录（判断：当前目录有没有）
    writeFile：写入内容

  constructor() {
    this.init()
  }
}

new 大类()
```

# 创建项目
1. `npm init -y  ` 创建package.json
2. `tsc --init` 创建tsconfig.json
3. `npm i typescript -D` 安装ts

目录：
    src
        index.ts

# 编写项目
## 请求url
抓取内容：superagent：`npm i superagent -D`
获取dom： cheerio: `npm i cheerio -D`
存储数据：
      {
        time:242412,
        data:titleArr
      }