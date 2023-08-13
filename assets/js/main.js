var iUp = (function () {
	var time = 0,
	  duration = 150,
	  clean = function () {
		time = 0;
	  },
	  up = function (element) {
		setTimeout(function () {
		  element.classList.add("up");
		}, time);
		time += duration;
	  },
	  down = function (element) {
		element.classList.remove("up");
	  },
	  toggle = function (element) {
		setTimeout(function () {
		  element.classList.toggle("up");
		}, time);
		time += duration;
	  };
	return {
	  clean: clean,
	  up: up,
	  down: down,
	  toggle: toggle
	};
  })();
  
  function setCustomImage(imgUrl) {
	var panel = document.querySelector('#panel');
	panel.style.background = "url('" + imgUrl + "') center center no-repeat #666";
	panel.style.backgroundSize = "cover";
  }
  
  function decryptEmail(encoded) {
	var address = atob(encoded);
	window.location.href = "mailto:" + address;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
	// 获取一言数据
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
	  if (this.readyState == 4 && this.status == 200) {
		var res = JSON.parse(this.responseText);
		document.getElementById('description').innerHTML = res.hitokoto + "<br/> -「<strong>" + res.from + "</strong>」";
	  }
	};
	xhr.open("GET", "https://v1.hitokoto.cn", true);
	xhr.send();
  
	var iUpElements = document.querySelectorAll(".iUp");
	iUpElements.forEach(function (element) {
	  iUp.up(element);
	});
  
	var avatarElement = document.querySelector(".js-avatar");
	avatarElement.addEventListener('load', function () {
	  avatarElement.classList.add("show");
	});
  });
  
  var btnMobileMenu = document.querySelector('.btn-mobile-menu__icon');
  var navigationWrapper = document.querySelector('.navigation-wrapper');
  
  btnMobileMenu.addEventListener('click', function () {
	if (navigationWrapper.style.display == "block") {
	  navigationWrapper.addEventListener('animationend', function () {
		navigationWrapper.classList.toggle('visible');
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceOutUp');
		navigationWrapper.removeEventListener('animationend', arguments.callee);
	  });
	  navigationWrapper.classList.toggle('animated');
	  navigationWrapper.classList.toggle('bounceOutUp');
	} else {
	  navigationWrapper.classList.toggle('visible');
	  navigationWrapper.classList.toggle('animated');
	  navigationWrapper.classList.toggle('bounceInDown');
	}
	btnMobileMenu.classList.toggle('social');
	btnMobileMenu.classList.toggle('iconfont');
	btnMobileMenu.classList.toggle('icon-list');
	btnMobileMenu.classList.toggle('social');
	btnMobileMenu.classList.toggle('iconfont');
	btnMobileMenu.classList.toggle('icon-angleup');
	btnMobileMenu.classList.toggle('animated');
	btnMobileMenu.classList.toggle('fadeIn');
  });
  
  setCustomImage('https://img1.imgtp.com/2023/07/17/NrSThzsQ.jpg');
  
