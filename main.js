const body = document.body;
let matrix = {};
const label = document.createElement("label");
const main = document.createElement("div");
createElements(body);
function createElements(body){
	if(document.getElementById('reset')){
		body.removeChild(document.getElementById('reset'));
	}
	label.classList.add('result');
	label.innerHTML = "Result";
	body.appendChild(label);
	main.classList.add('main');
	body.appendChild(main);
	for(i = 0; i< 3; i++ ){
		matrix[i] = {};
		for (var j = 0 ; j < 3; j++) {
			let div = document.createElement("div");
			div.classList.add('box');
			div.innerHTML = "Click Me"
			div.setAttribute("rank",`${i}-${j}`);
			matrix[i][j] =  null;
			div.onclick = function(){
				assignValue(this);
			}
			main.appendChild(div);
		}
	}
}

function assignValue(ele){
	let countZero = 0;
	let CountCross =0;
	divClass = [{class:'cross',value:'X'},{class:'zero',value:'0'}].random();
	ele.classList.add(divClass.class);
	ele.onclick = null;
	ele.innerHTML = divClass.value;
	let attr = ele.getAttribute('rank');
	let elements = document.getElementsByClassName('box');
	elements = [...elements];
	elements.forEach(x=>{
		let keys = x.getAttribute('rank').split('-');
		if(x.classList.contains('zero')){
			matrix[keys[0]][keys[1]] = 'zero';
		}else if(x.classList.contains('cross')){
			matrix[keys[0]][keys[1]] = 'cross';
		}
	});
	checkWin();
}
function checkWin(){
	let flag = false;
	for (var i = 0;  i < 3; i++) {
		if(matrix[i] != null){
			if((matrix[i][0] && matrix[i][1] && matrix[i][2] ) && matrix[i][0] == matrix[i][1] && matrix[i][1] == matrix[i][2]){
				label.innerHTML = `${matrix[i][0]} wins`;
				label.classList.add('success');
				flag=true;
			}
			else if((matrix[0][i]&&matrix[1][i]&&matrix[2][i]) && matrix[0][i] == matrix[1][i] && matrix[1][i] == matrix[2][i]){
				label.innerHTML = `${matrix[0][i]} wins`;
				label.classList.add('success');
				flag=true;
			}else if((matrix[0][0]&&matrix[1][1]&&matrix[2][2]) && ((matrix[0][0] == matrix[1][1] && matrix[1][1]  == matrix[2][2]) || (matrix[2][2] == matrix[1][1] && matrix[1][1]  == matrix[0][0]))){
				label.innerHTML = `${matrix[0][0]} wins`;
				label.classList.add('success');
				flag=true;
			}
		}
 	}
 	reset(flag);
}
function reset(flag){
	if(flag){
		let elements = [...document.getElementsByClassName('box')];
		elements.forEach(x=>{
			x.onclick = null;
		});
	}
	if(!document.getElementById('reset')){
		let button = document.createElement("button");
		button.id="reset";
		button.classList.add('reset');
		button.innerHTML = "reset";
		button.onclick = function(){
			matrix = {};
			main.innerHTML = null;
			label.innerHTML = "";
			label.classList.remove('success');
			createElements(body);
		}
		body.appendChild(button);
	}
}
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}