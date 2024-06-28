//Задача № 1

function cachingDecoratorNew(func) {
	let cache = [];

	function wrapper(...args) {
		const hash = md5(JSON.stringify(args));
		let objectInCache = cache.find(item => item.hash === hash);
		if (objectInCache) {
			console.log("Из кеша: " + objectInCache.value, cache);
			return "Из кеша: " + objectInCache.value;
		}
		let result = func(...args);
		cache.push({
			hash: hash,
			value: result
		});
		if (cache.length > 5) {
			cache.shift();
		}
		console.log("Вычисляем: " + result, cache);
		return "Вычисляем: " + result;
	}
	return wrapper;
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
	let timeoutId;
	let count = 0;
	let allCount = 0;

	function wrapper(...args) {
    
		if (timeoutId) {
			console.log('уже есть таймаут', args);  
			clearTimeout(timeoutId);
			allCount++;
		}
		if (!timeoutId) {
			console.log('первый вызов', args);
			func.apply(this, args);
			count++;
		}

		timeoutId = setTimeout(() => {
			console.log('задержка больше ' + delay + ' млсек, сработал таймаут для ' + args);
			func.apply(this, args);
            count++;
		}, delay);	

        wrapper.allCount = allCount;
        wrapper.count = count;
	}

	return wrapper;
}
