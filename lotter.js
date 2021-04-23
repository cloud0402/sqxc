/**
 * 查询双色球中奖信息
 *
 */

const url = "https://www.mxnzp.com/api//lottery/common/latest?code=ssq&app_id=tzyjqeqgqksqpnmp&app_secret=TWxoOWZkamlWdDhSeTBWcTBiRTkwdz09";

const method = "GET";
const headers = {
    // "Accept": "*/*",
    // "Accept-Encoding": "br, gzip, deflate",
    // "Accept-Language": "zh-cn",
    // "Connection": "close",
    // "Content-Type": "application/x-www-form-urlencoded",
    // "Host": "app.yymedias.com",
    // "Origin": "https://apph5.yymedias.com",
    // "Referer": "https://apph5.yymedias.com/app/mission",
    // "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16A404",
    // "header-encrypt-code": "123456788sY3zv+fnn5mcDFP6LZBAbmEo=",
    // "is-ios": "ios"
};
const data = {"info": "abc"};

const myDataRequest = {
    url: url,
    method: method, // Optional, default GET.
    // headers: headers, // Optional.
    // body: JSON.stringify(data) // Optional.
};

const myCashRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers, // Optional.
    body: JSON.stringify(data) // Optional.
};

const ssqDataAnalyzed = {
    openCode: {},
    expect: {},
    time: {},
    ssqresult: {},
    cashresult: {}
}

function getData() {
    $task.fetch(myDataRequest).then(response => {
            let ssqData = JSON.parse(response.body);
            ssqDataAnalyzed.openCode = ssqData.data.openCode.toString();
            ssqDataAnalyzed.expect = ssqData.data.expect.toString();
            ssqDataAnalyzed.time = ssqData.data.time.toString();

            // response.statusCode, response.headers, response.body
            // console.log(response.body);
            $notify("Title", "Subtitle", ssqDataAnalyzed.expect); // Success!
            // $notify("Title", "Subtitle", response.body); // Success!
            $done();
        }, reason => {
            // reason.error
            $notify("Title", "Subtitle", reason.error); // Error!
            $done();
        }
    )
}

function getResult() {
    const resulturl = "https://www.mxnzp.com/api/lottery/common/check?code=ssq&expect=" + ssqDataAnalyzed.expect
        + "&lotteryNo=03,04,06,10,18,21,33@10,16&app_id=tzyjqeqgqksqpnmp&app_secret=TWxoOWZkamlWdDhSeTBWcTBiRTkwdz09";
    $notify("Title", "Subtitle", resulturl);
    const myCashRequest = {
        url: resulturl,
        method: method, // Optional, default GET.
        // headers: headers, // Optional.
        // body: JSON.stringify(data) // Optional.
    };
    $task.fetch(myCashRequest).then(response => {
            // let ssqData = JSON.parse(response.body);
            // ssqDataAnalyzed.openCode = ssqData.data.openCode;
            // ssqDataAnalyzed.expect = ssqData.data.expect;
            // ssqDataAnalyzed.time = ssqData.data.time;

            // response.statusCode, response.headers, response.body
            // console.log(response.body);
            $notify("Title", "Subtitle", response.body); // Success!
            $done();
        },reason => {
            // reason.error
            $notify("Title", "Subtitle", reason.error); // Error!
            $done();
        }
    )
}

function ssq() {
    getData();
    getResult();
}

ssq();