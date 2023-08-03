import createStatementData from './createStatementData.js'

function statment(invoice, plays){
    return renderPlainText(createStatementData(invoice,plays))
}

function renderPlainText(data, plays){
    let result = `청구 내역(고객명 ${data.customer}) \n`;
    for(let perf of data.performances){
        result += `${perf.play.name}: ${usd(perf.amount / 100)} ${perf.audience}석\n`;
    }//for 

    result += `총액 ${usd(data.totalAmount)}\n`;
    result += `적립 포인트 ${data.totalVolumeCrdeits}점\n`;
    return result;
}

function htmlStatement(invoice, plays){
    return renderHtml(invoice, plays);
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
    result += `<p>적립 포인트 ${data.totalVolumeCrdeits}점 </p>`;
    return result;
}

function usd(aNumber){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
            .format(aNumber / 100 ); 
}


const plays = '../json/plays.json';
const invoices = '../json/invoices.json';
console.log(statment(invoices, plays));