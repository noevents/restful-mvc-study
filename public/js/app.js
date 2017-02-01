let postTemplate = '<div class="post-wrapper"><div class="post"><p>TEXT</p>&nbsp;&nbsp;</div></div>'

let form = document.forms['postForm']
form.button.className += ' pure-button-disabled';
let content = document.getElementsByClassName("content")[0]
let reply = document.getElementsByClassName("reply-label")[0]
let active = true

reply.addEventListener('click', function(){
	if(active){
		reply.textContent = 'Close form'
		form.style.display = ''
		active = false
	} else{
		reply.textContent = 'Add post'
		form.style.display = 'none'
		active = true
	}
	
})

function renderNewPosts (posts){
	let newPosts = []
	for(let i = 0; i < posts.length; i++){
		newPosts.push(postTemplate.replace(/TEXT/, posts[i].body))
	}
	//console.log(posts)
	content.insertAdjacentHTML("beforeEnd", newPosts.join(''));
}

form.onsubmit = function () {
	if (!/\bpure-button-disabled\b/.test(form.button.className)) {
		send(form.message.value, function(err, res){
			if (err) throw err;
			renderNewPosts(JSON.parse(res))
		});
		window.scrollTo(0,document.body.scrollHeight)
	}
	return false;
}

form.message.onkeyup = function () {
	if (form.message.value && /\bpure-button-disabled\b/.test(form.button.className)) {
		form.button.className = form.button.className.replace(/pure-button-disabled/, '');
	} else if (!form.message.value && !/\bpure-button-disabled\b/.test(form.button.className)) {
		form.button.className += ' pure-button-disabled';
	}
}

function send(message, done){
	let postsCount = document.getElementsByClassName("post-wrapper").length
	let xhr = new XMLHttpRequest();
	form.message.value = '';
    form.button.className += ' pure-button-disabled';
    xhr.open("POST", "/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
		done(null, xhr.response);
	}
	xhr.onerror = function () {
		done(xhr.response);
	};
    xhr.send(JSON.stringify({
        body: message,
		postsCount
    }));
}