//function myModule(){
//	var money = 10000;
//	
//	function getMoney(){
//		return money;
//	};
//	
//	function setMoney(n){
//		money += n;
//	}
//	
//	return {
//		getMoney:getMoney,
//		setMoney:setMoney
//	}
//}



(function(){
	var money = 10000;
	
	function getMoney(){
		return money;
	};
	
	function setMoney(n){
		money += n;
	}
	
	window.getMoney = getMoney;
	window.setMoney = setMoney;
})();






