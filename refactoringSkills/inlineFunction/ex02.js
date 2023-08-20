/**
* 함수 인라인하기
*/
{
    // 이전 👎
    function  reportLines_Before(aCustomer){
        const lines = [];
        gatherCustomerData_Before(lines, aCustomer);
        return lines;
    }

    function gatherCustomerData_Before(out, aCustomer){
        out.push(["name"    , aCustomer.name]);
        out.push(["location", aCustomer.location]);
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    // 리팩로팅 👍
    function  reportLines(aCustomer){
        const lines = [];
        // ✅ 만일 변경 해야하는 개 많다는 가정하에 하나하나 추가하며 삭제해주자
        out.push(["name"    , aCustomer.name]);
        out.push(["location", aCustomer.location]);
        // gatherCustomerData(lines, aCustomer);
        return lines;
    }

    //function gatherCustomerData(out, aCustomer){
        //out.push(["name"    , aCustomer.name]); 👉 해당 라인을 함수 인라인 후 테스트 이상없다면 아래 라인도 이어서
        //out.push(["location", aCustomer.location]);
    //}
}