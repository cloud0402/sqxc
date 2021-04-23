/**
 * 查询双色球中奖信息
 **/

const url = "https://www.mxnzp.com/api//lottery/common/latest?code=ssq&app_id=tzyjqeqgqksqpnmp&app_secret=TWxoOWZkamlWdDhSeTBWcTBiRTkwdz09";

const method = "POST";

const myDataRequest = {
    url: url,
    method: method, // Optional, default GET.
};

var openCode = "";
var checkedCode = "";
var expect = "";
var time = "";
var Title = "";
var SubTitle = "";
var content = "";

function getData() {
    $task.fetch(myDataRequest).then(response => {
            ssqData = JSON.parse(response.body);
            openCode = ssqData.data.openCode.toString();
            expect = ssqData.data.expect.toString();
            time = ssqData.data.time.toString();
            return response;
        }, reason => {
            // reason.error
            $notify("Title", "Subtitle", reason.error); // Error!
            $done();
        }
    ).then(function (getResult) {
            var resulturl = "https://www.mxnzp.com/api/lottery/common/check?code=ssq&expect=" + expect
                + "&lotteryNo=03,04,06,10,18,21,33@10,16&app_id=tzyjqeqgqksqpnmp&app_secret=TWxoOWZkamlWdDhSeTBWcTBiRTkwdz09";
            var myCashRequest = {
                url: resulturl,
                method: method, // Optional, default GET.
            };
            $task.fetch(myCashRequest).then(response => {
                    ssqData = JSON.parse(response.body);
                    resultDesc = ssqData.data.resultDesc;
                    checkedCode = ssqData.data.checkedCode;

                    redResult = resultDesc.substring(0, 1);
                    blueResult = resultDesc.substring(2, 3);
                    // ssqDataAnalyzed.openCode = ssqData.data.openCode;
                    // ssqDataAnalyzed.expect = ssqData.data.expect;
                    // ssqDataAnalyzed.time = ssqData.data.time;
                    if (blueResult === "0") {
                        if (redResult === "6") {
                            Title = "二等奖";
                            SubTitle = "具体奖金请查询";
                        } else if (redResult === "5") {
                            Title = "四等奖";
                            SubTitle = "中奖奖金为：900元";
                        } else if (redResult === "4") {
                            Title = "五等奖";
                            SubTitle = "中奖奖金为：60元";
                        } else {
                            Title = "未中奖";
                            SubTitle = "未中奖";
                        }
                    } else if (blueResult === "1") {
                        if (redResult === "6") {
                            Title = "一等奖";
                            SubTitle = "具体奖金请查询";
                        } else if (redResult === "5") {
                            Title = "三等奖";
                            SubTitle = "中奖奖金为：7450元";
                        } else if (redResult === "4") {
                            Title = "四等奖";
                            SubTitle = "中奖奖金为：670元";
                        } else if (redResult === "3") {
                            Title = "五等奖";
                            SubTitle = "中奖奖金为：55元";
                        } else {
                            Title = "六等奖";
                            SubTitle = "中奖奖金为：35元";
                        }
                    }
                    content = "第" + expect + "期双色球开奖结果\n"
                    content += "开奖时间："+ time + "\n";
                    content += "开奖结果："+ openCode + "\n";
                    content += "你的投注："+ checkedCode + "\n";
                    content += "共中 "+ redResult + " 个红球，" + blueResult + "个蓝球\n";
                    content += SubTitle + "\n";
                    // response.statusCode, response.headers, response.body
                    // console.log(response.body);
                    $notify(Title, SubTitle, content); // Success!
                    $done();
                }, reason => {
                    // reason.error
                    $notify("Title", "Subtitle", reason.error); // Error!
                    $done();
                }
            )
        }
    )
}

getData();