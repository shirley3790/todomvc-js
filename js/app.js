(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	// console.log(666)
	let newTodo = document.querySelector('.new-todo');
	let todoList = document.querySelector('.todo-list');
	let todoapp = document.querySelector('.todoapp');
	let toggleAll = document.querySelector('.toggle-all');


	//获取本地存储数据
	function getStorage(key) {
		let dataTodo = window.localStorage.getItem(key);
		if (dataTodo) {
			dataTodo = JSON.parse(dataTodo);
		} else {
			dataTodo = [];
		}
		return dataTodo;
	}

	//存储数据
	function setStorage(key, val) {
		window.localStorage.setItem('todolist', JSON.stringify(val));
	}

	//创建便签
	function creatRow(val) {
		let dataTodo = getStorage('todolist');
		let obj = {
			title: val,
			done: false
		}
		dataTodo.push(obj);
		setStorage('todolist', dataTodo);
		render();
	}

	//渲染数据
	function render(data) {
		let dataTodo = [];
		if (data) {
			dataTodo = data;
		} else {
			dataTodo = getStorage('todolist');
		}
		let str = dataTodo.map((item, index) => {
			// let cla = item.done ? 'completed' : '';
			return `<li class="${item.done ? 'completed' : '' }"  data-index="${ index }">
			<div class="view">
				<input class="toggle" type="checkbox" ${item.done ? 'checked' : ''}>
				<label>${item.title}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Rule the web">
		</li>`;
		}).join('');

		//渲染
		todoList.innerHTML = str;
	}

	// render();

	newTodo.onblur = () => {
		// console.log('失去焦点')
		// console.log(newTodo.value)
		if (newTodo.value.trim()) {
			creatRow(newTodo.value);
			newTodo.value = '';
		}

	}

	newTodo.onkeyup = ev => {
		if (ev.keyCode == 13) {
			// console.log('回车的时候');
			if (newTodo.value.trim()) {
				creatRow(newTodo.value);
				newTodo.value = '';
			}
		}
	}

	//完成项
	todoList.onclick = ev => {

		if (ev.target.className == 'toggle') {
			console.log(ev.target.checked);
			let dataTodo = getStorage('todolist');
			let index = ev.target.parentNode.parentNode.dataset.index;
			dataTodo[index].done = ev.target.checked;
			setStorage('todolist', dataTodo);
			// if (ev.target.checked) {
			// 	todoList.children[index].className = 'completed';
			// } else {
			// 	todoList.children[index].className = '';
			// }
		}


		//删除
		if (ev.target.className == 'destroy') {
			let index = ev.target.parentNode.parentNode.dataset.index;
			console.log(index);
			let dataTodo = getStorage('todolist');
			console.log(dataTodo);
			dataTodo.splice(index, 1);
			console.log(dataTodo);
			setStorage('todolist', dataTodo);

		}

		render();

	}


	let clearCompleted = document.querySelector('.clear-completed');
	let footer = document.querySelector('.footer');
	let filters = document.querySelector('.filters');
	let activs = document.querySelectorAll('.filters a');
	// console.log(activs.length)
	footer.onclick = ev => {
		//清除全部
		if (ev.target.className == 'clear-completed') {
			localStorage.removeItem('todolist');
			render();
		}




	}

	//filers
	function filterRender() {
		let hash = location.hash;
		// console.log(hash)
		let dataclass = hash.slice(2);
		console.log(dataclass)
		let data = [];
		let index = 0;
		if (dataclass == 'all') {
			data = getStorage('todolist');
			// console.log(111);
		} else if (dataclass == 'active') {
			data = getStorage('todolist').filter(item => {
				return item.done == false;
			});
			index = 1;
			// console.log(222);
		} else if (dataclass == 'completed') {
			data = getStorage('todolist').filter(item => {
				return item.done == true;
			});
			// console.log(333);
			index = 2;
		}

		for (let i = 0; i < activs.length; i++) {
			activs[i].className = '';
		}
		activs[index].className = 'selected';
		render(data);
	}

	filterRender();

	window.onhashchange = () => {
		//哈希改变触发
		filterRender();
	}

	window.onhashchange();

	//全选
	// let isok = true;
	// toggleAll.onclick = () => {
	// 	let dataTodo = getStorage('todolist');
	// 	console.log(dataTodo);

	// 	if (dataTodo) {
	// 		if (isok) {
	// 			dataTodo = dataTodo.forEach(item => {
	// 				item.done = true;
	// 			});
	// 		} else {
	// 			dataTodo = dataTodo.forEach(item => {
	// 				item.done = false;
	// 			});
	// 		}
	// 		isok = !isok;

	// 	}
	// 	setStorage('todolist', dataTodo);
	// 	render();
	// }
})(window);