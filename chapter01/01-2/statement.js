import createStatementData from './createStatementData.js'
import invoices from '../json/invoices.json' assert { type: "json" };
import plays from '../json/plays.json' assert { type: "json" };

// 로직 실행 함수
function statment(invoices, plays){
    return renderPlainText(createStatementData(invoices,plays))
}

// 결과 내역 출력
function renderPlainText(data, plays){
    let result = `청구 내역(고객명 ${data.customer}) \n`;
    for(let perf of data.performances){
        result += `${perf.play.name}: ${usd(perf.amount / 100)} ${perf.audience}석\n`;
    }//for 

    result += `총액 ${usd(data.totalAmount)}\n`;
    result += `적립 포인트 ${data.totalVolumeCredits}점\n`;
    return result;
}

function htmlStatement(invoices, plays){
    return renderHtml(invoices, plays);
}

function renderHtml(data){
    let result = `<h1>청구 내역(고객명 ${data.customer})</h1>`;
    reuslt += "<table>";
    reuslt += "<tr><th>연극</th><th>좌석수</th><th>금액</th></tr>";
    for(let perf of data.performances){
        result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>`;
    }//for 
    result += "</table>";
    result += `<p>총액 ${usd(data.totalAmount)}</p>`;
    result += `<p>적립 포인트 ${data.totalVolumeCredits}점 </p>`;
    return result;
}

// 달러 계산 로직
function usd(aNumber){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
            .format(aNumber / 100 ); 
}


console.log(statment(invoices, plays));