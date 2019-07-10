import Router from "koa-router";
import fs from "fs";
import util from "util";

const router = new Router();

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let len = 6;

let read = async (cb) => {
    try {
        let res = await readFileAsync("./static/books.json", { encoding: "utf8" });
        if (!res.length) cb([]);
        else return cb(JSON.parse(res));
    } catch (err) {
        console.log(err);
    }
}

let write = async (data) => {
    try {
        let res = await writeFileAsync("./static/books.json", JSON.stringify(data));


    } catch (err) {
        console.log(er)
    }
}

//分批请求图书列表
router.get("/getbooks", async (ctx) => {
    let offset = parseInt(ctx.query.offset);
    ctx.body = await read(books => {

        let hasMore = true;//默认有更多记录
        if (books.length <= offset + len) {
            hasMore = false;
        }

        return {
            books: books.reverse().slice(offset, offset + len),
            hasMore
        }
    })




    // ctx.body = await read(books => books);

})

router.get("/detail", async (ctx) => {

    let bookId = parseInt(ctx.query.bookId)
    if (!isNaN(bookId)) {
        let books = await read(books => books);

        let book = books.find(item => item.bookId === bookId);
        ctx.body = book || {}
    } else {
        ctx.body = "找不到信息"
    }



})



//删除图书
router.del("/del", async (ctx) => {

    let bookId = parseInt(ctx.query.bookId);

    let books = await read(books => books);

    books = books.filter(item => item.bookId !== bookId);
    await write(books);

    ctx.body = "删除成功"
})
//更新图书

router.patch("/update", async (ctx) => {
    let bookId = ctx.query.bookId;
    let book = ctx.request.body;


    let books = await read(books => books);
    books.forEach(item => {
        if (bookId == item.bookId) {
            console.log("found")
            item = Object.assign(item, book);
        }

    });

    await write(books);
    ctx.body = { code: "200", msg: "更新成功" }
})


//增加
router.post("/add", async (ctx) => {
    let book = ctx.request.body;
    let books = await read(books => books);
    let newId = books[books.length - 1].bookId + 1;
    book.bookId = newId;
    books.push(book);
    await write(books);


    ctx.body = {
        code: 200,
        msg: "添加成功"
    };
})

export default router.routes();