//in hackerrank we have type solution of code and then submit and check their test cases


const puppeteer = require("puppeteer");
const codeobj = require("./codes.js")
const loginlink = "https://www.hackerrank.com/auth/login"
const email = "xabcsr@gmail.com";
const password = "12345678";
let page;
let browserpromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
});
browserpromise.then(function (browser) {
    //console.log("browser opened");
    let pagesarrpromise = browser.newPage();
    return pagesarrpromise;
}).then(function (browserpages) {
    page = browserpages;
    let gotopromise = browserpages.goto(loginlink);
    return gotopromise;
}).then(function () {
    let enteremailpromise = page.type("input[type='text']", email, { delay: 30 })
    return enteremailpromise;

}).then(function () {
    let enterpasswordpromise = page.type("input[type='password']", password, { delay: 30 });
    return enterpasswordpromise;
}).then(function () {
    let pressloginpromise = page.click("button[type='button']", { delay: 40 });
    return pressloginpromise;

}).then(function () {
    let clickonalgorithmpromise = waitandclick(".topic-card a[data-attr1='algorithms']", page, { delay: 50 });
    return clickonalgorithmpromise;
}).then(function () {
    let gettowarmup = waitandclick("input[value='warmup']", page)
    return gettowarmup;
}).then(function () {
    let allquestionspromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", { delay: 60 });
    return allquestionspromise;
}).then(function (questionsarr) {
    console.log("number of question", questionsarr.length);
    let questionwillbesolved = questionsolver(page, questionsarr[0], codeobj.answers[0]);
    return questionwillbesolved;

})
    .catch(function (err) {
        console.log(err);
    })


function waitandclick(selctor, cpage) {
    return new Promise((resolve, reject) => {
        let waitformodelpromise = cpage.waitForSelector(selctor);
        waitformodelpromise.then(function () {
            let clickmodel = cpage.click(selctor);
            return clickmodel;
        }).then(function () {
            resolve();
        }).then(function () {
            reject();
        })
    })
}


function questionsolver(page, question, answers) {
    return new Promise((resolve, reject) => {
        let questionwillbeclicked = question.click();
        questionwillbeclicked.then(function () {
            let texteditorpromise = waitandclick(".monaco-editor.no-user-select.vs", page);
            return texteditorpromise;
        }).then(function () {
            let checkboxselectpromise = waitandclick("input[type='checkbox']", page);
            return checkboxselectpromise;
        }).then(function () {
            let textareapromise = waitandclick("textarea.custominput", page)
            return textareapromise;

        }).then(function () {
            let typeintotextareapromise = page.type("textarea.custominput", answers, { delay: 20 });
            return typeintotextareapromise;
        }).then(function () {
            let ctrlpressed = page.keyboard.down('Control');
            return ctrlpressed;
        }).then(function () {
            let Aispressed = page.keyboard.press('A', { delay: 100 });
            return Aispressed;

        }).then(function () {
            let Xispressed = page.keyboard.press('X', { delay: 100 });
            return Xispressed;
        }).then(function () {
            let ctrlunpressed = page.keyboard.up('Control');
            return ctrlunpressed;
        }).then(function () {
            let maineditorpromise = waitandclick(".monaco-editor.no-user-select.vs", page);
            return maineditorpromise;
        }).then(function () {
            let ctrlpressed = page.keyboard.down('Control');
            return ctrlpressed;
        }).then(function () {
            let Aispressed = page.keyboard.press('A', { delay: 100 });
            return Aispressed;

        }).then(function () {
            let Aispressed = page.keyboard.press('V', { delay: 100 });
            return Aispressed;
        }).then(function () {
            let ctrlunpressed = page.keyboard.up('Control');
            return ctrlunpressed;
        }).then(function () {
            let submitbuttonpromise = page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled", page);
            return submitbuttonpromise;
        })
    })
}