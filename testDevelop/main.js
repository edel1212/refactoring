

    // Province에서 사용될 JSON 데이터를 생성하는 함수
    function sampleProvinceData() {
        return {
            name: 'Asia',
            producers: [
                {name: 'Byzantium', cost: 10, production: 9},
                {name: 'Attalia', cost: 12, production: 10},
                {name: 'Sinope', cost: 10, production: 6},
            ],
            demand: 30,
            price: 20,
        };
    }

    // 지역(Province) : Json기반 객체를 생성자로 받아 생성
    class Province {
        constructor(doc) {
            this._name = doc.name;
            this._producers = [];
            this._totalProduction = 0;
            this._demand = doc.demand;
            this._price = doc.price;
            doc.producers.forEach(d => this.addProducer(new Producer(this, d)));
        }
    
        addProducer(arg) {
            this._producers.push(arg);
            this._totalProduction += arg.production;
        }

        /*** Getter, Setter */
        get name() {return this._name;}
    
        get producers() {return this._producers.slice();}   // 전체 배열을 복제한 것을 반환
    
        get totalProduction() {return this._totalProduction;}
    
        set totalProduction(arg) {this._totalProduction = arg;}
    
        get demand() {return this._demand;}
    
        set demand(arg) {this._demand = parseInt(arg);}     // 숫자로 파싱해서 저장

        get price() {return this._price;}
    
        set price(arg) {this._price = parseInt(arg);}       // 숫자로 파싱해서 저장

        /*** 생산 부족분을 계산하는 메서드 */
        get shortfall() {
            return this._demand - this.totalProduction;
        }
    
        get profit() {
            return this.demandValue - this.demandCost;
        }
    
        get demandValue() {
            return this.satisfiedDemand * this.price;
        }
    
        get satisfiedDemand() {
            return Math.min(this._demand, this.totalProduction);
        }
    
        get demandCost() {
            let remainingDemand = this.demand;
            let result = 0;
            this.producers
            .sort((a, b) => a.cost - b.cost)
            .forEach(p => {
                const contribution = Math.min(remainingDemand, p.production);
                remainingDemand -= contribution;
                result += contribution * p.cost;
            });
            return result;
        }
    }

    // 생산자(Producer) : 단순 데이터 저장하는 class
    class Producer {
        constructor(aProvince, data) {
            this._province = aProvince;
            this._cost = data.cost;
            this._name = data.name;
            this._production = data.production || 0;
        }
        
        /*** Getter, Setter */
        get name() {return this._name;}
    
        get cost() {return this._cost;}
    
        set cost(arg) {this._cost = parseInt(arg);}
    
        get production() {return this._production;}
    
        set production(amountStr) {
            const amount = parseInt(amountStr);
            const newProduction = Number.isNaN(amount) ? 0 : amount;
            this._province.totalProduction += newProduction - this._production;
            this._production = newProduction;
        }
    
    }

    export {
        sampleProvinceData,
        Province,
        Producer
    };